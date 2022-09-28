<template>
  <Chart
    :size="{ width: getWidth(), height: 420 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Area :dataKeys="dataKeys" type="monotone" :areaStyle="{ fill: 'url(#grad)' }" />
      <Line
        :dataKeys="dataKeys"
        type="monotone"
        :lineStyle="{
          stroke: '#9f7aea',
        }"
      />
      <Marker
        :value="1000"
        label="Good engagement"
        color="white"
        :strokeWidth="2"
        strokeDasharray="6 6"
      />
      <Marker
        :value="2000"
        label="Awesome engagement"
        color="white"
        :strokeWidth="2"
        strokeDasharray="6 6"
      />
      <defs>
        <linearGradient id="grad" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          pl: { color: '#9f7aea' },
          avg: { hide: true },
          inc: { hide: true },
        }"
      />
    </template>
  </Chart>
</template>

<script>
import { ref } from "vue";
import { Chart, Grid, Line, Marker, Area, Tooltip } from "vue3-charts";
import { NCard } from "naive-ui";
export default {
  props: {
    data: Array,
    dataKeys: Array,
  },
  components: {
    NCard,
    Chart,
    Grid,
    Line,
    Marker,
    Area,
    Tooltip,
  },
  data() {
    return {
      weekscounts: [],
    };
  },
  methods: {
    //get width of screen minus 20 percent
    getWidth() {
      return window.innerWidth * 0.9;
    },
  },
  setup() {
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    });

    return { direction, margin, axis };
  },
};
</script>

<style>
.n-card.n-card--bordered {
  text-align: left;
}
</style>
