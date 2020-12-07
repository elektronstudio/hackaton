import { createApp } from "./src/deps/vue.js";

import Background from "./src/components/Background.js";
import Buttons from "./src/components/Buttons.js";
import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import VideoStreams from "./src/components/VideoStreams.js";
import VideoFiles from "./src/components/VideoFiles.js";
import AudioFiles from "./src/components/AudioFiles.js";
import Camera from "./src/components/Camera.js";

const App = {
  components: {
    Background,
    Buttons,
    Svg,
    Users,
    VideoStreams,
    VideoFiles,
    AudioFiles,
    Camera,
  },
  template: `
  <AudioFiles />
  <VideoFiles />
  <VideoStreams />
  <Svg>
    <Background />
    <Users />
  </Svg>
  <Buttons />
  <Camera />
  `,
};

createApp(App).mount("#app");
