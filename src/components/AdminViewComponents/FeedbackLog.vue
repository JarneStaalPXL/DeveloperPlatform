<template>
  <n-card title="Platform Feedback" v-if="allFeedback.length > 0">
    <n-card v-for="fb of allFeedback" :key="fb">
      <n-space vertical>
        <h5>{{ fb.type }}</h5>
        <h6>{{ fb.title }}</h6>
        <p>{{ fb.description }}</p>
        <p>
          From: <b>{{ fb.userName }}</b>
        </p>
      </n-space>
      <n-space justify="center" class="mt-3">
        <n-button @click="assignAsProcessed()">
          <template #icon>
            <n-icon>
              <CheckIcon />
            </n-icon>
          </template>
          Processed
        </n-button>
        <n-button @click="assignAsCancelled()">
          <template #icon>
            <n-icon>
              <CancelIcon />
            </n-icon>
          </template>
          Cancel
        </n-button>
      </n-space>
    </n-card>
  </n-card>
</template>

<script>
import { Check as CheckIcon } from "@vicons/tabler";
import { CancelOutlined as CancelIcon } from "@vicons/material";
import { NCard, NButton, NIcon, NSpace } from "naive-ui";
export default {
  components: {
    NCard,
    NButton,
    NIcon,
    CheckIcon,
    CancelIcon,
    NSpace,
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
  methods: {
    assignAsProcessed() {
      //TODO
    },
    assignAsCancelled() {
      //TODO
    },
  },
};
</script>

<style></style>
