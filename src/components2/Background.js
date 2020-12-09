export default {
  props: { width: { default: 0 }, height: { default: 0 } },
  setup(props) {
    const viewBox = `${props.width / -2} ${props.height / -2} ${props.width} ${
      props.height
    }`;
    return { viewBox };
  },
  template: `
  <div
    style="border: 2px solid green"
    :style="{width: width + 'px', height: height + 'px'}"
  >
    <svg :view-box.camel="viewBox">
      <slot />
      <!--line :x2="myX" :y2="myY" stroke="white" /-->
      <circle v-for="r in 100" :r="r * 10" cx="0" cy="0" stroke="rgba(255,255,255,0.3)" fill="none" />
    </svg>
  </div>
  <div
    :style="{ top: height / 2 + 'px', left: width / 2 + 'px'}"
    style="
      width: 200px;
      height: 200px;
      position: absolute;
      border: 2px solid rebeccapurple;
      transform: translate(-50%, -50%);
      border-radius: 10000px;
    "
  />
  <div
    :style="{ top: (height / 2 - 500) + 'px', left: (width / 2 - 500) + 'px'}"
    style="
      width: 200px;
      height: 200px;
      position: absolute;
      border: 2px solid yellow;
      transform: translate(-50%, -50%);
      border-radius: 10000px;
    "
  />
  `,
};
