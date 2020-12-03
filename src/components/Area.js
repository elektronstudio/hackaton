import {
  ref,
  provide,
  inject,
  computed,
  watch,
} from "https://elektronstudio.github.io/live/src/deps/vue.js";

const Draggable = {
  props: ["x", "y"],
  setup(props, { emit }) {
    const { mouseX, mouseY } = inject("mouse");

    const mousePressed = ref(false);

    const onMousepress = () => {
      mousePressed.value = !mousePressed.value;
    };

    watch([() => mouseX.value, () => mouseY.value], () => {
      if (mousePressed.value) {
        emit("drag", { dragX: mouseX.value, dragY: mouseY.value });
      }
    });

    const transform = computed(() => `translate(${0},${0})`);

    // document.addEventListener("keydown", (e) => {
    //   if (!e.repeat) console.log(`Key "${e.key}" pressed  [event: keydown]`);
    //   else console.log(`Key "${e.key}" repeating  [event: keydown]`);
    // });

    return { onMousepress, transform };
  },
  template: `
  <g 
    :transform="transform"
    @mousedown="onMousepress"
    @touchstart="onMousepress"
    @mouseup="onMousepress"
    @touchend="onMousepress"
  >
    <slot />
  </g>
  `,
};

export default {
  components: { Draggable },
  setup() {
    const width = 10;
    const height = 1000;
    const viewBox = `${width / -2} ${height / -2} ${width} ${height}`;

    const svgRef = ref(null);
    const groupRef = ref(null);

    const mouseX = ref(0);
    const mouseY = ref(0);

    const x = ref(0);
    const y = ref(0);

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

    const onDrag = ({ dragX, dragY }) => {
      x.value = dragX;
      y.value = dragY;
    };

    provide("mouse", { mouseX, mouseY });

    return {
      svgRef,
      groupRef,
      width,
      height,
      viewBox,
      onMousemove,
      mouseX,
      mouseY,
      onDrag,
      x,
      y,
    };
  },
  template: `
  <svg
    ref="svgRef"
    xmlns="http://www.w3.org/2000/svg"
    :awidth="width"
    :aheight="height"
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
      <Draggable @drag="onDrag">
        <circle :cx="x" :cy="y" r="30" />
      </Draggable>
    </g>
  </svg>
  <div style="position: fixed; top: 10px, left: 10px">
    {{ x }} / {{ y }}
  </div>
  `,
};
