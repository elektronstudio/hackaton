import { Item } from "./index.js";

export default {
  components: { Item },
  props: {
    x: { default: 0 },
    y: { default: 0 },
  },
  template: `
  <Item
    :x="x"
    :y="y"
    style="
      width: 80px;
      height: 80px;
      border: 2px solid white;
      border-radius: 10000px;
    "
  >
    <slot />
  </Item>
  `,
};
