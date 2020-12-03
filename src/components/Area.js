export default {
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
      border: 1px solid blue;
      margin-bottom: 16px;
      position: fixed;
      top:0;
      left:0;
      height:100%;
      width:100%;
    "
  >
    <circle cx="0" cy="0" r="20" />

  </svg>
  `,
};
