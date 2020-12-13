import { ref } from "../deps/vue.js";

import { useMouse } from "../lib/index.js";
import { Draggable, Item } from "./index.js";
import { mapWidth, mapHeight } from "../../config.js";

export default {
  components: {
    Draggable,
    Item,
  },
  setup() {
    const { mouseX, mouseY } = useMouse();

    const offsetX = (mapWidth - window.innerWidth) / -2;
    const offsetY = (mapHeight - window.innerHeight) / -2;

    const mapX = ref(offsetX);
    const mapY = ref(offsetY);

    const onMapDrag = ({ x, y }) => {
      mapX.value = x;
      mapY.value = y;
    };

    const myX = ref(0);
    const myY = ref(0);

    const mapClicked = ref(false);

    const edgeSize = 30;
    const mapMoveSize = 2;
    const myMoveSize = 4;

    const onMyDrag = ({ x, y }) => {
      mapClicked.value = false;
      myX.value = x;
      myY.value = y;

      const left = mouseX.value !== null && mouseX.value < edgeSize;
      const right =
        mouseX.value !== null && mouseX.value > window.innerWidth - edgeSize;
      const top = mouseY.value !== null && mouseY.value < edgeSize;
      const bottom =
        mouseY.value !== null && mouseY.value > window.innerHeight - edgeSize;

      if (left) {
        mapX.value = mapX.value + mapMoveSize;
        myX.value = myX.value - myMoveSize;
      }
      if (right) {
        mapX.value = mapX.value - mapMoveSize;
        myX.value = myX.value + myMoveSize;
      }
      if (top) {
        mapY.value = mapY.value + mapMoveSize;
        myY.value = myY.value - myMoveSize;
      }
      if (bottom) {
        mapY.value = mapY.value - mapMoveSize;
        myY.value = myY.value + myMoveSize;
      }
    };

    const onMapClick = ({ x, y }) => {
      mapClicked.value = true;
      myX.value = x - mapX.value - mapWidth / 2;
      myY.value = y - mapY.value - mapHeight / 2;
    };

    return {
      mapX,
      mapY,
      myX,
      myY,
      onMapDrag,
      onMyDrag,
      onMapClick,
      mapWidth,
      mapHeight,
      offsetX,
      offsetY,
      mapClicked,
      mouseX,
    };
  },
  template: `
    <Draggable
      :x="mapX"
      :y="mapY"
      @drag="onMapDrag"
      @dragClick="onMapClick"
      style="border: 2px solid yellow;"
    >
      <slot />
      <Draggable :x="myX" :y="myY" @drag="onMyDrag"  :style="{transition: onEdge || mapClicked ? 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' : ''}">
        <Item
          style="
          width: 100px;
          height: 100px;
          background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
          background-size: cover;
          border: 2px solid white;
          border-radius: 10000px;
          "
        />
      </Draggable>
    </Draggable>
  `,
};
