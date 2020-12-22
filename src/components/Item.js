import { mapWidth, mapHeight } from "../../config.js";

export default {
  props: {
    x: { default: 0 },
    y: { default: 0 },
  },
  setup() {
    return { mapWidth, mapHeight };
  },
  template: `
  <div
    :style="{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: (mapHeight / 2 + parseFloat(y)) + 'px', 
      left: (mapWidth / 2 + parseFloat(x)) + 'px'
    }"
  >
    <slot />
  </div>
  `,
};
