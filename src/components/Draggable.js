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

    const onTouchstart = () => {
      touchStarted.value = true;
      offsetX.value = mouseX.value - draggableEl.value.offsetLeft;
      offsetY.value = mouseY.value - draggableEl.value.offsetTop;
    };

    const onTouchend = () => {
      console.log("end");
      touchStarted.value = false;
      offsetX.value = null;
      offsetY.value = null;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (touchStarted.value) {
        console.log(offsetX.value);
        x.value = mouseX.value - offsetX.value;
        y.value = mouseY.value - offsetY.value;

        // // emit("drag", {
        //   dragX: mouseX.value - draggableEl.value.offsetLeft,
        //   dragY: mouseY.value - draggableEl.value.offsetTop,
        // });
      }
    });

    // const onMousepress = () => {
    //   mousePressed.value = !mousePressed.value;
    // };

    /*
    watch([() => mouseX.value, () => mouseY.value], () => {
      if (mousePressed.value) {
        // console.log(draggableEl.value.offsetLeft, mouseX.value);
        // x.value = mouseX.value - draggableEl.value.offsetLeft;
        // y.value = mouseY.value - draggableEl.value.offsetTop;
        // // emit("drag", {
        //   dragX: mouseX.value - draggableEl.value.offsetLeft,
        //   dragY: mouseY.value - draggableEl.value.offsetTop,
        // });
      }
    });
    */

    const positionStyle = computed(() => {
      return {
        position: "fixed",
        left: `${x.value}px`,
        top: `${y.value}px`,
      };
    });

    return { draggableEl, onTouchstart, onTouchend, positionStyle };
  },
  template: `
  <div
    ref="draggableEl"
    :style="positionStyle"
    @mousedown="onTouchstart"
    @touchstart="onTouchstart"
    @mouseup="onTouchend"
    @touchend="onTouchend"
    draggable
  >
    <slot />
  </div>
  `,
};
