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
    mouseX.value = e.pageX;
    mouseY.value = e.pageY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
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
      border: 4px solid green;
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
    const width = 500;
    const height = 500;
    // const offsetX = (width - window.innerWidth) / -2;
    // const offsetY = (height - window.innerHeight) / -2;

    const offsetX = window.innerWidth / 2;
    const offsetY = window.innerHeight / 2;

    return { width, height, offsetX, offsetY };
  },
  template: `
  <Scene style="offset">
    <Draggable :x="0" :y="0">
      <div
        :style="{
          width: width + 'px',
          height: height + 'px'
        }"
        style="
          background: url(https://images.all-free-download.com/images/graphiclarge/goa_small_bird_202958.jpg)
        "
      />
      <div style="
        width: 50px;
        height: 50px;
        background: blue;
        "
      />
      <Draggable x="0" y="0">
        <div style="
          width: 100px;
          height: 100px;
          background: red;
          "
        />
      </Draggable>
    </Draggable>
  </Scene>
  `,
};

createApp(App).mount("#app");
