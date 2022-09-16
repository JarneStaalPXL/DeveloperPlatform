<template>
  <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Learning Tools</h4>
        <n-badge :value="$store.state.learningTools.length" color="grey" />
      </div>
    </template>

    <LearningTools />
  </n-card>
</template>

<script>
import { NCard, NBadge } from "naive-ui";
import LearningTools from "@/components/LearningViewComponents/LearningTools.vue";
export default { components: { LearningTools, NCard, NBadge } };
</script>

<style></style>
