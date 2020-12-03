import { createApp } from "https://elektronstudio.github.io/live/src/deps/vue.js";

import { useUser } from "https://elektronstudio.github.io/live/src/lib/index.js";

// const channel = "hackaton";

const Area = {
  setup() {
    const width = 400;
    const height = 400;
    const viewBox = `${width / -2} ${height / -2} ${width} ${height}`;

    return { width, height, viewBox };
  },
  template: `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :view-box.camel="viewBox"
    style="
      display: block;
      border: 1px solid red;
      margin-bottom: 16px;
    "
  >
    <circle cx="0" cy="0" r="20" />

  </svg>
  `,
};

const App = {
  components: { Area },
  setup() {
    return {
      ...useUser(),
    };
  },
  template: `
  <Area />
  <h2>User</h2>
  Your username: {{ userName }}
  <button @click="onUserNameChange">Change</button>
  `,
};

createApp(App).mount("#app");
