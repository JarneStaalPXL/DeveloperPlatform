<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Your favorites</h4>
        <n-badge :value="$store.state.favoritetools.length" color="grey" />
      </div>
    </template>
    <FavoriteList />
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";
import FavoriteList from "@/components/HomeViewComponents/Favorites/FavoriteList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    NCard,
    NBadge,
    FavoriteList,
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
