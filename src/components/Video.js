import { ref } from "../deps/vue.js";

import { useHls } from "../deps/live.js";

const url =
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

export default {
  props: ["muted"],
  setup() {
    const videoRef = useHls(url);
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
        ref="videoRef" :muted="muted" controls inline autoplay
        style="width: 600px; clip-path: circle(33%);"
        @click="isMuted = !isMuted"
      />
    </div>
  `,
};
