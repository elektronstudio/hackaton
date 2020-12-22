export default {
  template: `
  <circle
    v-for="r in 200"
    :r="r * 25"
    stroke="rgba(255,255,255,0.15)"
    fill="none"
  />
  `,
};
