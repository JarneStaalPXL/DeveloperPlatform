<template>
  <n-modal
    v-model:show="$store.state.showFeedbackPopup"
    preset="card"
    title="Feedback"
    class="feedbackModal"
    @update:show="revertToFirstStep()"
  >
    <template #header>
      <div>Create Project</div>
    </template>

    <section>
      <n-space vertical class="d-flex">
        <n-space vertical v-if="dynamicInputShow === false">
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
          <n-input placeholder="GitHub Repository" v-model:value="project.github" />
        </n-space>
        <div vertical v-if="dynamicInputShow === true">
          <p style="margin-bottom: 0px">Select the tools you used for your project</p>
          <n-select
            filterable
            v-model:value="project.usedTools"
            multiple
            :options="displayableToolOptions"
            placeholder="Select tools"
          ></n-select>

          <p style="margin-bottom: 0px">Pick the colors you used for your project</p>
          <n-dynamic-input
            v-model:value="usedColors"
            :on-create="onCreate"
            :min="0"
            :max="15"
          >
            <template #create-button-default> Add color </template>
            <template #default="{ value }">
              <div style="display: flex; align-items: center; width: 100%">
                <n-color-picker :modes="['hex']" v-model:value="value.usedColor" />
              </div>
            </template>
          </n-dynamic-input>
        </div>
        <div vertical v-if="dynamicInputShow === undefined">
          <!--TODO: Implement dynamic color pickers with n-dynamic-input -->

          <!---->
          <p style="margin-bottom: 0px">
            You can also add more properties with values to the project.
          </p>
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
                    filterable
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
          v-if="dynamicInputShow === false"
          @click="dynamicInputShow = true"
          >Next</n-button
        >
        <n-button
          class="w-100"
          v-if="dynamicInputShow === true"
          @click="dynamicInputShow = false"
          >Previous</n-button
        >
        <n-button
          class="w-100"
          v-if="dynamicInputShow === undefined"
          @click="dynamicInputShow = true"
          >Previous</n-button
        >
        <n-button
          class="w-100"
          v-if="dynamicInputShow === true"
          @click="dynamicInputShow = undefined"
          >Next</n-button
        >
        <n-button
          class="w-100"
          v-if="dynamicInputShow === undefined"
          @click="createProject(project)"
          >Create Project</n-button
        >
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
  NColorPicker,
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
    NColorPicker,
  },
  data() {
    return {
      dynamicInputShow: false,
      displayableToolOptions: [],
      project: {
        title: "",
        description: "",
        image: "",
        websiteLink: "",
        github: "",
        usedTools: [],
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
  async beforeMount() {
    this.displayableToolOptions = await this.$store.dispatch(
      "CONVERT_TO_NAIVEUI_DISPLAYABLE_OPTIONS",
      this.$store.state.allTools
    );
  },
  mounted() {
    window.$message = useMessage();
  },
  methods: {
    revertToFirstStep() {
      //Goes back to the first step of the modal
      this.dynamicInputShow = false;
    },
    async createProject(project) {
      this.$store.commit("setShowLoadingAnimation", true);
      let proj = project;
      //check if project.websiteLink is a valid website link
      if (proj.websiteLink !== "") {
        if (!proj.websiteLink.includes("http")) {
          window.$message.error(
            "Please enter a valid website link. Make sure it contains http or https"
          );
          return;
        }
      }

      //check if project.github is a valid github link
      if (proj.github !== "") {
        if (!proj.github.includes("github.com")) {
          window.$message.error("Please enter a valid GitHub Repository link");
          return;
        }
      }

      let detailedUsedTools = [];
      for (let tool of proj.usedTools) {
        //find tool in allTools
        let foundTool = await this.$store.dispatch("GET_FULL_TOOL", tool);
        if (foundTool) {
          detailedUsedTools.push(JSON.parse(JSON.stringify(foundTool)));
        }
      }

      proj.usedTools = JSON.parse(JSON.stringify(detailedUsedTools));

      let extraData = JSON.parse(JSON.stringify(this.extraInformation));
      let usedColors = JSON.parse(JSON.stringify(this.usedColors));

      //Remove duplicate colors
      usedColors = usedColors.filter(
        (color, index) =>
          usedColors.findIndex((c) => c.usedColor === color.usedColor) === index
      );

      let combinedData = {
        ...proj,
        usedColors,
        extraData,
      };

      await this.$store.dispatch("USER_CREATE_PROJECT", combinedData);
      await this.$store.dispatch("GET_USER_PROJECTS");
      this.$store.commit("setShowUserProjectCreateModal", false);
      this.$store.commit("setShowLoadingAnimation", false);
      window.$message.success("Project created successfully");

      //Rever this.project back to its original state
      let emptyProject = {
        title: "",
        description: "",
        image: "",
        websiteLink: "",
        github: "",
        usedTools: [],
        technologies: [],
      };
      this.project = emptyProject;

      this.usedColors = [
        {
          usedColor: "#000000FF",
        },
      ];

      this.extraInformation = [
        {
          propName: undefined,
          propValue: undefined,
        },
      ];
    },
  },
  setup() {
    return {
      usedColors: ref([
        {
          usedColor: "#000000FF",
        },
      ]),
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
