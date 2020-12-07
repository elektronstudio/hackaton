import { ref, inject, watch, computed } from "../deps/vue.js";

export default {
  props: ["x", "y"],
  setup(props, { emit }) {
    const { mouseX, mouseY } = inject("mouse");

    const mousePressed = ref(false);

    const onMousepress = () => {
      mousePressed.value = !mousePressed.value;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (mousePressed.value) {
        emit("drag", { dragX: mouseX.value, dragY: mouseY.value });
      }
    });

    const positionStyle = computed(() => {
      return {
        position: "fixed",
        left: `${props.x}px`,
        top: `${props.y}px`,
      };
    });

    return { onMousepress, positionStyle };
  },
  template: `
  <div
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
