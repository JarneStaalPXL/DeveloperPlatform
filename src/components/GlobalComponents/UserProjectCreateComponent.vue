<template>
  <n-modal
    v-model:show="$store.state.showFeedbackPopup"
    preset="card"
    title="Feedback"
    class="feedbackModal"
  >
    <template #header>
      <div>Create Project</div>
    </template>

    <section>
      <n-space vertical class="d-flex">
        <n-input placeholder="Project Title" v-model:value="project.title" />
        <n-input
          placeholder="Project Description"
          v-model:value="project.description"
        />
        <n-input placeholder="Project Image" v-model:value="project.image" />
        <n-input
          placeholder="Project Website Link"
          v-model:value="project.websiteLink"
        />
        <n-input
          placeholder="GitHub Repository"
          v-model:value="project.github"
        />
      </n-space>
    </section>

    <template #action>
      <n-button class="w-100" @click="createProject()">Create project</n-button>
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
  NSpace,
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
    NSpace,
  },
  data() {
    return {
      project: {
        title: "",
        description: "",
        image: "",
        websiteLink: "",
        github: "",
        technologies: [],
      },
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
        this.formValue.user.userName =
          localStorage.getItem("userName") || "Unknown Username";
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
    createProject() {
      //check if project.websiteLink is a valid website link
      if (!this.project.websiteLink.includes("http")) {
        window.$message.error(
          "Please enter a valid website link. Make sure it contains http/https"
        );
        return;
      }

      //check if project.github is a valid github link
      if (!this.project.github.includes("github.com")) {
        window.$message.error("Please enter a valid GitHub Repository link");
        return;
      }

      this.$store.dispatch("USER_CREATE_PROJECT", this.project);
      this.$store.dispatch("GET_USER_PROJECTS");
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
