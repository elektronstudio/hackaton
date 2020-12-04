import { ref } from "../deps/vue.js";
import { socket, createMessage, useUser } from "../deps/live.js";

import { useChannel, shorten } from "../lib/index.js";
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
    };

    const { users } = useChannel("hackaton");
    const { userId } = useUser();

    return {
      onDrag,
      x,
      y,
      users,
      userId,
      shorten,
    };
  },
  template: `
  <g v-for="user in users">
    <circle :cx="user.userX" :cy="user.userY" :r="40" fill="white" />
    <text
      text-anchor="middle"
      alignment-baseline="central"
      :x="user.userX"
      :y="user.userY"
      fill="black"
      style="pointer-events: none;"
    >{{ user && user.userName ? shorten(user.userName, 7) : '' }}</text>
    <circle
      v-if="user.userId === userId"
      :cx="user.userX"
      :cy="user.userY"
      r="45"
      fill="none"
      stroke="white"
      stroke-width="3"
    />
  </g>
  <Draggable :x="x" :y="y" @drag="onDrag">
    <circle r="60" fill="rgba(0,0,0,0)" />
  </Draggable>
  `,
};
