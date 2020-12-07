import { audioFileSources } from "../../config.js";

import AudioFile from "./AudioFile.js";

export default {
  components: { AudioFile },
  setup() {
    return { audioFileSources };
  },
  template: `
  <AudioFile v-for="src in audioFileSources" :src="src" />
  `,
};
