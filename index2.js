import { createApp } from "./src/deps/vue.js";

import { Viewport, Background, DraggableMap } from "./src/components2/index.js";

const App = {
  components: { Viewport, Background, DraggableMap },
  template: `
  <Viewport>
    <DraggableMap>
      <Background />
    </DraggableMap>
  </Viewport>
  `,
};

createApp(App).mount("#app");
