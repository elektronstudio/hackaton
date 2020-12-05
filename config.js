export const channel = "hackaton";

export const channels = [channel, "hackaton_kristjan", "hackaton_hendrik"];

export const channelSources = [
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  ...channels.map(
    (c) => `https://elektron-live.babahhcdn.com/bb1150-le/${c}/index.m3u8`
  ),
];
