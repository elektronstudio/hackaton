import { ref } from "../deps/vue.js";
import { anime } from "../deps/anime.js";
import { pol2car } from "../lib/index.js";

const translate = (x = 0, y = 0) => `translate(${x} ${y})`;
const rotate = (a = 0, originX = 0, originY = 0) =>
  `rotate(${a} ${originX} ${originY})`;
const scale = (scaleX = 1, scaleY = 1) => `scale(${a} ${scaleX} ${scaleY})`;

const useAnimation = (customOptions) => {
  const options = {
    from: 0,
    to: 1,
    duration: 10,
    easing: "linear",
    loop: true,
    alternate: false,
    ...customOptions,
  };
  const value = ref(options.from);
  anime({
    targets: value,
    value: [options.from, options.to],
    duration: options.duration,
    easing: options.easing,
    direction: options.alternate ? "alternate" : null,
    loop: options.loop,
  });
  return value;
};

export default {
  setup() {
    const angle = useAnimation({ to: 360, duration: 10 * 60 * 1000 });
    return { angle, rotate, pol2car };
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
    </g>
  `,
};
