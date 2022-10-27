<template>
  <section>
    <UserProjectDetailModel :show="$store.state.showUserProjectDetailModal === true" />
    <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4">
      <n-gi v-for="project of $store.state.userProjects" :key="project">
        <n-card :title="project.title" bordered closable @close="removeProject(project)">
          <section class="toolContent">
            <div class="descriptionContainer" v-if="project.description">
              <p>{{ project.description }}</p>
            </div>
          </section>
          <template #cover>
            <div
              class="cover"
              :style="{
                background:
                  'url(' +
                  (project.image ? project.image : websitePreviewImagePlaceholder) +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }"
            ></div>
          </template>
          <template #footer>
            <div class="titleButtons">
              <div class="actionBtns">
                <n-button
                  v-if="project.websiteLink"
                  @click="openLink(project.websiteLink)"
                  >Open website</n-button
                >
                <n-button v-if="project.github" @click="openLink(project.github)"
                  >Open Github</n-button
                >
                <n-button @click="openDetailModel(project)">Open details</n-button>
              </div>
            </div>
          </template>
        </n-card>
      </n-gi>
    </n-grid>
  </section>
</template>

<script>
import {
  NButton,
  useLoadingBar,
  useMessage,
  NSpin,
  NIcon,
  NTag,
  NCard,
  NGi,
  NGrid,
  NConfigProvider,
  darkTheme,
} from "naive-ui";
import UserProjectDetailModel from "@/components/UserProjectsViewComponents/UserProjectDetailModal.vue";
export default {
  mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    this.$store.dispatch("GET_USER_PROJECTS");
  },
  data() {
    return {
      websitePreviewImagePlaceholder: require("../../assets/noImageProject.jpg"),
    };
  },
  components: {
    NButton,
    NSpin,
    NIcon,
    NTag,
    NCard,
    NGi,
    NGrid,
    NConfigProvider,
    UserProjectDetailModel,
  },
  methods: {
    openDetailModel(project) {
      this.$store.commit("setSelectedDetailedProject", project);
      this.$store.commit("setShowUserProjectDetailModal", true);
    },
    openLink(link) {
      window.open(link, "_blank");
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    removeProject(project) {
      this.$store.commit("setShowLoadingAnimation", true);
      this.$store.dispatch("REMOVE_USER_PROJECT", project).then(() => {
        this.$store.dispatch("GET_USER_PROJECTS").then(() => {
          this.$store.commit("setShowLoadingAnimation", false);
          window.$message.success("Project removed successfully");
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fullContainer {
  max-width: inherit !important;
}
.actionBtns {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.n-card {
  max-width: 600px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;
  border-radius: 8px;
}

.n-card-cover > * {
  border-radius: 8px 8px 0 0;
}

.cover {
  height: 300px;
  background-size: cover;
  background-position: center;
  background-color: white !important;
}

.n-card.n-card--bordered {
  height: 100%;
}

.toolContent {
  display: flex;
  flex-direction: column;
}

.sortersContainer {
  display: flex;
  width: 100%;
  gap: 20px;
}

.descriptionContainer {
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 890px) {
  .descriptionContainer {
    div {
      margin-bottom: 7px;
    }
  }

  .actionBtns {
    padding-bottom: 20px;
  }
  .sortersContainer {
    flex-direction: column;
  }
}
</style>
