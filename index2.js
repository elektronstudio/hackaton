import { createApp } from "./src/deps/vue.js";

import { Viewport, Svg, Map, Circle } from "./src/components2/index.js";

const App = {
  components: { Viewport, Svg, Map, Circle },
  setup() {
    const onUserMove = ({ x, y }) => {
      console.log(x, y);
    };

    return { onUserMove };
  },
  template: `
  <Viewport>
    <Map @userMove="onUserMove">
      <template #background>
        <Svg>
          <circle
            v-for="r in 100"
            :r="r * 10"
            stroke="rgba(255,255,255,0.3)"
            fill="none"
          />
          <!--line :x2="myX" :y2="myY" stroke="white" /-->
        </Svg>
        <Circle
          x="-100"
          y="-100"
          style="border-color: blue"
        />
        <Circle
          x="0"
          y="0"
          style="border-color: orange"
        />
      </template>
      <template #user>
        <Circle
          x="0"
          y="0"
          style="
            background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
            background-size: cover;
          "
        />
    </Map>
  </Viewport>
  `,
};

createApp(App).mount("#app");
