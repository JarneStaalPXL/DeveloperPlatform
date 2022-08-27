<template>
  <section class="globalFrontendtoolsContainer" v-if="!dataIsLoading">
    <div
      v-for="tool of $store.state.globalFrontendTools"
      :key="tool"
      class="item"
      :style="{
        backgroundImage:
          'url(' +
          (tool.websitePreviewImage
            ? tool.websitePreviewImage
            : websitePreviewImagePlaceholder) +
          ')',
        backgroundPosition: tool.websitePreviewImage ? '' : 'center',
      }"
    >
      <section class="toolContent">
        <div class="titleButtons">
          <p
            v-if="tool.name"
            :style="{ color: tool.textColor ? tool.textColor : 'white' }"
          >
            {{ tool.name }}
          </p>
          <div class="actionBtns">
            <n-button @click="openLink(tool.link)">Open website</n-button>
            <n-button
              class="pl-5"
              @click="addToolToFavorites(tool)"
              v-if="!tool.isFavorited"
              ><i :style="{ color: 'black' }" class="fa-solid fa-heart"></i
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
          <n-button
            class="promoBtn"
            @click="openLink(tool.promoLink)"
            :style="{ marginRight: '13px' }"
            >{{ tool.promoDescription }}</n-button
          >
        </div>
      </section>
    </div>
  </section>
  <section class="h-100" v-else>
    <n-spin size="large" stroke="blue">
      <template #icon>
        <n-icon>
          <Reload />
        </n-icon>
      </template>
    </n-spin>
  </section>
</template>

<script>
import { NButton, useLoadingBar, useMessage, NSpin, NIcon, NTag } from "naive-ui";
import { Reload } from "@vicons/ionicons5";
export default {
  components: {
    NButton,
    NSpin,
    Reload,
    NIcon,
    NTag,
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
          //find tool in globalFrontendTools and set isFavorited to false
          const dataTools = JSON.parse(
            JSON.stringify(this.$store.state.globalFrontendTools)
          );
          for (const tl of dataTools) {
            if (tl.name === tool.name) {
              tl.isFavorited = true;
              break;
            }
          }
          this.$store.commit("setGlobalFrontendTools", dataTools);
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
          this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          window.$message.success('"' + tool.name + '"' + " removed from favorites");
          window.$loadingbar.finish();
        })
        .catch((err) => {
          window.$loadingbar.error();
          window.$message.error(err);
        });
    },
    openLink(url) {
      if (url === "" || url === undefined) {
        return;
      }
      window.open(url, "_blank");
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", url);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
  },
};
</script>

<style lang="scss" scoped>
.toolContent {
  display: flex;
  flex-direction: column;
}
.globalFrontendtoolsContainer {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 75px;
  justify-content: space-between;
  .item {
    min-width: 43vw;
    max-width: 43vw;
  }
}
.item {
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  // border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: black;
  background-size: cover;
  background-position: center;

  section {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    background: black;
    transition: opacity 0.3s ease-in-out;
    margin: 0;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;

    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    p {
      padding-left: 15px;
      margin-top: auto;
      margin-bottom: auto;
    }
    div {
      display: flex;
      gap: 5px;
      padding-right: 15px;
      justify-content: space-between;
      button {
        background: white;
      }
    }
  }

  &:hover {
    p {
      // transition: opacity 0.3s ease-in-out;
      // opacity: 0;
      //disable selection
      // user-select: none;
    }
  }
}

@media only screen and (max-width: 890px) {
  .titleButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .actionBtns {
      display: flex;
      justify-content: center;
      button {
        width: 50%;
      }
    }
  }

  .promoBtn {
    width: 95%;
    margin: 0;
  }
  .item {
    min-width: 100% !important;
    section {
      flex-direction: column;
      p {
        padding-left: 0;
      }
      div {
        justify-content: space-between;
        padding-top: 10px;
        padding-right: 5px;
        padding-left: 5px;
      }
    }
  }
  .toolContent {
    display: flex;
    flex-direction: column;
    div {
      padding-right: 0;
      justify-content: space-between;
    }
  }
}
</style>
