export const channel = "hackaton";

export const videoStreamSources = [channel, "hackaton_hendrik"].map(
  (c) => `https://elektron-live.babahhcdn.com/bb1150-le/${c}/index.m3u8`
);

export const videoFileSources = [
  "https://elektron.live/assets/particleball_small.mp4",
];

export const audioFileSources = [
  "https://elektron.live/assets/generative-backround-hackaton.mp3",
];

export const chatUrl = "wss://ws-fggq5.ondigitalocean.app";

//export const chatUrl = "ws://localhost:8080";
