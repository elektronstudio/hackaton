import { ref } from "../deps/vue.js";
import { useUser, events } from "../deps/live.js";
import IconCameraon from "./IconCameraon.js";
import IconCameraoff from "./IconCameraoff.js";
import IconMute from "./IconMute.js";
import IconUnmute from "./IconUnmute.js";

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
      display: grid;
      grid-template-columns: auto 1fr auto;
      bottom: 24px;
      left: 24px;
      right: 24px;
      align-items: center;
      cursor: pointer; 
      gap: 16px;
    ">
      <IconMute v-if="muted" @click="onUnmute" style="fill: white;" transform="scale(1.75)" />
      <IconUnmute v-if="!muted" @click="onMute" style="fill: white;" transform="scale(1.75)" />
      <input v-model="userName" />
      <IconCameraon v-if="camera" @click="onCameraoff" style="stroke: white;" transform="scale(1.75)"/>
      <IconCameraoff v-if="!camera" @click="onCameraon" style="stroke: white;" transform="scale(1.75)"/>
  </div>
  `,
};
