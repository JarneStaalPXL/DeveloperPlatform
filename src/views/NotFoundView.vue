<template>
  <section>
    <n-result
      size="huge"
      status="404"
      :title="routepath + ' escaped from the codebase'"
      description="You can go back to the home page or open an issue on Github"
    >
      <template #default>
        <n-space :style="{ justifyContent: 'center' }">
          <n-button id="openIssue" @click="openIssue()"> Open an issue</n-button>
          <n-button @click="$router.push('/')">Go back home</n-button>
        </n-space>
      </template>
    </n-result>
  </section>
</template>

<script>
import { NResult, NButton, NSpace } from "naive-ui";
export default {
  name: "NotFoundView",
  components: {
    NResult,
    NButton,
    NSpace,
  },
  data() {
    return {
      routepath: undefined,
    };
  },
  beforeMount() {
    let path = this.$route.path.split("/")[1];
    this.routepath = path.charAt(0).toUpperCase() + path.slice(1, path.length);
  },
  methods: {
    openIssue() {
      window.open(
        "https://github.com/DeveloperJarne/DeveloperPlatform/issues/new" +
          "?title=" +
          this.routepath +
          " page not found" +
          "&body= " +
          this.routepath +
          " cannot be found on Developer Platform." +
          "&labels=bug",
        "_blank"
      );
    },
  },
  mounted() {
    document.addEventListener("contextmenu", (e) => {});
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section {
  //center in the middle of the screen
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
