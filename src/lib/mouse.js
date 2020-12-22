import {
  ref,
  onMounted,
  onUnmounted,
} from "https://elektronstudio.github.io/live/src/deps/vue.js";

export const useMouse = () => {
  const mouseX = ref(null);
  const mouseY = ref(null);

  const update = (e) => {
    mouseX.value = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    mouseY.value = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
    window.removeEventListener("touchmove", update);
  });

  return { mouseX, mouseY };
};
