import {
  createApp,
  ref,
  provide,
  onMounted,
  onUnmounted,
  inject,
  watch,
} from "./src/deps/vue.js";

import { useMouse } from "./src/lib/index.js";

import { Viewport, Background, Draggable } from "./src/components2/index.js";

const User = {
  components: { Draggable },
  props: {
    mapClicked: { default: false },
    width: { default: 0 },
    height: { default: 0 },
  },
  template: `
  <Draggable
    :x="myX"
    :y="myY"
    @drag="onMyDrag"
    :style="{
      transition: mapClicked ? 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' : ''
    }"
  >
    <div
      :style="{ top: height / 2 + 'px', left: width / 2 + 'px'}"
      style="
        position: absolute;
        width: 100px;
        height: 100px;
        background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
        background-size: cover;
        border: 2px solid white;
        transform: translate(-50%, -50%);
        border-radius: 10000px;
      "
    />
  </Draggable>
`,
};

const DraggableMap = {
  components: {
    Draggable,
    Viewport,
    Background,
  },
  setup() {
    const width = 1500;
    const height = 1500;

    const { mouseX, mouseY } = useMouse();

    const offsetX = (width - window.innerWidth) / -2;
    const offsetY = (height - window.innerHeight) / -2;

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
      myX.value = x - mapX.value - width / 2;
      myY.value = y - mapY.value - height / 2;
    };

    return {
      mapX,
      mapY,
      myX,
      myY,
      onMapDrag,
      onMyDrag,
      onMapClick,
      width,
      height,
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
      <Background :width="width" :height="height" />
      <!-- <User :mapClicked="mapClicked" :width="width" :height="height" /> -->
      <Draggable :x="myX" :y="myY" @drag="onMyDrag"  :style="{transition: onEdge || mapClicked ? 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' : ''}">
        <div
          :style="{ top: height / 2 + 'px', left: width / 2 + 'px'}"
          style="
          width: 100px;
          height: 100px;
          background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
          position: absolute;
          background-size: cover;
          border: 2px solid white;
          transform: translate(-50%, -50%);
          border-radius: 10000px;
          "
        />
      </Draggable>
    </Draggable>
  `,
};

const App = {
  components: { DraggableMap, Viewport, Background },
  template: `
  <Viewport>
    <DraggableMap>
      <!--Background :width="1500" :height="1500" /-->
    </DraggableMap>
  </Viewport>
  `,
};

createApp(App).mount("#app");
