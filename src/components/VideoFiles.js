import { videoFileSources } from "../../config.js";

import VideoFile from "./VideoFile.js";

export default {
  components: { VideoFile },
  setup() {
    return { videoFileSources };
  },
  template: `
    <div
      v-for="(src, i) in videoFileSources" 
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
      <VideoFile
        :src="src"
        :style="{
         width: 800 - (i * 300) + 'px',
        }"
      />
    </div>
  `,
};
