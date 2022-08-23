<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Gradient Generators</h4>
        <n-badge :value="2" color="grey" />
      </div>
    </template>
    <GradientGeneratorsList />
  </n-card>
</template>

<script>
import GlobalFrontendToolsList from "@/components/HomeViewComponents/GlobalFrontendTools/GlobalFrontendToolsList.vue";
import { NCard, NBadge } from "naive-ui";
import GradientGeneratorsList from "@/components/HomeViewComponents/GradientGenerators/GradientGeneratorsList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    GlobalFrontendToolsList,
    NCard,
    NBadge,
    GradientGeneratorsList,
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
