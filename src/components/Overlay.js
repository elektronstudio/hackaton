import { ref } from "../deps/vue.js";
import { useUser, events, IconMute, IconUnmute } from "../deps/live.js";
import IconCameraon from "./IconCameraon.js";
import IconCameraoff from "./IconCameraoff.js";

export default {
  components: { IconMute, IconUnmute, IconCameraon, IconCameraoff },
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

    const { userName } = useUser();

    return {
      muted,
      onMute,
      onUnmute,
      camera,
      onCameraon,
      onCameraoff,
      userName,
    };
  },
  template: `
   <div
    style="
      position: fixed;
      bottom: 24px;
      right: 16px;
      left: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
    <input v-model="userName" style="width: 300px;" />
  </div>  
  <div
    style="
      position: fixed;
      bottom: 24px;
      right: 16px;
      left: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
    <div style="display: flex; align-items: center; cursor: pointer; ">
      <IconMute v-if="muted" @click="onUnmute" transform="translate(15 0) scale(1.75)" />
      <IconUnmute v-if="!muted" @click="onMute" transform="translate(15 0) scale(1.75)" />
    <div @click="onMute" v-show="muted" style="margin-left: 35px; opacity: 0.5">Turn on the sound</div>
    </div>
    <div style="display: flex; align-items: center; cursor: pointer; ">
    <div @click="onCameraon" v-show="!camera" style="margin-right: 35px; opacity: 0.5">Turn on the camera</div>
      <IconCameraon v-if="camera" @click="onCameraoff" transform="translate(-15 0) scale(1.75)"/>
      <IconCameraoff v-if="!camera" @click="onCameraon" transform="translate(-15 0) scale(1.75)"/>
    </div>
  </div>
  `,
};
