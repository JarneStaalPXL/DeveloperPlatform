<template>
  <n-config-provider :theme="null">
    <n-space vertical>
      <section>
        <ActivityLog />
        <n-card title="Unique Visitors">
          <UniqueUserLog />
        </n-card>
      </section>
      <section>
        <AdminManager />
      </section>
    </n-space>
  </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider, NSpace, NCard } from "naive-ui";
import ActivityLog from "@/components/AdminViewComponents/ActivityLog.vue";
import AdminManager from "@/components/AdminViewComponents/AdminManager.vue";
import UniqueUserLog from "@/components/AdminViewComponents/UniqueUserLog.vue";
export default {
  components: {
    ActivityLog,
    NConfigProvider,
    AdminManager,
    NSpace,
    NCard,
    UniqueUserLog,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style></style>
