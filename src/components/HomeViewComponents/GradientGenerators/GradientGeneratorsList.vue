<template>
  <n-config-provider>
    <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4">
      <n-gi v-for="tool of $store.state.gradientGeneratorsTools" :key="tool">
        <n-card :title="tool.name" bordered>
          <template #cover>
            <div class="gradientBox" :style="tool.css"></div>
          </template>
          <section class="toolContent">
            <div class="titleButtons">
              <div class="actionBtns">
                <n-button @click="openLink(tool.link)">Open website</n-button>
                <n-button
                  class="pl-5"
                  @click="addToolToFavorites(tool)"
                  v-if="!tool.isFavorited"
                  ><i class="fa-solid fa-heart"></i
                ></n-button>
                <n-button
                  class="pl-5"
                  @click="removeToolFromFavorites(tool)"
                  v-if="tool.isFavorited"
                  ><i :style="{ color: '#7FE7C4' }" class="fa-solid fa-heart"></i
                ></n-button>
              </div>
            </div>

            <div class="justify-content-end promoContainer" v-if="tool.promoDescription">
              <n-button class="promoBtn" @click="openLink(tool.promoLink)">{{
                tool.promoDescription
              }}</n-button>
            </div>
          </section>
        </n-card>
      </n-gi>
    </n-grid>
  </n-config-provider>
</template>

<script>
import {
  NConfigProvider,
  NButton,
  useLoadingBar,
  useMessage,
  NSpin,
  NIcon,
  NTag,
  NCard,
  darkTheme,
  NGrid,
  NGi,
} from "naive-ui";
import { Reload } from "@vicons/ionicons5";
export default {
  components: {
    NButton,
    NSpin,
    Reload,
    NIcon,
    NTag,
    NCard,
    NConfigProvider,
    NGrid,
    NGi,
  },
  async mounted() {
    window.$message = useMessage();
    window.$loadingbar = useLoadingBar();
  },
  data() {
    return {
      websitePreviewImagePlaceholder: require("../../../assets/coming-soon.jpg"),
      manipulatedTools: [],
      dataIsLoading: false,
      showFavoriteBtn: false,
    };
  },
  methods: {
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
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
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
.gradientBox {
  height: 300px;
}
// .gradientBox {
//   width: 300px;
//   margin: auto;
//   height: 300px;
//   border-radius: 15px;
//   margin-bottom: 20px;
//   border: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   p {
//     font-size: 18px;
//     align-self: flex-end;
//     width: 100%;
//     margin-bottom: 0;
//     padding: 15px;
//     background: rgba(255, 255, 255, 0.45);
//     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//     backdrop-filter: blur(4px);
//     -webkit-backdrop-filter: blur(4px);
//     border-bottom-left-radius: 15px;
//     border-bottom-right-radius: 15px;
//     border: 1px solid rgba(255, 255, 255, 0.18);
//   }

//   &:hover {
//     border: 2px solid white;
//     cursor: pointer;
//   }
// }
.promoContainer {
  margin-top: 10px;
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
}

.n-card.n-card--bordered {
  height: 100%;
}

.toolContent {
  display: flex;
  flex-direction: column;
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

  .promoContainer {
    margin-top: -10px;
    padding-bottom: 20px;
  }
}
</style>
