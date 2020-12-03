import { createApp, ref } from "./src/deps/vue.js";

import { useUser } from "./src/deps/live.js";

import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import Video from "./src/components/Video.js";

const App = {
  components: { Video, Svg, Users },
  setup() {
    const muted = ref(true);
    return {
      ...useUser(),
      muted,
    };
  },
  template: `
  <Video :muted="muted" />
  <Svg>
    <Users />
    <circle v-for="r in 50" :r="r * 20 + 200" :stroke="'rgba(255,255,255,' + (0.3 - r / 100) + ')'" fill="none" />
  </Svg>
  <div
    style="
      position: fixed;
      bottom: 16px;
      right: 16px;
      left: 16px;
      display: flex;
      justify-content: space-between;
    ">
    <button @click="muted = !muted">{{ muted ? 'Unmute' : 'Mute' }}</button>
    <button @click="onUserNameChange">Change my name</button>
  </div>  
  `,
};

createApp(App).mount("#app");
