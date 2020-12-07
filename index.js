import { createApp } from "./src/deps/vue.js";

import Background from "./src/components/Background.js";
import Overlay from "./src/components/Overlay.js";
import Svg from "./src/components/Svg.js";
import Users from "./src/components/Users.js";
import VideoStreams from "./src/components/VideoStreams.js";
import VideoFiles from "./src/components/VideoFiles.js";
import AudioFiles from "./src/components/AudioFiles.js";
import Camera from "./src/components/Camera.js";

const App = {
  components: {
    Background,
    Overlay,
    Svg,
    Users,
    VideoStreams,
    VideoFiles,
    AudioFiles,
    Camera,
  },
  template: `
  <VideoFiles />
  <VideoStreams />
  <Svg>
    <Background />
    <Users />
  </Svg>
  <Overlay />
  <AudioFiles />
  <Camera />
  `,
};

createApp(App).mount("#app");
