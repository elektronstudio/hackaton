import { createApp } from "./src/deps/vue.js";
import { useLocalstorage } from "./src/deps/live.js";
import { pol2car, random } from "./src/lib/index.js";

import * as components from "./src/components2/index.js";

import { videoFileSources } from "./config.js";

const src = videoFileSources[0];

const App = {
  components,
  setup() {
    const randomPosition = pol2car(random(0, 360), random(100, 200));
    const storedUser = useLocalstorage("ELEKTRON_USER", {
      userX: randomPosition.x,
      userY: randomPosition.y,
      mapX: null,
      mapY: null,
    });

    const onUserMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, userX: x, userY: y };
    };

    const onBackgroundMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, mapX: x, mapY: y };
    };

    return {
      storedUser,
      onUserMove,
      onBackgroundMove,
      src,
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
        <Item>
          <VideoFile
            :src="src"
            style="
              height: 250px;
              clipPath: circle(32%)
            "
          />
        </Item>
        <Svg>
          <circle
            v-for="r in 200"
            :r="r * 25"
            stroke="rgba(255,255,255,0.3)"
            fill="none"
          />
        </Svg>
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
