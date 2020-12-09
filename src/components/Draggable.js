import { ref, inject, watch, computed } from "../deps/vue.js";

export default {
  props: { x: { default: null }, y: { default: null } },
  setup(props, { emit }) {
    const draggableEl = ref(0);

    const x = ref(0);
    const y = ref(0);

    watch(
      [() => props.x, () => props.y],
      () => {
        x.value = props.x;
        y.value = props.y;
      },
      { immediate: true }
    );

    const { mouseX, mouseY } = inject("mouse");

    const dragStarted = ref(false);
    const touchDragStarted = ref(false);

    const offsetX = ref(null);
    const offsetY = ref(null);

    const initialX = ref(null);
    const initialY = ref(null);

    const onMousedown = () => {
      dragStarted.value = true;
      offsetX.value = mouseX.value - draggableEl.value.offsetLeft;
      offsetY.value = mouseY.value - draggableEl.value.offsetTop;
      initialX.value = mouseX.value;
      initialY.value = mouseY.value;
    };

    const onMouseup = () => {
      dragStarted.value = false;
      offsetX.value = null;
      offsetY.value = null;
      if (
        initialX.value - mouseX.value === 0 &&
        initialY.value - mouseY.value === 0
      ) {
        emit("dragClick", { x: mouseX.value, y: mouseY.value });
      }
    };

    const onTouchstart = (e) => {
      dragStarted.value = true;
      offsetX.value = e.changedTouches[0].pageX - draggableEl.value.offsetLeft;
      offsetY.value = e.changedTouches[0].pageY - draggableEl.value.offsetTop;
    };

    const onTouchend = (e) => {
      dragStarted.value = false;
      offsetX.value = null;
      offsetY.value = null;
      if (!touchDragStarted.value) {
        emit("dragClick", {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY,
        });
      }
      touchDragStarted.value = false;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (dragStarted.value) {
        touchDragStarted.value = true;
        const dragX = mouseX.value - offsetX.value;
        const dragY = mouseY.value - offsetY.value;
        x.value = dragX;
        y.value = dragY;
        emit("drag", { x: dragX, y: dragY });
      }
    });

    const style = computed(() => {
      return {
        position: "absolute",
        left: `${x.value}px`,
        top: `${y.value}px`,
        cursor: dragStarted.value ? "grabbing" : "grab",
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
