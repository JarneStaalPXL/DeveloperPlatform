<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Hosting Providers</h4>
        <n-badge :value="$store.state.hostingproviders.length" color="grey" />
      </div>
    </template>
    <HostingProvidersList />
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";
import HostingProvidersList from "@/components/HomeViewComponents/HostingProviders/HostingProvidersList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    NCard,
    NBadge,
    HostingProvidersList,
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
