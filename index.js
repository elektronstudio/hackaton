import { createApp, ref } from "./src/deps/vue.js";
import { events } from "./src/deps/live.js";

import Background from "./src/components/Background.js";
import Overlay from "./src/components/Overlay.js";
import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import Videos from "./src/components/Videos.js";

import { useImages } from "./src/lib/index.js";

import { channel, audioSource } from "./config.js";

const Camera = {
  setup() {
    const {
      onStart,
      onStop,
      images2,
      videoEl,
      canvasEl,
      sendImageMessages,
    } = useImages(channel);

    sendImageMessages();

    events.on("cameraon", onStart);
    events.on("cameraoff", onStop);

    return { images2, videoEl, canvasEl };
  },
  template: `
    <video ref="videoEl" autoplay playsinline style="border: 1px solid red; position: fixed; top: 0; right: 0; opacity: 0; pointer-events: none;" />
    <canvas ref="canvasEl" style="display: none" />
  `,
};

const Audio = {
  setup() {
    const audioRef = ref(null);
    const muted = ref(true);

    events.on("mute", () => (muted.value = true));
    events.on("unmute", () => {
      muted.value = false;
      audioRef.value.play();
    });

    return { muted, audioRef, audioSource };
  },
  template: `
  <audio controls style="border: 1px solid red; position: fixed; top: 0, left: 0;" :src="audioSource" autoplay :muted="muted" ref="audioRef" />
  `,
};

const App = {
  components: { Background, Overlay, Svg, Users, Videos, Camera, Audio },
  template: `
  <Videos />
  <Svg>
    <Background />
    <Users />
  </Svg>
  <Overlay />
  <Camera />
  <Audio />
  `,
};

createApp(App).mount("#app");
