import { createApp } from "./src/deps/vue.js";
import { useLocalstorage } from "./src/deps/live.js";
import { pol2car, random } from "./src/lib/index.js";

import { Viewport, Svg, Map, Circle } from "./src/components2/index.js";

const App = {
  components: { Viewport, Svg, Map, Circle },
  setup() {
    const userX = useLocalstorage("USER_X", 0);
    const userY = useLocalstorage("USER_Y", 0);
    const mapX = useLocalstorage("MAP_X", null);
    const mapY = useLocalstorage("MAP_Y", null);

    const randomPosition = pol2car(random(0, 360), 100);
    const storedUser = useLocalstorage("ELEKTRON_USER", {
      userX: Math.floor(randomPosition.x),
      userY: Math.floor(randomPosition.y),
      mapX: null,
      mapY: null,
    });

    const onUserMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, userX: x, userY: y };
    };

    const onBackgroundMove = ({ x, y }) => {
      mapX.value = x;
      mapY.value = y;
    };

    return {
      userX,
      userY,
      storedUser,
      onUserMove,
      mapX,
      mapY,
      onBackgroundMove,
    };
  },
  template: `
  <Viewport>
    <Map
      :userX="storedUser.userX"
      :userY="storedUser.userY"
      :mapX="storedUser.mapX"
      :mapY="storedUser.mapY"
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
