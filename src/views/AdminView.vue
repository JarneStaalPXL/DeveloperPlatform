<template>
  <n-config-provider :theme="darkTheme">
    <section>
      <ActivityLog />
    </section>
  </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider } from "naive-ui";
import ActivityLog from "@/components/AdminViewComponents/ActivityLog.vue";
export default {
  components: { ActivityLog, NConfigProvider },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style></style>
