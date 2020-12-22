import { ref, watch } from "../deps/vue.js";

import { useMouse } from "../lib/index.js";
import { Draggable, Item } from "./index.js";
import { mapWidth, mapHeight } from "../../config.js";

import { Viewport } from "./index.js";

export default {
  components: {
    Draggable,
    Item,
    Viewport,
  },
  props: {
    userX: {
      default: null,
    },
    userY: {
      default: null,
    },
    mapX: {
      default: null,
    },
    mapY: {
      default: null,
    },
  },
  setup(props, { emit }) {
    const { mouseX, mouseY } = useMouse();

    const initialMapX = props.mapX || (mapWidth - window.innerWidth) / -2;
    const initialMapY = props.mapY || (mapHeight - window.innerHeight) / -2;

    const mapX = ref(initialMapX);
    const mapY = ref(initialMapY);

    const onMapDrag = ({ x, y }) => {
      mapX.value = x;
      mapY.value = y;
      emit("mapMove", { x, y });
    };

    const userX = ref(props.userX);
    const userY = ref(props.userY);

    const mapClicked = ref(false);

    const edgeSize = 30;
    const mapMoveSize = 2;
    const myMoveSize = 4;

    const onMyDrag = ({ x, y }) => {
      mapClicked.value = false;
      userX.value = x;
      userY.value = y;

      const left = mouseX.value !== null && mouseX.value < edgeSize;
      const right =
        mouseX.value !== null && mouseX.value > window.innerWidth - edgeSize;
      const top = mouseY.value !== null && mouseY.value < edgeSize;
      const bottom =
        mouseY.value !== null && mouseY.value > window.innerHeight - edgeSize;

      if (left) {
        mapX.value = mapX.value + mapMoveSize;
        userX.value = userX.value - myMoveSize;
      }
      if (right) {
        mapX.value = mapX.value - mapMoveSize;
        userX.value = userX.value + myMoveSize;
      }
      if (top) {
        mapY.value = mapY.value + mapMoveSize;
        userY.value = userY.value - myMoveSize;
      }
      if (bottom) {
        mapY.value = mapY.value - mapMoveSize;
        userY.value = userY.value + myMoveSize;
      }
      emit("backgroundMove", { x: mapX.value, y: mapY.value });
    };

    const onMapClick = ({ x, y }) => {
      mapClicked.value = true;
      userX.value = x - mapX.value - mapWidth / 2;
      userY.value = y - mapY.value - mapHeight / 2;
    };

    watch(
      [() => userX.value, () => userY.value],
      () => {
        emit("userMove", { x: userX.value, y: userY.value });
      },
      { immediate: true }
    );

    return {
      mapX,
      mapY,
      userX,
      userY,
      onMapDrag,
      onMyDrag,
      onMapClick,
      mapWidth,
      mapHeight,
      mapClicked,
      mouseX,
    };
  },
  template: `
  <Viewport>
    <Draggable
      :x="mapX"
      :y="mapY"
      @drag="onMapDrag"
      @dragClick="onMapClick"
    >
      <slot name="background" />
      <Draggable
        :x="userX"
        :y="userY"
        @drag="onMyDrag"
        :style="{
          transition: onEdge || mapClicked ? 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' : ''
        }"
      >
        <slot name="user" />
      </Draggable>
    </Draggable>
  </Viewport>
  `,
};
