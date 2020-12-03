import {
  createApp,
  ref,
} from "https://elektronstudio.github.io/live/src/deps/vue.js";

import { useUser } from "https://elektronstudio.github.io/live/src/lib/index.js";

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
