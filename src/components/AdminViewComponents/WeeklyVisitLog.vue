<template>
    <n-card title="Weekly Visits">
        <Chart
    :size="{ width: 800, height: 420 }"
    :data="weekscounts"
    :margin="margin"
    :direction="direction"
    :axis="axis"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Area
        :dataKeys="['name', 'visits']"
        type="monotone"
        :areaStyle="{ fill: 'url(#grad)' }"
      />
      <Line
        :dataKeys="['name', 'visits']"
        type="monotone"
        :lineStyle="{
          stroke: '#9f7aea',
        }"
      />
      <Marker
        :value="1000"
        label="Mean."
        color="green"
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
    </n-card>

</template>

<script>
    import {ref} from 'vue'
import { Chart, Grid, Line, Marker, Area, Tooltip } from "vue3-charts";
import { NCard } from "naive-ui";
export default {
  components: {
    NCard,
    Chart,
    Grid,
    Line,
    Marker, Area, Tooltip, 
  },
  data() {
    return {
      weekscounts: [],
    };
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
  async beforeMount() {
    let data = [];
    this.weekscounts = await this.$store.dispatch("GET_4_WEEK_VISIT_COUNT");
    data.push(
      {
        name: "First Week",
        visits: this.weekscounts.firstWeekOfMonth,
      },
      {
        name: "Second Week",
        visits: this.weekscounts.secondWeekOfMonth,
      },
      {
        name: "Third Week",
        visits: this.weekscounts.thirdWeekOfMonth,
      },
      {
        name: "Fourth Week",
        visits: this.weekscounts.fourthWeekOfMonth,
      }
    );
    this.weekscounts = data;
  },
};
</script>

<style></style>
