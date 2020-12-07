import { ref, inject, watch, computed } from "../deps/vue.js";

export default {
  props: ["x", "y"],
  setup(props, { emit }) {
    const draggableEl = ref(0);

    const x = ref(props.x);
    const y = ref(props.y);

    // const update = (e) => {
    //   x.value = draggableEl?.value?.pageX;
    //   y.value = draggableEl?.value?.pageY;
    // };

    // onMounted(() => {
    //   window.addEventListener("mousemove", update);
    // });

    // onUnmounted(() => {
    //   window.removeEventListener("mousemove", update);
    // });

    const { mouseX, mouseY } = inject("mouse");

    const touchStarted = ref(false);

    const offsetX = ref(null);
    const offsetY = ref(null);

    const onMousedown = () => {
      touchStarted.value = true;
      offsetX.value = mouseX.value - draggableEl.value.offsetLeft;
      offsetY.value = mouseY.value - draggableEl.value.offsetTop;
    };

    const onMouseup = () => {
      touchStarted.value = false;
      offsetX.value = null;
      offsetY.value = null;
    };

    const onTouchstart = (e) => {
      touchStarted.value = true;
      offsetX.value = e.changedTouches[0].pageX - draggableEl.value.offsetLeft;
      offsetY.value = e.changedTouches[0].clientY - draggableEl.value.offsetTop;
    };

    const onTouchend = () => {
      touchStarted.value = false;
      offsetX.value = null;
      offsetY.value = null;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (touchStarted.value) {
        const dragX = mouseX.value - offsetX.value;
        const dragY = mouseY.value - offsetY.value;
        x.value = dragX;
        y.value = dragY;
        emit("drag", { dragX, dragY });
      }
    });

    const style = computed(() => {
      return {
        position: "absolute",
        left: `${x.value}px`,
        top: `${y.value}px`,
        cursor: touchStarted.value ? "grabbing" : "grab",
      };
    });

    return {
      draggableEl,
      onMousedown,
      onMouseup,
      onTouchstart,
      onTouchend,
      style,
    };
  },
  template: `
  <div
    ref="draggableEl"
    :style="style"
    @mousedown.stop.prevent="onMousedown"
    @touchstart.stop.prevent="onTouchstart"
    @mouseup.stop.prevent="onMouseup"
    @touchend.stop.prevent="onTouchend"
  >
    <slot />
  </div>
  `,
};
