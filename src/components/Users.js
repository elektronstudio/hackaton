import { ref, computed, watchEffect } from "../deps/vue.js";
import { socket, createMessage, useUser } from "../deps/live.js";

import { useChannel, useImages, shorten, useAnimation } from "../lib/index.js";
import Draggable from "./Draggable.js";
import { channel } from "../../config.js";

export default {
  components: { Draggable },
  setup() {
    const x = ref(0);
    const y = ref(0);

    const onDrag = ({ dragX, dragY }) => {
      console.log(x.value);
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

    // TODO: Replace with watch
    watchEffect(() => usersWithImages.value);

    const { userId } = useUser();

    const offset = useAnimation({
      to: 3,
      duration: 1 * 1000,
      alternate: true,
    });

    return {
      onDrag,
      x,
      y,
      users,
      userId,
      shorten,
      offset,
    };
  },
  template: `
  <g v-for="user in users.filter(user => user.userId !== userId)">
    <defs>
      <clipPath :id="'clip' + user.userId">
        <circle :cx="user.userX || 0" :cy="user.userY || 0" :r="50" />
      </clipPath>
    </defs>
    <circle
      :cx="user.userX || 0"
      :cy="user.userY || 0"
      :r="50"
      stroke="white"
      :opacity="user.image ? 0 : 1"
      fill="rgba(255,255,255,0.1)"
    />
    <image
      v-if="user.image"
      :href="user.image"
      width="100"
      height="100"
      :x="user.userX ? user.userX - 50 : -50"
      :y="user.userY ? user.userY - 50 : -50"
      :clip-path="'url(#clip' + user.userId + ')'"
    />
    <text
      text-anchor="middle"
      alignment-baseline="central"
      :x="user.userX || 0"
      :y="user.userY ? user.userY - 75 : -75"
      fill="white"
      style="pointer-events: none;"
    >{{ user.userName }}</text>
  </g>

  <g v-for="(user, i) in users.filter(user => user.userId === userId)">
    <defs>
      <clipPath :id="'clip' + user.userId">
        <circle :cx="user.userX || 0" :cy="user.userY || 0" :r="50" />
      </clipPath>
    </defs>
    <!--circle
      v-for="r in 5"
      :cx="user.userX + offset"
      :cy="user.userY"
      :r="45 + (r * 5)"
      fill="none"
      stroke="white"
      stroke-width="2"
      :opacity="0.5 - (r / 5)"
    /-->
    <circle
      v-for="r in 5"
      :cx="user.userX"
      :cy="user.userY"
      :r="50 + (r * 7)"
      fill="none"
      stroke="white"
      stroke-width="2"
      :opacity="0.75 - (r / 5)"
    />
    <circle
      :cx="user.userX"
      :cy="user.userY"
      :r="50"
      stroke="white"
      fill="rgba(255,255,255,0.5)"
      :opacity="user.image ? 0 : 1"
    />
    <image
      v-if="user.image"
      :href="user.image"
      width="100"
      height="100"
      :x="user.userX ? user.userX - 50 : -50"
      :y="user.userY ? user.userY - 50 : -50"
      :clip-path="'url(#clip' + user.userId + ')'"
    />
    <text
      text-anchor="middle"
      alignment-baseline="central"
      :x="user.userX"
      :y="user.userY ? user.userY - 75 : -75"
      font-size="16px"
      fill="white"
      style="pointer-events: none;"
    >{{ user.userName }}</text>
  </g>

  <Draggable :x="x" :y="y" @drag="onDrag">
    <circle r="70" fill="rgba(0,0,0,0)" />
  </Draggable>
  `,
};
