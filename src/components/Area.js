import {
  ref,
  provide,
  inject,
  computed,
  watch,
} from "https://elektronstudio.github.io/live/src/deps/vue.js";

//import { useChannel } from "https://elektronstudio.github.io/foyer2/src/lib/index.js";
import {
  socket,
  createMessage,
} from "https://elektronstudio.github.io/live/src/lib/index.js";

import { useChannel } from "../lib/channel.js";

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

    const transform = computed(() => `translate(${props.x},${props.y})`);

    const keyOffset = 3;

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        emit("drag", { dragX: props.x - keyOffset, dragY: props.y });
      }
      if (e.key === "ArrowRight") {
        emit("drag", { dragX: props.x + keyOffset, dragY: props.y });
      }
      if (e.key === "ArrowUp") {
        emit("drag", { dragX: props.x, dragY: props.y - keyOffset });
      }
      if (e.key === "ArrowDown") {
        emit("drag", { dragX: props.x, dragY: props.y + keyOffset });
      }
    });

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

const channel = "hackaton";

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

      const outgoingMessage = createMessage({
        type: "CHANNEL_USER_UPDATE",
        channel,
        value: {
          userX: x.value,
          userY: y.value,
        },
      });
      socket.send(outgoingMessage);
    };

    provide("mouse", { mouseX, mouseY });

    const { users } = useChannel("hackaton");

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
      users,
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
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    "
    @mousemove="onMousemove"
    @touchmove="onMousemove"
  >
    <g ref="groupRef">
      <g v-for="user in users">
        <text :x="user.userX" :y="user.userY" fill="red">{{ user }}</text>
      </g>
      <Draggable :x="x" :y="y" @drag="onDrag">
        <circle r="30" />
      </Draggable>
    </g>
  </svg>
  <div style="position: fixed; top: 10px; left: 10px">
    {{ x }} / {{ y }}
  </div>
  <div style="position: fixed; top: 10px; right: 10px; width: 200px; background: gray;">
    {{ users }}
  </div>
  `,
};
