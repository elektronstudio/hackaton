import { ref, inject, watch, computed } from "../deps/vue.js";

export default {
  props: ["x", "y"],
  setup(props, { emit }) {
    const draggableEl = ref(0);

    // const x = ref(0);
    // const y = ref(0);

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

    const mousePressed = ref(false);

    const onMousepress = () => {
      mousePressed.value = !mousePressed.value;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (mousePressed.value) {
        emit("drag", {
          dragX: mouseX.value - draggableEl.value.offsetLeft,
          dragY: mouseY.value - draggableEl.value.offsetTop,
        });
      }
    });

    const positionStyle = computed(() => {
      return {
        position: "fixed",
        left: `${props.x}px`,
        top: `${props.y}px`,
      };
    });

    return { draggableEl, onMousepress, positionStyle };
  },
  template: `
  <div
    ref="draggableEl"
    :style="positionStyle"
    @mousedown="onMousepress"
    @touchstart="onMousepress"
    @mouseup="onMousepress"
    @touchend="onMousepress"
  >
    <slot />
  </div>
  `,
};
