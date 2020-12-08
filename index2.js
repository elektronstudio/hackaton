import {
  createApp,
  ref,
  provide,
  onMounted,
  onUnmounted,
} from "./src/deps/vue.js";

import Draggable from "./src/components/Draggable.js";

const useMouse = () => {
  const mouseX = ref(0);
  const mouseY = ref(0);

  const update = (e) => {
    mouseX.value = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    mouseY.value = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
    window.removeEventListener("touchmove", update);
  });

  return { mouseX, mouseY };
};

const Scene = {
  setup() {
    const { mouseX, mouseY } = useMouse();
    provide("mouse", { mouseX, mouseY });
  },
  template: `
  <div
    style="
      position: relative;
      overflow: hidden;
      width: 100vw;
      height: -webkit-fill-available;
      height: 100vh;
      border: 2px solid orange;
    "
  >
    <slot />
  </div>`,
};

const App = {
  components: {
    Draggable,
    Scene,
  },
  setup() {
    const width = 1500;
    const height = 1500;

    const offsetX = (width - window.innerWidth) / -2;
    const offsetY = (height - window.innerHeight) / -2;

    const mapX = ref(offsetX);
    const mapY = ref(offsetY);

    const onMapDrag = ({ dragX, dragY }) => {
      mapX.value = dragX;
      mapY.value = dragY;
    };

    const myX = ref(0);
    const myY = ref(0);

    const mapClicked = ref(false);

    const onMyDrag = ({ dragX, dragY }) => {
      mapClicked.value = false;
      myX.value = dragX;
      myY.value = dragY;
    };

    const onMapClick = ({ x, y }) => {
      mapClicked.value = true;
      myX.value = x - mapX.value - width / 2;
      myY.value = y - mapY.value - height / 2;
    };

    const viewBox = `${width / -2} ${height / -2} ${width} ${height}`;

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
      viewBox,
      mapClicked,
    };
  },
  template: `
  <Scene style="offset">
    <Draggable
      :x="mapX"
      :y="mapY"
      @drag="onMapDrag"
      @dragClick="onMapClick"
      style="border: 2px solid yellow;"
    >
      <div
        style="border: 2px solid green"
        :style="{width: width + 'px', height: height + 'px'}"
      >
        <svg :view-box.camel="viewBox">
          <circle v-for="r in 100" :r="r * 10" cx="0" cy="0" stroke="rgba(255,255,255,0.3)" fill="none" />
        </svg>
      </div>
      <div
        :style="{ top: height / 2 + 'px', left: width / 2 + 'px'}"
        style="
        width: 200px;
        height: 200px;
        position: absolute;
        border: 2px solid red;
        transform: translate(-50%, -50%);
        border-radius: 10000px;
        "
      />
      <Draggable :x="myX" :y="myY" @drag="onMyDrag"  :style="{transition: mapClicked ? 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' : ''}">
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
  </Scene>
  `,
};

createApp(App).mount("#app");
