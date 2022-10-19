<template>
  <n-space vertical class="d-flex">
    <n-input placeholder="Project Title" v-model:value="project.title" />
    <n-input placeholder="Project Description" v-model:value="project.description" />
    <n-input placeholder="Project Image" v-model:value="project.image" />
    <n-input placeholder="Project Website Link" v-model:value="project.websiteLink" />
    <n-input placeholder="GitHub Repository" v-model:value="project.github" />
    <n-button class="w-100" @click="createProject()">Create project</n-button>
  </n-space>
</template>

<script>
import { NButton, NInput, NSpace } from "naive-ui";
export default {
  components: {
    NButton,
    NInput,
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
    };
  },
  methods: {
    createProject() {
      this.$store.dispatch("USER_CREATE_PROJECT", this.project);
    },
  },
};
</script>

<style lang="scss" scoped></style>
