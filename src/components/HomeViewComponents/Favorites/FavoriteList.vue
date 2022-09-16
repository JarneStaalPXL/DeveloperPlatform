<template>
  <n-config-provider
    v-if="
      $store.state.favoritetools !== null &&
      $store.state.favoritetools !== undefined &&
      $store.state.favoritetools.length > 0
    "
  >
    <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4">
      <n-gi v-for="tool of $store.state.favoritetools" :key="tool">
        <n-card :title="tool.name" bordered>
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
            <div class="titleButtons">
              <div class="actionBtns">
                <n-button @click="openLink(tool.link)">Open website</n-button>
                <n-popconfirm
                  @positive-click="removeToolFromFavorites(tool)"
                  @negative-click="abortRemovalTool()"
                >
                  <template #trigger>
                    <n-button class="pl-5"
                      ><i :style="{ color: '#7FE7C4' }" class="fa-solid fa-heart"></i
                    ></n-button>
                  </template>
                  Are you sure you want to remove this tool from your favorites?
                </n-popconfirm>
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
  <section class="noFavorites" v-else>
    <img src="../../../assets/illu_nofavorites.svg" />
    <div class="contentNoFavorites">
      <h6>You haven't added any favorites yet.</h6>
      <h6>
        Currently only
        <a @click="$router.push('globalfrontendtools')">Global Frontend Tools</a> &
        <a @click="$router.push('hostingproviders')">Hosting Providers</a> and
        <a @click="$router.push('learningtools')">Learning Tools</a> can be added as
        favorite.
      </h6>
    </div>
  </section>
</template>

<script>
import {
  NButton,
  NPopconfirm,
  useLoadingBar,
  useMessage,
  NCard,
  NGi,
  NGrid,
  NConfigProvider,
  darkTheme,
} from "naive-ui";
export default {
  components: {
    NButton,
    NPopconfirm,
    NCard,
    NGi,
    NGrid,
    NConfigProvider,
  },
  data() {
    return {
      dataIsLoading: false,
    };
  },
  mounted() {
    window.$message = useMessage();
    window.$loadingbar = useLoadingBar();
  },
  methods: {
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    async removeToolFromFavorites(tool) {
      window.$loadingbar.start();
      await this.$store
        .dispatch("REMOVE_TOOL_FROM_FAVORITES", tool)
        .then(async () => {
          const dataTools = JSON.parse(
            JSON.stringify(this.$store.state.globalFrontendTools)
          );
          for (const tl of dataTools) {
            if (tl.name === tool.name) {
              tl.isFavorited = false;
              break;
            }
          }
          this.$store.commit("setGlobalFrontendTools", dataTools);
          window.$message.success('"' + tool.name + '"' + " removed from favorites");
          window.$loadingbar.finish();
        })
        .catch((err) => {
          window.$loadingbar.error();
          window.$message.error(err);
        });
    },
    abortRemovalTool() {
      window.$message.info("Tool has NOT been removed");
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
.noFavorites {
  height: 87vh;
  img {
    max-width: 30%;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .contentNoFavorites {
    margin-bottom: 150px;
  }
  a {
    color: lightcoral;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }
}

// .globalFrontendtoolsContainer {
//   display: flex;
//   /* flex-direction: column; */
//   flex-wrap: wrap;
//   gap: 75px;
//   justify-content: space-between;

//   .item {
//     min-width: 37vw;
//     max-width: 41vw;
//   }
// }

// .item {
//   height: 300px;
//   border-radius: 15px;
//   margin-bottom: 20px;
//   // border: 2px solid transparent;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   background: black;
//   background-size: cover;
//   background-position: center;

//   section {
//     display: flex;
//     justify-content: space-between;
//     font-size: 18px;
//     background: black;
//     transition: opacity 0.3s ease-in-out;
//     margin: 0;
//     width: 100%;
//     padding-top: 15px;
//     padding-bottom: 15px;

//     background: rgba(255, 255, 255, 0.45);
//     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//     backdrop-filter: blur(4px);
//     -webkit-backdrop-filter: blur(4px);
//     border-bottom-left-radius: 15px;
//     border-bottom-right-radius: 15px;
//     border: 1px solid rgba(255, 255, 255, 0.18);

//     p {
//       padding-left: 15px;
//       margin-top: auto;
//       margin-bottom: auto;
//     }

//     div {
//       display: flex;
//       gap: 5px;
//       padding-right: 15px;

//       *,
//       *:hover {
//         background: white;
//       }
//     }
//   }

//   &:hover {
//     p {
//       // transition: opacity 0.3s ease-in-out;
//       // opacity: 0;
//       //disable selection
//       user-select: none;
//     }
//   }
// }

// @media only screen and (max-width: 750px) {
//   .globalFrontendtoolsContainer {
//     .item {
//       min-width: 100%;
//       max-width: 100%;
//     }
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
