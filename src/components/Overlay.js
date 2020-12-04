import { ref } from "../deps/vue.js";
import { useUser, events, IconMute, IconUnmute } from "../deps/live.js";

export default {
  components: { IconMute, IconUnmute },
  setup() {
    const muted = ref(true);
    const camera = ref(false);

    const onMute = () => {
      muted.value = true;
      events.emit("mute");
    };

    const onUnmute = () => {
      muted.value = false;
      events.emit("unmute");
    };

    const onCameraon = () => {
      camera.value = true;
      events.emit("cameraon");
    };

    const onCameraoff = () => {
      camera.value = false;
      events.emit("cameraoff");
    };

    const { onUserNameChange } = useUser();

    return {
      muted,
      onMute,
      onUnmute,
      camera,
      onCameraon,
      onCameraoff,
      onUserNameChange,
    };
  },
  template: `
  <div
    style="
      position: fixed;
      top: 16px;
      right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    "
  >
    <button v-if="camera" @click="onCameraoff">Stop camera</button>
    <button v-if="!camera" @click="onCameraon">Start camera</button>
  </div>
  <div
    style="
      position: fixed;
      bottom: 16px;
      right: 16px;
      left: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
    <IconMute v-if="muted" @click="onUnmute" />
    <IconUnmute v-if="!muted" @click="onMute" />
    <button @click="onUserNameChange">Change my name</button>
  </div>  
  `,
};
