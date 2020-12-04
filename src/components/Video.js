import { ref } from "../deps/vue.js";

import { useHls, events } from "../deps/live.js";

import { hlsUrl } from "../../config.js";

export default {
  setup() {
    const muted = ref(true);

    events.on("mute", () => (muted.value = true));
    events.on("unmute", () => (muted.value = false));

    const videoRef = useHls(hlsUrl);
    return { muted, videoRef };
  },
  template: `
    <div style="
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    ">
      <video 
        ref="videoRef" :muted="muted" inline autoplay
        style="width: 600px; clip-path: circle(33%);"
        @click="isMuted = !isMuted"
      />
    </div>
  `,
};
