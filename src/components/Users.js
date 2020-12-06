import { ref, computed, watchEffect } from "../deps/vue.js";
import { createMessage, useUser } from "../deps/live.js";
import { socket, useChannel, useImages, shorten } from "../lib/index.js";

import Draggable from "./Draggable.js";
import User from "./User.js";

import { channel } from "../../config.js";

export default {
  components: { Draggable, User },
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

    // TODO: Replace with watch
    watchEffect(() => usersWithImages.value);

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
  <User v-for="(user, i) in users" :user="user" />
  <Draggable :x="x" :y="y" @drag="onDrag">
    <circle r="70" fill="rgba(0,0,0,0)" />
  </Draggable>
  `,
};
