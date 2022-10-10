<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Fonts</h4>
        <n-badge :value="$store.state.fonts.length" color="grey" />
      </div>
    </template>
    <FontsList />
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";
import FontsList from "@/components/FontsViewComponents/FontsList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    NCard,
    NBadge,
    FontsList,
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
