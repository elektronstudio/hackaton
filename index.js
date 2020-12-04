import { createApp, ref } from "./src/deps/vue.js";

import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import Video from "./src/components/Video.js";
import Overlay from "./src/components/Overlay.js";

const App = {
  components: { Video, Svg, Users, Overlay },
  template: `
  <Video />
  <Svg>
    <Users />
    <circle v-for="r in 50" :r="r * 20 + 200" :stroke="'rgba(255,255,255,' + (0.3 - r / 100) + ')'" fill="none" />
  </Svg>
  <Overlay />
  `,
};

createApp(App).mount("#app");
