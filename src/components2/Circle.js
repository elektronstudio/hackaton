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
      width: 200px;
      height: 200px;
      border: 2px solid red;
      border-radius: 10000px;
    "
  />
  `,
};
