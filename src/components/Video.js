import { ref } from "../deps/vue.js";

import { useHls } from "../deps/live.js";

import { hlsUrl } from "../../config.js";

export default {
  props: ["muted"],
  setup() {
    const videoRef = useHls(hlsUrl);
    return { videoRef };
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
