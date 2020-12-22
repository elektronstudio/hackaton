import { useAnimation, rgba, map } from "../lib/index.js";

export default {
  setup() {
    const radius = useAnimation({
      to: 2000,
      duration: 1000 * 10,
      easing: "easeOutQuart",
      delay: 1000 * 5,
    });
    return { radius, rgba, map };
  },
  template: `
  <circle
    v-for="r in 200"
    :r="r * 25"
    stroke="rgba(255,255,255,0.15)"
    fill="none"
  />
  <circle
    cx="-1000"
    cy="-1000"
    r="10"
    fill="red"
  />
  <circle
    cx="-1000"
    cy="-1000"
    :r="radius"
    :stroke="rgba(255,0,0,map(radius,0,2000,1,0.5))"
    fill="none"
  />
  `,
};
