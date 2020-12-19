import { createApp } from "./src/deps/vue.js";
import { useLocalstorage } from "./src/deps/live.js";

import { Viewport, Svg, Map, Circle } from "./src/components2/index.js";

const App = {
  components: { Viewport, Svg, Map, Circle },
  setup() {
    const userX = useLocalstorage("USER_X", 10);
    const userY = useLocalstorage("USER_Y", 10);
    const backgroundX = useLocalstorage("BACKGROUND_X", -50);
    const backgroundY = useLocalstorage("BACKGROUND_Y", -50);

    const onUserMove = ({ x, y }) => {
      userX.value = x;
      userY.value = y;
    };

    const onBackgroundMove = ({ x, y }) => {
      backgroundX.value = x;
      backgroundY.value = y;
      console.log(x, y);
    };

    return {
      userX,
      userY,
      onUserMove,
      backgroundX,
      backgroundY,
      onBackgroundMove,
    };
  },
  template: `
  <Viewport>
    <Map
      :userX="userX"
      :userY="userY"
      :backgroundX="backgroundX"
      :backgroundY="backgroundY"
      @userMove="onUserMove"
      @backgroundMove="onBackgroundMove"
    >
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
