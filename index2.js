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
  template: `<slot />`,
};

const App = {
  components: {
    Draggable,
    Scene,
  },
  setup() {
    const x = ref(0);
    const y = ref(0);

    const onDrag = ({ dragX, dragY }) => {
      x.value = dragX;
      y.value = dragY;
    };
    return { x, y, onDrag };
  },
  template: `
  <Scene>
    <Draggable :x="x" :y="y" @drag="onDrag">
      <div style="
        width: 100px;
        height: 100px;
        border: 2px solid red;
        "
      />
    </Draggable>
  </Scene>
  `,
};

createApp(App).mount("#app");
