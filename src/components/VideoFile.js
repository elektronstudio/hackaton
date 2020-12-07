import { ref } from "../deps/vue.js";
import { events } from "../deps/live.js";

export default {
  props: {
    src: {
      default: "",
    },
  },
  setup() {
    const videoRef = ref(null);
    const muted = ref(true);

    events.on("mute", () => {
      muted.value = true;
    });
    events.on("unmute", () => {
      muted.value = false;
    });

    return { muted, videoRef };
  },
  template: `
  <video
    ref="videoRef"
    :src="src"
    :muted="muted" 
    inline
    autoplay
    loop
  />
  `,
};
