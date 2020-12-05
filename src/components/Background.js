import { useAnimation, rotate, pol2car, hsla } from "../lib/index.js";

export default {
  setup() {
    const angle = 0;
    const offset = useAnimation({
      to: 50,
      duration: 10 * 1000,
      alternate: true,
    });
    return { rotate, pol2car, hsla, angle, offset };
  },
  template: `
    <g :transform="rotate(angle)">
    <circle
      v-for="r in 150"
      :r="r * 10"
      :stroke="hsla(r * offset / 10, 100, 50, 0.1)"
      stroke-width="4"
      fill="none"
      :cx="offset"

    />
    <circle
      v-for="r in 150"
      :r="r * 10"
      :stroke="hsla(r * -offset / 10, 100, 50, 0.1)"
      stroke-width="4"
      opacity="0.2"
      fill="none"
      :cx="-offset"
    />
    <g :transform="rotate(angle)">
  `,
};
