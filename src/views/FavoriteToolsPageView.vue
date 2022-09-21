<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Your favorites</h4>
        <n-badge
          v-if="
            $store.state.favoritetools !== null &&
            $store.state.favoritetools !== undefined
          "
          :value="$store.state.favoritetools.length"
          color="grey"
        />
      </div>
    </template>
    <FavoriteList />
    <template #header-extra v-if="$store.state.favoritetools.length > 0">
      <n-switch
        :rail-style="railStyle"
        @update:value="handleChange"
        v-model:value="$store.state.favoritesCategorizedChecked"
      >
        <template #checked> Categorized </template>
        <template #unchecked> Uncategorized </template>
      </n-switch>
    </template>
  </n-card>
</template>

<script>
import { NCard, NBadge, NSwitch } from "naive-ui";
import FavoriteList from "@/components/HomeViewComponents/Favorites/FavoriteList.vue";
export default {
  name: "GlobalFrontendToolsPageView",
  components: {
    NCard,
    NBadge,
    FavoriteList,
    NSwitch,
  },
  data() {
    return {
      railStyle: ({ focused, checked }) => {
        const style = {};
        if (checked) {
          style.background = "rgb(35 161 153)";
          if (focused) {
            style.boxShadow = "0 0 0 2px rgb(35 161 153)";
          }
        } else {
          style.background = "gray";
          if (focused) {
            style.boxShadow = "0 0 0 2px #2080f040";
          }
        }
        return style;
      },
    };
  },
  async mounted() {
    this.$store.dispatch("GET_FAVORITES_CATEGORIZED");
  },
  created() {},
  methods: {
    handleChange(value) {
      this.$store.dispatch("SET_FAVORITES_CATEGORIZED", value);
    },
  },
};
</script>

<style></style>
