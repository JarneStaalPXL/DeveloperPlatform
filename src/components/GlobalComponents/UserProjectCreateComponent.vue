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
        <n-space vertical v-if="!dynamicInputShow">
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
        <div vertical v-if="dynamicInputShow">
          <p style="    margin-bottom: 0px;">You can now add more properties with values to the project.</p>
          <p>If it's not in the list, just type it and press enter.</p>
          <n-space vertical>
            <n-dynamic-input
              v-model:value="extraInformation"
              :on-create="onCreate"
              :min="0"
              :max="8"
            >
              <template #create-button-default> Add more data </template>
              <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                  <n-select
                    placeholder="Property"
                    style="margin-right: 12px; width: 200px"
                    v-model:value="value.propName"
                    filterable
                    tag
                    :options="[
                      {
                        label: 'Fonts',
                        value: 'Fonts',
                      },
                      {
                        label: 'Colors',
                        value: 'Colors',
                      },
                      {
                        label: 'Frameworks',
                        value: 'Frameworks',
                      },
                      {
                        label: 'Languages',
                        value: 'Languages',
                      },
                    ]"
                  />
                  <n-select
                  :show-arrow="false"
                  multiple
                  tag
                    placeholder="Values"
                    v-model:value="value.propValue"
                    type="text"
                  />
                </div>
              </template>
            </n-dynamic-input>
          </n-space>
        </div>

        <!-- <pre>{{project}}</pre>
        <pre>{{extraInformation}}</pre> -->
      </n-space>
    </section>

    <template #action>
      <n-space vertical>
        <n-button
        class="w-100"
        v-if="dynamicInputShow === true"
        @click="dynamicInputShow = false"
        >Previous</n-button
      >
      <n-button
        class="w-100"
        v-if="dynamicInputShow === false"
        @click="dynamicInputShow = true"
        >Next</n-button
      >
      <n-button
        class="w-100"
        v-if="dynamicInputShow === true"
        @click="createProject()"
        >Create Project</n-button>
      </n-space>
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
    NSpace,
    NDynamicInput,
    NSelect,
  },
  data() {
    return {
      dynamicInputShow: false,
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
      if (this.project.websiteLink !== "") {
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
        ...this.project,
        extraData,
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
      exampleAdd: ref([
        {
          propName: "Fonts",
          propValue: "Poppins, Roboto",
        },
      ]),
      onCreate() {
        return {};
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
