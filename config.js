export const channel = "hackaton";

export const channels = [channel, "hackaton_kristjan", "hackaton_hendrik"];

export const channelSources = channels.map(
  (c) => `https://elektron-live.babahhcdn.com/bb1150-le/${c}/index.m3u8`
);

export const audioSource =
  "https://elektron.live/assets/generative-backround-hackaton.mp3";

//export const chatUrl = "wss://ws-fggq5.ondigitalocean.app";

export const chatUrl = "ws://localhost:8080";
