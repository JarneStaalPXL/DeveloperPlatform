<template>
  <section>
    <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4">
      <n-gi v-for="project of $store.state.userProjects" :key="project">
        <n-card :title="project.title" bordered>
          <template #footer>
            <div class="titleButtons">
              <div class="actionBtns">
                <n-button @click="openLink(project.websiteLink)"
                  >Open website</n-button
                >
                <n-button @click="openLink(project.github)"
                  >Open Github</n-button
                >
              </div>
            </div>
          </template>
          <template #cover>
            <div
              class="cover"
              :style="{
                background:
                  'url(' +
                  (project.image
                    ? project.image
                    : websitePreviewImagePlaceholder) +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }"
            ></div>
          </template>

          <section class="toolContent">
            <div class="descriptionContainer" v-if="project.description">
              <p>{{ project.description }}</p>
            </div>
          </section>
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
export default {
  mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    this.$store.dispatch("GET_USER_PROJECTS");
  },
  data() {
    return {};
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
  },
  methods: {
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
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
