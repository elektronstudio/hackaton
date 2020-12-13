import { mapWidth, mapHeight } from "../../config.js";

export default {
  setup(props) {
    const viewBox = `${mapWidth / -2} ${
      mapHeight / -2
    } ${mapWidth} ${mapHeight}`;
    return { mapWidth, mapHeight, viewBox };
  },
  template: `
  <svg
    :view-box.camel="viewBox" 
    :style="{
      width: mapWidth + 'px', 
      height: mapHeight + 'px'
    }"
  >
    <slot />
  </svg>
  `,
};
