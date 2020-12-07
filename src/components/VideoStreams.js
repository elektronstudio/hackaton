import { videoStreamSources } from "../../config.js";

import VideoStream from "./VideoStream.js";

export default {
  components: { VideoStream },
  setup() {
    return { videoStreamSources };
  },
  template: `
    <div
      v-for="(src, i) in videoStreamSources" 
      style="
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        mix-blend-mode: difference;
      "
    >
      <VideoStream
        :src="src"
        :style="{
         width: 800 - (i * 300) + 'px',
         clipPath: 'circle(33%)'
        }"
      />
    </div>
  `,
};
