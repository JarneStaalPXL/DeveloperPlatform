<template>
   <n-card class="categoryCard">
    <template #header>
      <div class="d-flex" style="gap: 10px">
        <h4>Projects</h4>
        <n-badge v-if="$store.state.userProjects" :value="$store.state.userProjects.length" color="grey" />
      </div>
    </template>
    <template #header-extra>
      <n-button :tertiary="$store.state.colorMode === 'Dark' ? 'tertiary': ''" :type="$store.state.colorMode === 'Dark' ? 'primary':''" @click="$store.commit('setShowUserProjectCreateModal', true)"

          >Create a project</n-button
        >
    </template>
    <UserProjectsFull v-if="$store.state.userProjects.length > 0"/>
      <div v-else>
        <img id="noProjectsSvg" src="../assets/noProjects.svg"/>
        <p>You currently do not have any projects.</p>
      </div>
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

<style lang="scss" scoped>
#noProjectsSvg {
  max-width: 30%;
    margin-top: 20px;
    margin-bottom: 50px;
}

.n-card.n-card--bordered.categoryCard {
    height: 100%;
}
</style>