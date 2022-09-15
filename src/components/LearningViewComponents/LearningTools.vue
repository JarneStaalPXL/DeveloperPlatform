<template>
  <section>
    <n-result status="warning" title="Under Construction" description="Come back later!">
      <template #footer>
        <n-button @click="$router.push('/')">Go back home</n-button>
      </template>
    </n-result>
  </section>
</template>

<script>
import { NResult, NButton } from "naive-ui";
export default {
  components: {
    NResult,
    NButton,
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 15%;
}
</style>
