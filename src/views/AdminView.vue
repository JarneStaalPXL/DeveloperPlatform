<template>
  <n-config-provider>
    <n-space vertical>
      <section>
        <ActivityLog />
        <n-card title="Unique Visitors">
          <UniqueUserLog />
        </n-card>
      </section>
      <section>
        <WeeklyVisitLog/>
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
import WeeklyVisitLog from "@/components/AdminViewComponents/WeeklyVisitLog.vue";
export default {
  components: {
    ActivityLog,
    NConfigProvider,
    AdminManager,
    NSpace,
    NCard,
    UniqueUserLog,
    WeeklyVisitLog
},
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style></style>
