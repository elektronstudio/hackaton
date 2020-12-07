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
      height: 100vh;
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
    const width = 3000;
    const height = 3000;
    // const offsetX = (width - window.innerWidth) / -2;
    // const offsetY = (height - window.innerHeight) / -2;

    const offsetX = (width - window.innerWidth) / -2;
    const offsetY = window.innerHeight / 2;

    return { width, height, offsetX, offsetY };
  },
  template: `
  <Scene style="offset">
    <Draggable :x="0" :y="0"  style="position: relative;">
      <div
        :style="{
          width: width + 'px',
          height: height + 'px'
        }"
      />
        
      <div style="
        top: 0;
        left: 0;
        position: absolute;
        "
      >
        <svg width="2000" height="2000">
          <circle v-for="r in 100" :r="r * 30" cx="300" cy="300" stroke="rgba(255,255,255,0.2)" fill="none" />
        </svg>
      </svg>
      <Draggable x="250" y="250">
        <div style="
          width: 100px;
          height: 100px;
          background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
          position: absolute;
          top: 0;
          left: 0;
          background-size: cover;
          "
        />
      </Draggable>
    </Draggable>
  </Scene>
  `,
};

createApp(App).mount("#app");
