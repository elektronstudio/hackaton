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
    const width = 500;
    const height = 500;
    // const offsetX = (width - window.innerWidth) / -2;
    // const offsetY = (height - window.innerHeight) / -2;

    const offsetX = (width - window.innerWidth) / -2;
    const offsetY = window.innerHeight / 2;

    const mapX = ref(0);
    const mapY = ref(0);

    const onMapDrag = ({ dragX, dragY }) => {
      mapX.value = dragX;
      mapY.value = dragY;
    };

    const myX = ref(0);
    const myY = ref(0);

    const onMyDrag = ({ dragX, dragY }) => {
      myX.value = dragX;
      myY.value = dragY;
    };

    const onMapClick = ({ x, y }) => {
      myX.value = x - mapX.value;
      myY.value = y - mapY.value;
    };
    return {
      myX,
      myY,
      onMapDrag,
      onMyDrag,
      onMapClick,
      width,
      height,
      offsetX,
      offsetY,
    };
  },
  template: `
  <Scene style="offset">
    <Draggable :x="0" :y="0" @drag="onMapDrag" @dragClick="onMapClick" style="border: 2px solid yellow;">
      <div
        style="border: 2px solid green"
        :style="{width: width + 'px', height: height + 'px'}"
      >
        <svg :width="width" :height="height">
          <circle v-for="r in 100" :r="r * 5" cx="0" cy="0" stroke="rgba(255,255,255,0.2)" fill="none" />
        </svg>
      </div>
      <Draggable :x="myX" :y="myY" @drag="onMyDrag">
        <div style="
          width: 100px;
          height: 100px;
          background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
          position: absolute;
          top: 0;
          left: 0;
          background-size: cover;
          border: 2px solid red;
          "
        />
      </Draggable>
    </Draggable>
  </Scene>
  `,
};

createApp(App).mount("#app");
