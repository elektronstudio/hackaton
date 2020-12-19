import { events } from "../deps/live.js";
import { useImages } from "../lib/index.js";
import { channel } from "../../config.js";

export default {
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
    <video
      ref="videoEl"
      autoplay
      playsinline
      style="
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        pointer-events: none;
      "
    />
    <canvas ref="canvasEl" style="display: none" />
  `,
};
