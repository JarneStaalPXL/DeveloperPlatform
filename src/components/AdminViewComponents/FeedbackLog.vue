<template>
  <n-card title="Platform Feedback" v-if="allFeedback.length > 0">
    <n-card v-for="fb of allFeedback" :key="fb">
      <h3>{{ fb.type }}</h3>
      <h5>{{ fb.title }}</h5>
      <h6>{{ fb.description }}</h6>
      <h6>{{ fb.userName }}</h6>
    </n-card>
  </n-card>
</template>

<script>
import { NCard } from "naive-ui";
export default {
  components: {
    NCard,
  },
  data() {
    return {
      allFeedback: [],
    };
  },
  async mounted() {
    //get all feedback
    this.allFeedback = await this.$store.dispatch("GET_ALL_FEEDBACK");
  },
};
</script>

<style></style>
