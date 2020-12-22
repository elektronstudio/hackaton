import { rotate, pol2car, hsla } from "../lib/index.js";

export default {
  setup() {
    const angle = 0;
    return { rotate, pol2car, angle, hsla };
  },
  template: `
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 350 / 2).x"
      :y1="pol2car(a * 5, 350 / 2).y"
      :x2="pol2car(a * 5 + 100, 2500).x"
      :y2="pol2car(a * 5 + 100, 2500).y"
      :stroke="hsla(a * 10,70,60, 0.2)"
    />
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 350 / 2).x"
      :y1="pol2car(a * 5, 350 / 2).y"
      :x2="pol2car(a * 5 - 100, 2500).x"
      :y2="pol2car(a * 5 - 100, 2500).y"
      :stroke="hsla(a * 10,70,60, 0.2)"

    />
  `,
};
