<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Processed Feedback</h4>
      </div>
    </template>
    <ProcessedFeedbackList />
  </n-card>
</template>

<script>
import ProcessedFeedbackList from "@/components/ProcessedFeedbackComponents/ProcessedFeedbackList.vue";
import { NCard, NBadge } from "naive-ui";
export default {
  name: "FontsView",
  components: {
    NCard,
    NBadge,
    ProcessedFeedbackList,
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
