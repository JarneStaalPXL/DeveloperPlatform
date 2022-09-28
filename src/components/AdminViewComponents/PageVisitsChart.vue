<template>
  <Responsive class="w-full">
    <template #main="{ width }">
      <Chart
        direction="circular"
        :size="{ width, height: 400 }"
        :data="data"
        :margin="{
          left: Math.round((width - 360) / 2),
          top: 20,
          right: 0,
          bottom: 20,
        }"
        :config="{ controlHover: false }"
      >
        <template #layers>
          <Pie :dataKeys="dataKeys" :pie-style="{ innerRadius: 100, padAngle: 0.05 }" />
        </template>
        <template #widgets>
          <Tooltip
            :config="{
              name: {},
              avg: { hide: true },
              pl: { label: 'value' },
              inc: { hide: true },
            }"
            hideLine
          />
        </template>
      </Chart>
    </template>
  </Responsive>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Chart, Responsive, Pie, Tooltip } from "vue3-charts";
export default {
  components: { Chart, Responsive, Pie, Tooltip },
  props: {
    data: Array,
    dataKeys: Array,
  },
};
</script>

<style></style>
