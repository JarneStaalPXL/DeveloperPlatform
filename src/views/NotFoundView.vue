<template>
  <section>
    <n-result
      size="huge"
      status="404"
      title="Page Not Found"
      description="You know life is always ridiculous."
    >
      <template #footer>
        <n-button @click="$router.push('/')">Go back home</n-button>
      </template>
    </n-result>
  </section>
</template>

<script>
import { NResult, NButton } from "naive-ui";
export default {
  name: "NotFoundView",
  components: {
    NResult,
    NButton,
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
