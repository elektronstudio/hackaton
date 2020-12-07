import { useAnimation, rotate, pol2car } from "../lib/index.js";

export default {
  setup() {
    // See easings at https://animejs.com/documentation/#pennerFunctions
    const angle = useAnimation({
      from: 0,
      to: 360,
      duration: 600 * 1000,
      easing: "linear",
    });
    const radius = useAnimation({
      from: 0,
      to: 100,
      duration: 12 * 1000,
      alternate: true,
      easing: "easeOutExpo",
    });
    return { rotate, pol2car, angle, radius };
  },
  template: `
    <g :transform="rotate(angle)">
    <!-- <line 
      v-for="a in 72"
      :x1="pol2car(a * 5, radius ).x"
      :y1="pol2car(a * 5, radius ).y" 
      :x2="pol2car(a * 5 - 100,  1500).x"
      :y2="pol2car(a * 5 - 100, 1500).y"
      stroke="rgba(255,255,255,0.1)"
    /> -->
    <line 
    v-for="a in 180"
    :x1="pol2car(a * 800 * 2 / 150 , radius ).x"
    :y1="pol2car(a * 800 * 2/ 150, radius ).y" 
    :x2="pol2car(a * 2, 1500).x"
    :y2="pol2car(a * 2, 1500).y"
    :stroke="'hsla('+ a +', 70%, 60%, 0.2)'"
    stroke-with="1"
  />
    </g>
  `,
};
