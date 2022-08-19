<template>
  <n-config-provider :theme="darkTheme">
    <n-space vertical>
      <section>
        <ActivityLog />
      </section>
      <section>
        <AdminManager />
      </section>
    </n-space>
  </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider, NSpace } from "naive-ui";
import ActivityLog from "@/components/AdminViewComponents/ActivityLog.vue";
import AdminManager from "@/components/AdminViewComponents/AdminManager.vue";
export default {
  components: { ActivityLog, NConfigProvider, AdminManager, NSpace },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style></style>
