import { createApp } from "./src/deps/vue.js";

import { Viewport, Background, Map, MapItem } from "./src/components2/index.js";

const App = {
  components: { Viewport, Background, Map, MapItem },
  template: `
  <Viewport>
    <Map>
      <Background />
      <MapItem
        x="-100"
        y="-100"
        style="
          width: 200px;
          height: 200px;
          border: 2px solid red;
          border-radius: 10000px;
        "
      />
    </Map>
  </Viewport>
  `,
};

createApp(App).mount("#app");
