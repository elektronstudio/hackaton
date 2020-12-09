import Viewport from "./src/components2/Viewport.js";

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

import Draggable from "./src/components/Draggable.js";

const Background = {
  props: { width: { default: 0 }, height: { default: 0 } },
  setup(props) {
    const viewBox = `${props.width / -2} ${props.height / -2} ${props.width} ${
      props.height
    }`;
    return { viewBox };
  },
  template: `
  <div
    style="border: 2px solid green"
    :style="{width: width + 'px', height: height + 'px'}"
  >
    <svg :view-box.camel="viewBox">
      <slot />
      <!--line :x2="myX" :y2="myY" stroke="white" /-->
      <circle v-for="r in 100" :r="r * 10" cx="0" cy="0" stroke="rgba(255,255,255,0.3)" fill="none" />
    </svg>
  </div>
  <div
    :style="{ top: height / 2 + 'px', left: width / 2 + 'px'}"
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
    :style="{ top: (height / 2 - 500) + 'px', left: (width / 2 - 500) + 'px'}"
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

const App = {
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
  <Viewport style="offset">
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
  </Viewport>
  <!--div
    style="
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 50px;
      border: 2px solid purple;
    "
    @touchstart="onEdgeStart"
    @touchmove="onEdgeStart"
  /-->
  `,
};

createApp(App).mount("#app");
