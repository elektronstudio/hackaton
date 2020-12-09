import { mapWidth, mapHeight } from "../../config.js";

export default {
  setup(props) {
    const viewBox = `${mapWidth / -2} ${
      mapHeight / -2
    } ${mapWidth} ${mapHeight}`;
    return { mapWidth, mapHeight, viewBox };
  },
  template: `
  <div
    style="border: 2px solid green"
    :style="{width: mapWidth + 'px', height: mapHeight + 'px'}"
  >
    <svg :view-box.camel="viewBox">
      <slot />
      <!--line :x2="myX" :y2="myY" stroke="white" /-->
      <circle v-for="r in 100" :r="r * 10" cx="0" cy="0" stroke="rgba(255,255,255,0.3)" fill="none" />
    </svg>
  </div>
  <div
    :style="{ top: mapHeight / 2 + 'px', left: mapWidth / 2 + 'px'}"
    style="
      width: 200px;
      height: 200px;
      position: absolute;
      border: 2px solid rebeccapurple;
      transform: translate(-50%, -50%);
      border-radius: 10000px;
    "
  />
  <div
    :style="{ top: (mapHeight / 2 - 500) + 'px', left: (mapWidth / 2 - 500) + 'px'}"
    style="
      width: 200px;
      height: 200px;
      position: absolute;
      border: 2px solid yellow;
      transform: translate(-50%, -50%);
      border-radius: 10000px;
    "
  />
  `,
};
