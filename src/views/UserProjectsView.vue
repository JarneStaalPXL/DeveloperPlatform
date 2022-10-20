<template>
   <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Projects</h4>
        <n-badge :value="$store.state.userProjects.length" color="grey" />
      </div>
    </template>
    <template #header-extra>
      <n-button @click="$store.commit('setShowUserProjectCreateModal', true)"
          >Create a project</n-button
        >
    </template>
    <UserProjectsFull/>
  </n-card>
</template>

<script>
import {
  NCard,NBadge, NButton
} from "naive-ui";
import UserProjectsFull from "@/components/UserProjectsViewComponents/UserProjectsFull.vue";
export default {
  mounted() {
    this.$store.dispatch("GET_USER_PROJECTS");
  },
  data() {
    return {};
  },
  components: {
    NCard,
    NBadge,
    UserProjectsFull,
    NButton
  },  
};
</script>
