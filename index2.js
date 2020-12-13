import { createApp } from "./src/deps/vue.js";

import { Viewport, Background, Map, Circle } from "./src/components2/index.js";

const App = {
  components: { Viewport, Background, Map, Circle },
  template: `
  <Viewport>
    <Map>
      <Background />
      <Circle
        x="-100"
        y="-100"
        style="border-color: blue"
      />
      <Circle
        x="0"
        y="0"
        style="border-color: orange"
      />
    </Map>
  </Viewport>
  `,
};

createApp(App).mount("#app");
