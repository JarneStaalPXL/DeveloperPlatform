<template>
  <div class="mb-4 sortersContainer">
    <n-button @click="sortRecommended()">SORT ON RECOMMENDED</n-button>
    <n-button @click="sortUsed()">SORT ON USED BY DEVELOPER PLATFORM</n-button>
  </div>
  <n-config-provider :theme="darkTheme">
    <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4">
      <n-gi v-for="tool of $store.state.hostingproviders" :key="tool">
        <n-card :title="tool.name" bordered>
          <template #footer>
            <div class="titleButtons">
              <div class="actionBtns">
                <n-button @click="openLink(tool.link)">Open website</n-button>
                <n-button
                  class="pl-5"
                  @click="addToolToFavorites(tool)"
                  v-if="!tool.isFavorited"
                  ><i :style="{ color: 'white' }" class="fa-solid fa-heart"></i
                ></n-button>
                <n-button
                  class="pl-5"
                  @click="removeToolFromFavorites(tool)"
                  v-if="tool.isFavorited"
                  ><i :style="{ color: 'red' }" class="fa-solid fa-heart"></i
                ></n-button>
              </div>
            </div>

            <div class="mt-3 justify-content-end" v-if="tool.promoDescription">
              <n-button class="promoBtn" @click="openLink(tool.promoLink)">{{
                tool.promoDescription
              }}</n-button>
            </div></template
          >
          <template #header-extra>
            <div class="d-flex flex-column">
              <n-tag type="success" v-if="tool.isRecommended">RECOMMENDED</n-tag>
              <n-tag type="info" v-if="tool.isUsed">{{ tool.usedDescription }}</n-tag>
            </div>
          </template>

          <template #cover>
            <div
              class="cover"
              :style="{
                background:
                  'url(' +
                  (tool.websitePreviewImage
                    ? tool.websitePreviewImage
                    : websitePreviewImagePlaceholder) +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }"
            ></div>
          </template>

          <section class="toolContent">
            <div class="descriptionContainer" v-if="tool.description">
              <p>{{ tool.description }}</p>
            </div>
          </section>
        </n-card>
      </n-gi>
    </n-grid>
  </n-config-provider>
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
    sortRecommended() {
      this.$store.dispatch("SORT_HOSTINGPROVIDERS_BY_RECOMMENDED");
    },
    sortUsed() {
      this.$store.dispatch("SORT_HOSTINGPROVIDERS_BY_USED");
    },
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    async addToolToFavorites(tool) {
      window.$loadingbar.start();
      await this.$store
        .dispatch("ADD_TOOL_TO_FAVORITES", tool)
        .then(async () => {
          this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          window.$message.success('"' + tool.name + '"' + " added to favorites");
          window.$loadingbar.finish();
        })
        .catch((err) => {
          window.$loadingbar.error();
          window.$message.error(err);
        });
    },
    async removeToolFromFavorites(tool) {
      window.$loadingbar.start();
      await this.$store
        .dispatch("REMOVE_TOOL_FROM_FAVORITES", tool)
        .then(async () => {
          this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          window.$message.success('"' + tool.name + '"' + " removed from favorites");
          window.$loadingbar.finish();
        })
        .catch((err) => {
          window.$loadingbar.error();
          window.$message.error(err);
        });
    },
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
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
