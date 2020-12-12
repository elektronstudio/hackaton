import { mapWidth, mapHeight } from "../../config.js";

export default {
  setup() {
    return { mapWidth, mapHeight };
  },
  template: `
  <div
    :style="{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: mapHeight / 2 + 'px', 
      left: mapWidth / 2 + 'px'
    }"
  ><slot /></div>
  `,
};
