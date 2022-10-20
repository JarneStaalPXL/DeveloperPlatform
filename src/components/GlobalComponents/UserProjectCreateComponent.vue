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
        <n-dynamic-input v-model:value="extraInformation" :on-create="onCreate" :min="0" :max="8">
          <template #create-button-default> Add more data </template>
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input
                placeholder="Property"
                v-model:value="value.propName"
                style="margin-right: 12px; width: 160px"
              />
              <n-input
                placeholder="Value"
                v-model:value="value.propValue"
                type="text"
              />
            </div>
          </template>
        </n-dynamic-input>
        <pre>{{project}}</pre>
        <pre>{{extraInformation}}</pre>
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
  NDynamicInput,
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
    NDynamicInput,
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
    createProject() {
      //check if project.websiteLink is a valid website link
      if(this.project.websiteLink !== ""){
        if (!this.project.websiteLink.includes("http")) {
        window.$message.error(
          "Please enter a valid website link. Make sure it contains http or https"
        );
        return;
      }
    }
  

      //check if project.github is a valid github link
      if (this.project.github !== "") {
        if (!this.project.github.includes("github.com")) {
          window.$message.error("Please enter a valid GitHub Repository link");
          return;
        }
      }

      let extraData = JSON.parse(JSON.stringify(this.extraInformation));

      let combinedData = {
        ...this.project, extraData
      };

      this.$store.dispatch("USER_CREATE_PROJECT", combinedData);
      this.$store.dispatch("GET_USER_PROJECTS");
      this.$store.commit("setShowUserProjectCreateModal", false);
      window.$message.success("Project created successfully");
    },
  },
  setup() {
    return {
      extraInformation: ref([
        {
          propName: undefined,
          propValue: undefined,
        },
      ]),
      onCreate() {
        return {
          
        };
      },
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
