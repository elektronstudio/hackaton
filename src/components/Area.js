import { ref } from "https://elektronstudio.github.io/live/src/deps/vue.js";

/*
const Draggable = {
  setup() {
    const mousePressed = ref(false)
    const onMousePress = () => mousePressed.value = !mousePressed.value
  },
  template: `
  <g 
    @mousemove="onMousemove"
    @touchmove="onMousemove"
    @mousedown="mousePressed = true"
    @touchstart="mousePressed = true"
    @mouseup="mousePressed = false"
    @touchend="mousePressed = false"
  >`
}
*/

export default {
  setup() {
    const width = 1000;
    const height = 1000;
    const viewBox = `${width / -2} ${height / -2} ${width} ${height}`;

    const svgRef = ref(null);
    const groupRef = ref(null);

    const mouseX = ref(null);
    const mouseY = ref(null);

    const onMousemove = (e) => {
      let point = svgRef.value.createSVGPoint();
      point.x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      point.y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      let ctm = groupRef.value.getScreenCTM();
      if ((ctm = ctm.inverse())) {
        point = point.matrixTransform(ctm);
      }
      mouseX.value = point.x;
      mouseY.value = point.y;
    };

    return {
      svgRef,
      groupRef,
      width,
      height,
      viewBox,
      onMousemove,
      mouseX,
      mouseY,
    };
  },
  template: `
  <svg
    ref="svgRef"
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
    @mousemove="onMousemove"
    @touchmove="onMousemove"
  >
    <g ref="groupRef">
      <circle cx="0" cy="0" r="20" />
    </g>
  </svg>
  <div style="position: fixed; top: 10px, left: 10px">
    {{ mouseX }} / {{ mouseY}}
  </div>
  `,
};
