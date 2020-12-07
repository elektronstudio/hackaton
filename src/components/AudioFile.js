import { ref } from "../deps/vue.js";
import { events } from "../deps/live.js";

export default {
  props: {
    src: {
      default: "",
    },
  },
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

    return { muted, audioRef };
  },
  template: `
  <audio
    ref="audioRef"
    :src="src"
    :muted="muted" 
    autoplay
    loop
  />
  `,
};
