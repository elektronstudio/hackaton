import { createApp, ref } from "./src/deps/vue.js";

import Background from "./src/components/Background.js";
import Overlay from "./src/components/Overlay.js";
import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import Videos from "./src/components/Videos.js";

import { useImages } from "./src/lib/index.js";

const Image = {
  setup() {
    const {
      onStart,
      onStop,
      sendImageMessage,
      images2,
      videoEl,
      canvasEl,
    } = useImages("hackaton");
    return { onStart, onStop, sendImageMessage, images2, videoEl, canvasEl };
  },
  template: `
    <button @click="onStart">Start</button>
    <button @click="sendImageMessage">Send</button>
    <pre>{{ images2 }}</pre>
    <video ref="videoEl" autoplay playsinline style="border: 1px solid red; position: fixed; top: 0; right: 0; opacity: 0; pointer-events: none;" />
    <canvas ref="canvasEl" style="display: none;" />
  `,
};

const App = {
  components: { Background, Overlay, Svg, Users, Videos, Image },
  template: `
  <!--Videos />
  <Svg>
    <Background />
    <Users />
  </Svg>
  <Overlay /-->
  <Image />
  `,
};

createApp(App).mount("#app");
