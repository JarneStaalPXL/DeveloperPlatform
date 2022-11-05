<template>
  <div v-if="$store.state.processedFeedbacks.length > 0">
    <n-card v-for="fb of $store.state.processedFeedbacks" :key="fb">
      <n-space vertical>
        <h5>{{ fb.type }}</h5>
        <h6>{{ fb.title }}</h6>
        <p>{{ fb.description }}</p>
      </n-space>
    </n-card>
  </div>
  <div v-else>
    <h5>No processed feedbacks</h5>
  </div>
</template>

<script>
import { NCard, NSpace } from "naive-ui";
export default {
  components: {
    NCard,
    NSpace,
  },
  async beforeMount() {
    //get all processed feedback
    await this.$store.dispatch("GET_PROCESSED_FEEDBACKS");
  },
};
</script>

<style></style>
