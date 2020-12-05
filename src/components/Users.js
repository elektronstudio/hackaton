import { ref, computed, watchEffect, watch } from "../deps/vue.js";
import { socket, createMessage, useUser, events } from "../deps/live.js";

import {
  useChannel,
  useImages,
  shorten,
  useAnimation,
  pointatline,
  distance,
} from "../lib/index.js";
import Draggable from "./Draggable.js";
import { channel } from "../../config.js";

export default {
  components: { Draggable },
  setup() {
    const x = ref(0);
    const y = ref(0);

    const onDrag = ({ dragX, dragY }) => {
      x.value = dragX;
      y.value = dragY;

      const outgoingMessage = createMessage({
        type: "CHANNEL_USER_UPDATE",
        channel,
        value: {
          userX: x.value,
          userY: y.value,
        },
      });
      socket.send(outgoingMessage);

      const outgoingMessage2 = createMessage({
        type: "ANYTHING",
        channel,
        value: `${x.value} ${y.value}`,
      });
      socket.send(outgoingMessage2);
    };

    const { users } = useChannel("hackaton");
    const { images2 } = useImages(channel);
    const usersWithImages = computed(() =>
      users.value.map((user) => {
        const imageUser = images2.value.find(
          ({ userId }) => userId === user.userId
        );
        if (imageUser) {
          user.image = imageUser.value;
        }
        return user;
      })
    );

    const { userId } = useUser();

    const currentUser = computed(() =>
      users.value.find((user) => {
        return user.userId === userId.value;
      })
    );

    // TODO: Replace with watch
    watchEffect(() => usersWithImages.value);

    const pulling = ref(false);

    events.on("pull", () => {
      const d = useAnimation({ from: 0, to: 1, duration: 1000 });
      pulling.value = true;
      watch(
        () => d.value,
        (value) => {
          if (currentUser.value) {
            const { x: dragX, y: dragY } = pointatline(
              0,
              0,
              currentUser.value.userX || 0,
              currentUser.value.userY || 0,
              distance(
                0,
                0,
                currentUser.value.userX || 0,
                currentUser.value.userY || 0
              ) - value
            );
            onDrag({ dragX, dragY });
          }
        }
      );
    });

    return {
      onDrag,
      x,
      y,
      users,
      userId,
      shorten,
      pulling,
    };
  },
  template: `
  <g v-for="(user, i) in users">
    <defs>
      <clipPath :id="'user' + i">
        <circle :cx="user.userX" :cy="user.userY" :r="50" />
      </clipPath>
    </defs>
    <line 
      v-if="pulling && user.userId === userId"
      :x2="user.userX"
      :y2="user.userY"
      stroke="rgba(255,255,255,0.5)"
    />
    <circle :cx="user.userX" :cy="user.userY" :r="50" fill="rgba(200,200,200,1)" :opacity="user.image ? 1 : 0.5" />
    <image
      v-if="user.image"
      :href="user.image"
      width="100"
      height="100"
      :x="user.userX ? user.userX - 50 : -50"
      :y="user.userY ? user.userY - 50 : -50"
      :clip-path="'url(#user' + i + ')'"
    />
    <text
      text-anchor="middle"
      alignment-baseline="central"
      :x="user.userX"
      :y="user.userY ? user.userY - 75 : -75"
      fill="white"
      style="pointer-events: none;"
    >{{ user.userName }}</text>
    <circle
      v-if="user.userId === userId"
      :cx="user.userX"
      :cy="user.userY"
      r="50"
      fill="none"
      stroke="white"
      stroke-width="3"
    />
   
  </g>
  <Draggable :x="x" :y="y" @drag="onDrag">
    <circle r="70" fill="rgba(0,0,0,0)" />
  </Draggable>
  <div style="display: fixed: top: 0, right: 0, background: gray, width: 300px">
    ...
  </div>
  `,
};
