<template>
  <section>
    <n-result size="huge" status="403" title="Access Denied" :description="message">
      <template #default>
        <n-space :style="{ justifyContent: 'center' }">
          <n-button @click="$router.push('/')">Go back home</n-button>
        </n-space>
      </template>
    </n-result>
  </section>
</template>

<script>
import { NResult, NButton, NSpace } from "naive-ui";
export default {
  name: "AccessDeniedView",
  name: "NotFoundView",
  components: {
    NResult,
    NButton,
    NSpace,
  },
  data() {
    return {
      message: this.$route.params.message,
    };
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
