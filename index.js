import { createApp, ref } from "./src/deps/vue.js";
import { events } from "./src/deps/live.js";

import Background from "./src/components/Background.js";
import Overlay from "./src/components/Overlay.js";
import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import Videos from "./src/components/Videos.js";
import Camera from "./src/components/Camera.js";

import { audioSource } from "./config.js";

const Audio = {
  setup() {
    const audioRef = ref(null);
    const muted = ref(true);

    events.on("mute", () => {
      // TODO: Should we pause audioRef?
      muted.value = true;
    });
    events.on("unmute", () => {
      muted.value = false;
      audioRef.value.play();
    });

    return { muted, audioRef, audioSource };
  },
  template: `
  <audio
    ref="audioRef"
    :muted="muted" 
    :src="audioSource"
    autoplay
    loop
  />
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
