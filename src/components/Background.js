import { pol2car } from "../lib/index.js";

export default {
  setup() {
    return { pol2car };
  },
  template: `
    <circle
      v-for="r in 360"
      :r="r * 30 + 10"
      :stroke="'rgba(0,0,200,1' + (r / 100) + ')'"
      fill="none"
    />
 
  `
};
