import { pol2car } from "../lib/index.js";

export default {
  setup() {
    return { pol2car };
  },
  template: `
    <circle
      v-for="r in 50"
      :r="r * 20 + 250"
      :stroke="'rgba(255,255,255,' + (r / 100) + ')'"
      fill="none"
    />
    <line 
      v-for="a in 36"
      :x1="pol2car(a * 10, 250).x"
      :y1="pol2car(a * 10, 250).y"
      :x2="pol2car(a * 10, 1000).x"
      :y2="pol2car(a * 10, 1000).y"
      stroke="rgba(255,255,255,0.2)"
    />
  `,
};
