<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>APIS</h4>
        <n-badge :value="$store.state.apis.length" color="grey" />
      </div>
    </template>
    <ApiList />
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";
import ApiList from "../components/ApiViewComponents/ApiList.vue";
export default {
  name: "ApiView",
  components: {
    NCard,
    NBadge,
    ApiList,
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
