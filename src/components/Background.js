import { useAnimation, rotate, pol2car } from "../lib/index.js";

export default {
  setup() {
    //const angle = useAnimation({ to: 360, duration: 5 * 60 * 1000 });
    const angle = 0;
    return { rotate, pol2car, angle };
  },
  template: `
    <!-- <circle
      v-for="r in 50"
      :r="r * 20 + 250"
      :stroke="'rgba(255,255,255,' + (r / 100) + ')'"
      fill="none"
    /> -->
    <g :transform="rotate(angle)">
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 50).x"
      :y1="pol2car(a * 5, 50).y"
      :x2="pol2car(a * 5 + 100, 1500).x"
      :y2="pol2car(a * 5 + 100, 1500).y"
      stroke="rgba(255,255,255,0.2)"
    />
    <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, 50).x"
      :y1="pol2car(a * 5, 50).y"
      :x2="pol2car(a * 5 - 100, 1500).x"
      :y2="pol2car(a * 5 - 100, 1500).y"
      stroke="rgba(255,255,255,0.2)"
    />
    </g>
  `,
};
