import { ref } from "../deps/vue.js";
import { socket, createMessage, useUser } from "../deps/live.js";
import { random } from "../deps/foyer2.js";

import { useChannel } from "../lib/channel.js";

import Svg from "./Svg.js";
import Draggable from "./Draggable.js";

const channel = "hackaton";

export default {
  components: { Svg, Draggable },
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
    };
  },
  template: `
  <Svg>
    <g v-for="user in users">
      <circle :cx="user.userX" :cy="user.userY" :r="40" />
      <text
        text-anchor="middle"
        alignment-baseline="central"
        :x="user.userX"
        :y="user.userY"
        fill="white"
        style="pointer-events: none;"
      >{{ user.userName }}</text>
      <circle
        v-if="user.userId === userId"
        :cx="user.userX"
        :cy="user.userY"
        r="45"
        fill="none"
        stroke="black"
        stroke-width="3"
      />
    </g>
    <Draggable :x="x" :y="y" @drag="onDrag">
      <circle r="60" fill="rgba(0,0,0,0)" />
    </Draggable>
  </Svg>
  <div style="position: fixed; top: 10px; left: 10px">
    {{ x }} / {{ y }}
  </div>
  <div style="position: fixed; top: 10px; right: 10px; width: 200px; background: gray;">
    {{ users }}
  </div>
  `,
};
