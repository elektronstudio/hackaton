export default {
  template: `
  <div
    style="
      position: relative;
      overflow: hidden;
      width: 100vw;
      height: -webkit-fill-available;
      height: 100vh;
      border: 2px solid orange;
    "
  >
    <slot />
  </div>`,
};
