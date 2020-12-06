import { useUser } from "../deps/live.js";

export default {
  props: ["user"],
  setup() {
    const { userId } = useUser();
    return { userId };
  },
  template: `
  <defs>
    <clipPath :id="'user' + i">
      <circle :cx="user.userX" :cy="user.userY" :r="50" />
    </clipPath>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
    </filter>
  </defs>
  <circle
    :cx="user.userX"
    :cy="user.userY"
    :r="50"
    :fill="user.userId === userId ? 'var(--orange)' : 'white'"
    :opacity="user.image ? 1 : 0.5"
  />
  <image
    v-if="user.image"
    :href="user.image"
    width="100"
    height="100"
    :x="user.userX ? user.userX - 50 : -50"
    :y="user.userY ? user.userY - 50 : -50"
    :clip-path="'url(#user' + i + ')'"
  />
  <!--text
    v-if="user.userId === userId"
    filter="url(#blur)"
    text-anchor="middle"
    alignment-baseline="central"
    :x="user.userX"
    :y="user.userY ? user.userY - 75 : -75"
    fill="black"
    style="pointer-events: none; font-weight: bold; font-size: 20px;"
  >{{ user.userName }}</text-->
  <text
    text-anchor="middle"
    alignment-baseline="central"
    :x="user.userX"
    :y="user.userY ? user.userY - 75 : -75"
    :fill="user.userId === userId ? 'var(--orange)' : 'white'"
    style="pointer-events: none; font-size: 20px; font-family;"
  >{{ user.userName }}</text>
  <circle
    v-if="user.userId === userId"
    :cx="user.userX"
    :cy="user.userY"
    r="50"
    fill="none"
    stroke="rgba(255,127,80,1)"
    stroke-width="3"
  />
  `,
};
