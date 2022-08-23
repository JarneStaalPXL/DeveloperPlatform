<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Color Generators</h4>
        <n-badge :value="2" color="grey" />
      </div>
    </template>
    <ColorGeneratorsList />
  </n-card>
</template>

<script>
import GlobalFrontendToolsList from "@/components/HomeViewComponents/GlobalFrontendTools/GlobalFrontendToolsList.vue";
import { NCard, NBadge } from "naive-ui";
import ColorGeneratorsList from "@/components/HomeViewComponents/ColorGenerators/ColorGeneratorsList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    GlobalFrontendToolsList,
    NCard,
    NBadge,
    ColorGeneratorsList,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style></style>
