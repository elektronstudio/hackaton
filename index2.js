import { createApp, computed } from "./src/deps/vue.js";
import { useLocalstorage, useUser, createMessage } from "./src/deps/live.js";
import {
  pol2car,
  random,
  socket,
  useChannel,
  useImages,
} from "./src/lib/index.js";

import * as components from "./src/components2/index.js";

import {
  channel,
  audioFileSources,
  videoFileSources,
  videoStreamSources,
} from "./config.js";

// TODO: Simplify
const audioFileSrc = audioFileSources[0];
const videoFileSrc = videoFileSources[0];
const videoStreamSrc = videoStreamSources[0];

const App = {
  components,
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

    const onMapMove = ({ x, y }) => {
      storedUser.value = { ...storedUser.value, mapX: x, mapY: y };
    };

    const { userId } = useUser();
    const { users: allUsers } = useChannel(channel);
    const { images2 } = useImages(channel);

    const usersWithImages = computed(() =>
      allUsers.value.map((user) => {
        const imageUser = images2.value.find(
          ({ userId }) => userId === user.userId
        );
        if (imageUser) {
          user.image = imageUser.value;
        }
        return user;
      })
    );

    const users = computed(() =>
      usersWithImages.value.filter((user) => user.userId !== userId.value)
    );

    const user = computed(
      () =>
        usersWithImages.value.filter((user) => user.userId === userId.value)[0]
    );

    return {
      storedUser,
      onUserMove,
      onMapMove,
      videoFileSrc,
      audioFileSrc,
      videoStreamSrc,
      users,
      user,
    };
  },
  template: `
    <Map
      :userX="storedUser.userX"
      :userY="storedUser.userY"
      :mapX="storedUser.mapX"
      :mapY="storedUser.mapY"
      @userMove="onUserMove"
      @onMapMove="onMapMove"
    >
      <template #background>
        <Item>
          <VideoFile
            :src="videoFileSrc"
            style="
              height: 350px;
              clipPath: circle(33%)
            "
          />
        </Item>
        <Item>
          <VideoStream
            :src="videoStreamSrc"
            style="
              height: 250px;
              clipPath: circle(33%)
            "
          />
        </Item>
        <Svg>
          <BackgroundCircles />
        </Svg>
        <transition-group name="fade">
          <div v-for="user in users" :key="user.userId">
          <Circle
            :x="user.userX"
            :y="user.userY"
            :style="{backgroundImage: 'url(' + user.image + ')'}"
            style="
              background-size: cover;
              border-color: rgba(255,255,255,0.5);
              padding: 16px;
              transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
            "
          />
          <Item
            :x="user.userX"
            :y="user.userY + 65"
            style="
              width: 1000px;
              text-align: center;
              pointer-events: none;
            "
          >
            {{ user && user.userName ? user.userName : '' }}
          </Item>
          </div>
        </transition-group>
      </template>
      <template #user>
        <Circle
          x="0"
          y="0"
          :style="{backgroundImage: user && user.image ? 'url(' + user.image + ')' : ''}"
          style="
            background-size: cover;
            border-width: 3px;
          "
        >
        </Circle>
        <Item
          y="65"
          style="
            width: 1000px;
            text-align: center;
            pointer-events: none;
          "
        >
          {{ user && user.userName ? user.userName : '' }}
        </Item>
      </template>
    </Map>
  <Buttons />
  <Camera />
  <AudioFile :src="audioFileSrc" />
  `,
};

createApp(App).mount("#app");
