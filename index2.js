import { createApp, computed, TransitionGroup } from "./src/deps/vue.js";
import { useLocalstorage, useUser, createMessage } from "./src/deps/live.js";
import {
  pol2car,
  random,
  socket,
  useChannel,
  useImages,
  shorten,
} from "./src/lib/index.js";

import * as components from "./src/components2/index.js";

import { videoFileSources } from "./config.js";

const src = videoFileSources[0];
const channel = "hackaton2";

console.log(components);

const App = {
  components: { ...components, TransitionGroup },
  setup() {
    const randomPosition = pol2car(random(0, 360), random(100, 200));
    const storedUser = useLocalstorage("elektron_user_data", {
      userX: randomPosition.x,
      userY: randomPosition.y,
      mapX: null,
      mapY: null,
    });

    const onUserMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, userX: x, userY: y };
      const outgoingMessage = createMessage({
        type: "CHANNEL_USER_UPDATE",
        channel,
        value: {
          userX: x,
          userY: y,
        },
      });
      socket.send(outgoingMessage);
    };

    const { userId } = useUser();
    const { users: allUsers } = useChannel(channel);
    const { images2 } = useImages(channel);

    const users = computed(() =>
      allUsers.value
        .filter((user) => user.userId !== userId.value)
        .map((user) => {
          const imageUser = images2.value.find(
            ({ userId }) => userId === user.userId
          );
          if (imageUser) {
            user.image = imageUser.value;
          }
          return user;
        })
    );

    const onBackgroundMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, mapX: x, mapY: y };
    };

    return {
      storedUser,
      onUserMove,
      onBackgroundMove,
      src,
      users,
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
              clipPath: circle(33%)
            "
          />
        </Item>
        <Svg>
          <circle
            v-for="r in 200"
            :r="r * 25"
            stroke="rgba(255,255,255,0.15)"
            fill="none"
          />
        </Svg>
        <transition-group name="fade">
        <Circle
          v-for="user in users"
          :key="user.userId"
          :x="user.userX"
          :y="user.userY"
          :style="{backgroundImage: 'url(' + user.image + ')'}"
          style="
            background-size: cover;
            border-color: rgba(255,255,255,0.5);
            padding: 16px;
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          "
        >{{ Math.floor(user.userX) }}<br />{{ Math.floor(user.userY) }}
        </Circle>
        </transition-group>
      </template>
      <template #user>
        <Circle
          x="0"
          y="0"
          style="
            background: url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg);
            background-size: cover;
            border-width: 3px;
          "
        />
      </template>
    </Map>
  </Viewport>
  <Buttons />
  <Camera />
  `,
};

createApp(App).mount("#app");
