<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>File Converters</h4>
        <n-badge :value="0" color="grey" />
      </div>
    </template> 
    
    <!--TODO: Provide converter component-->
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";

export default {
  name: "FileConvertersView",
  components: {
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
