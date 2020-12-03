import { createApp } from "https://elektronstudio.github.io/live/src/deps/vue.js";

import { useUser } from "https://elektronstudio.github.io/live/src/lib/index.js";

import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";

const App = {
  components: { Svg, Users },
  setup() {
    return {
      ...useUser(),
    };
  },
  template: `
  <Svg>
    <Users />
  </Svg>
  <div style="position: fixed; bottom: 10px; right: 10px; width: 200px; background: gray;">
    <button @click="onUserNameChange">Change my name</button-->
  </div>
  `,
};

createApp(App).mount("#app");
