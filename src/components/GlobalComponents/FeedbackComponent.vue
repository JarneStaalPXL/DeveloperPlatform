<template>
  <n-modal
    v-model:show="$store.state.showFeedbackPopup"
    preset="card"
    title="Feedback"
    class="feedbackModal"
  >
    <template #header>
      <div>Feedback</div>
    </template>
    <div>
      <n-form
        class="d-flex flex-column w-100"
        ref="formRef"
        inline
        :model="formValue"
        :rules="rules"
        size="medium"
      >
        <n-form-item label="Title" path="user.title" class="w-100">
          <n-input v-model:value="formValue.user.title" placeholder="Input Title" />
        </n-form-item>
        <n-form-item label="Description" path="user.description" class="w-100">
          <n-input
            type="textarea"
            v-model:value="formValue.user.description"
            placeholder="Input Description"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-button @click="submitFeedback()" class="w-100">Submit</n-button>
    </template>
  </n-modal>
</template>

<script>
import { ref } from "vue";
import { NForm, NFormItem, NCard, NButton, NInput, NModal, useMessage } from "naive-ui";
export default {
  name: "FeedbackComponent",
  components: {
    NForm,
    NFormItem,
    NCard,
    NButton,
    NInput,
    NModal,
  },
  data() {
    return {
      formValue: ref({
        user: {
          title: "",
          description: "",
        },
      }),
      rules: {
        user: {
          title: {
            required: true,
            message: "Please input a title",
            trigger: "blur",
          },
          description: {
            required: true,
            message: "Please input a description",
            trigger: ["input", "blur"],
          },
        },
      },
    };
  },
  mounted() {
    window.$message = useMessage();
  },
  methods: {
    async submitFeedback() {
      if (this.formValue.user.title && this.formValue.user.description) {
        let resp = await this.$store.dispatch(
          "SUBMIT_FEEDBACK",
          JSON.parse(JSON.stringify(this.formValue.user))
        );
        if (resp.data.attributes.title !== "") {
          window.$message.success("Feedback submitted successfully");
          this.$store.commit("setShowFeedbackModal", false);
          this.formValue.user.title = "";
          this.formValue.user.description = "";
        }
      } else {
        window.$message.error("Please fill all the fields");
      }
    },
  },
  setup() {
    const formRef = ref(null);
    return {
      formRef,
    };
  },
};
</script>

<style lang="scss">
.feedbackModal {
  width: 650px;
}

@media only screen and (max-width: 650px) {
  .feedbackModal {
    width: 85%;
  }
}
</style>
