import { ref } from "../deps/vue.js";
import { anime } from "../deps/anime.js";

export const useAnimation = (customOptions) => {
  const options = {
    from: 0,
    to: 1,
    duration: 10,
    easing: "linear",
    loop: true,
    alternate: false,
    ...customOptions,
  };
  const progress = ref(options.from);
  const animation = anime({
    targets: progress,
    value: [options.from, options.to],
    duration: options.duration,
    easing: options.easing,
    direction: options.alternate ? "alternate" : null,
    loop: options.loop,
    autoplay: options.autoplay,
  });
  const pause = () => animation.pause();
  const play = () => animation.play();
  return { value: progress, play, pause };
};
