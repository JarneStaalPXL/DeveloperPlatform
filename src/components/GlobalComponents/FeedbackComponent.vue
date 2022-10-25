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
        <n-form-item label="Select type" class="w-100">
          <n-select
            v-model:value="formValue.user.type"
            placeholder="Select type"
            :options="[
              {
                label: 'Feature Request',
                value: 'FeatureRequest',
              },
              {
                label: 'Bug Report',
                value: 'BugReport',
              },
              {
                label: 'Other',
                value: 'Other',
              },
            ]"
          ></n-select>
        </n-form-item>
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
      <n-button @click="submitFeedback(formValue.user)" class="w-100">Submit</n-button>
    </template>
  </n-modal>
</template>

<script>
import { ref } from "vue";
import {
  NForm,
  NFormItem,
  NCard,
  NButton,
  NInput,
  NModal,
  useMessage,
  NSelect,
} from "naive-ui";
export default {
  name: "FeedbackComponent",
  components: {
    NForm,
    NFormItem,
    NCard,
    NButton,
    NInput,
    NModal,
    NSelect,
  },
  data() {
    return {
      formValue: ref({
        user: {
          title: "",
          description: "",
          type: undefined,
        },
      }),
      rules: {
        user: {
          title: {
            required: true,
            message: "Please input a title",
            trigger: ["select", "blur"],
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
    async submitFeedback(user) {
      console.log(user);
      user = JSON.parse(JSON.stringify(user));

      console.log(user);
      switch (user.type) {
        case "FeatureRequest":
          user.type = "Feature Request";
          break;
        case "BugReport":
          user.type = "Bug Report";
          break;
        case "Other":
          user.type = "Other";
          break;
      }

      if (user.title && user.description) {
        user.userName = localStorage.getItem("userName") || "Unknown Username";

        console.log("Object that strapi receives", JSON.parse(JSON.stringify(user)));
        let resp = await this.$store.dispatch(
          "SUBMIT_FEEDBACK",
          JSON.parse(JSON.stringify(user))
        );
        if (resp.data.attributes.title !== "") {
          window.$message.success("Feedback submitted successfully");
          this.$store.commit("setShowFeedbackModal", false);
          this.formValue.user.title = "";
          this.formValue.user.description = "";
          this.formValue.user.type = undefined;
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
