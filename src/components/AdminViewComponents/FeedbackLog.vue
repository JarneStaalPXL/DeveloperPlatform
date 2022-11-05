<template>
  <n-modal :show="processedModal">
    <n-card
      style="width: 600px"
      :title="handledFeedback.type"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #action>
        <n-space vertical>
          <n-input v-model:value="handledFeedback.title" />
          <n-input v-model:value="handledFeedback.description" />
          <p>
            From: <b>{{ handledFeedback.userName }}</b>
          </p>
          <n-button @click="addToProcessed(handledFeedback)"
            >Finish as processed</n-button
          >
        </n-space>
      </template>
    </n-card>
  </n-modal>
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
        <n-button @click="openFBHandleModal(fb)">
          <template #icon>
            <n-icon>
              <CheckIcon />
            </n-icon>
          </template>
          Processed
        </n-button>
        <n-button @click="removeFeedback(fb)">
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
import { NCard, NButton, NIcon, NSpace, NModal, NInput } from "naive-ui";
export default {
  components: {
    NCard,
    NButton,
    NIcon,
    CheckIcon,
    CancelIcon,
    NSpace,
    NModal,
    NInput,
  },
  data() {
    return {
      handledFeedback: [],
      selectedFeedback: null,
      processedModal: false,
      allFeedback: [],
    };
  },
  async beforeMount() {
    //get all feedback
    this.allFeedback = await this.$store.dispatch("GET_ALL_FEEDBACK");
  },
  methods: {
    openFBHandleModal(fb) {
      //create a copy of the fb
      this.handledFeedback = { ...fb };
      this.processedModal = true;
    },
    async addToProcessed(handledFeedback) {
      window.$loadingbar.start();
      await this.$store.dispatch("ADD_TO_PROCESSED_FEEDBACK", handledFeedback);
      this.processedModal = false;
      window.$loadingbar.finish();
    },
    removeFeedback() {
      //TODO
    },
  },
};
</script>

<style></style>
