import { pol2car } from "../lib/index.js";

export default {
  setup() {
    return { pol2car };
  },
  template: `
    <!-- <circle
      v-for="r in 50"
      :r="r * 20 + 250"
      :stroke="'rgba(255,255,255,' + (r / 100) + ')'"
      fill="none"
    /> -->
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 370).x"
      :y1="pol2car(a * 5, 370).y"
      :x2="pol2car(a * 5 + 100, 1500).x"
      :y2="pol2car(a * 5 + 100, 1500).y"
      stroke="rgba(255,255,255,0.2)"
    />
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 370).x"
      :y1="pol2car(a * 5, 370).y"
      :x2="pol2car(a * 5 - 100, 1500).x"
      :y2="pol2car(a * 5 - 100, 1500).y"
      stroke="rgba(255,255,255,0.2)"
    />
  `,
};
