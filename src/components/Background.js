import { useAnimation, rotate, pol2car, hsla } from "../lib/index.js";

export default {
  setup() {
    const angle = 0;
    return { rotate, pol2car, angle, hsla };
  },
  template: `
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 300).x"
      :y1="pol2car(a * 5, 0).y"
      :x2="pol2car(a * 5 + 100, 1500).x"
      :y2="pol2car(a * 5 + 100, 1500).y"
      :stroke="hsla(a * 10,70,60, 0.2)"
    />
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 300).x"
      :y1="pol2car(a * 5, 300).y"
      :x2="pol2car(a * 5 - 100, 1500).x"
      :y2="pol2car(a * 5 - 100, 1500).y"
      :stroke="hsla(a * 10,70,60, 0.2)"

    />
  `,
};
