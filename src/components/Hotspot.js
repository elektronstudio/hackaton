import { useAnimation, rgba, map } from "../lib/index.js";

export default {
  props: {
    x: { default: null },
    y: { default: null },
  },
  setup(props) {
    const smallRadius = useAnimation({
      from: 0,
      to: 1,
      alternate: true,
      duration: 1000 * 0.5,
      easing: "easeInOutSine",
    });
    const largeRadius = useAnimation({
      to: 3000,
      duration: 1000 * 10,
      easing: "easeInOutSine",
      delay: 1000 * 2.5,
    });
    return { smallRadius, largeRadius, rgba, map };
  },
  template: `
  <circle
    :cx="x"
    :cy="y"
    :r="8"
    :fill="rgba(255,0,0,1)"
  />
  <circle
    :cx="x"
    :cy="y"
    :r="15 + smallRadius * 5"
    :stroke="rgba(255,0,0,1)"
    fill="none"
  />
  <circle
    :cx="x"
    :cy="y"
    :r="largeRadius"
    :stroke="rgba(255,0,0,map(largeRadius,0,2000,1,0.5))"
    fill="none"
  />
  `,
};
