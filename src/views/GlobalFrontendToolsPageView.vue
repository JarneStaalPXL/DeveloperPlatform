<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Global Frontend Tools</h4>
        <n-badge :value="$store.state.globalFrontendTools.length" color="grey" />
      </div>
    </template>

    <GlobalFrontendToolsList />
  </n-card>
</template>

<script>
import GlobalFrontendToolsList from "@/components/HomeViewComponents/GlobalFrontendTools/GlobalFrontendToolsList.vue";
import { NCard, NBadge } from "naive-ui";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    GlobalFrontendToolsList,
    NCard,
    NBadge,
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
