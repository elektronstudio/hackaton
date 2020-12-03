import { createApp } from "https://elektronstudio.github.io/live/src/deps/vue.js";

import { useUser } from "https://elektronstudio.github.io/live/src/lib/index.js";

const channel = "hackaton";

import Area from "./src/components/Area.js";

const App = {
  components: { Area },
  setup() {
    return {
      ...useUser(),
    };
  },
  template: `
  <Area />
  <!--h2>User</h2>
  Your username: {{ userName }}
  <button @click="onUserNameChange">Change</button-->
  `,
};

createApp(App).mount("#app");
