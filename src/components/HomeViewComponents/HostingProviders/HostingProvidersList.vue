<template>
  <div class="d-flex w-100 mb-4" style="gap: 20px">
    <n-button @click="sortRecommended()">SORT ON RECOMMENDED</n-button>
    <n-button @click="sortUsed()">SORT ON USED BY DEVELOPER PLATFORM</n-button>
  </div>
  <section class="globalFrontendtoolsContainer">
    <div
      v-for="provider of $store.state.hostingproviders"
      :key="provider"
      class="item"
      :style="{
        backgroundImage:
          'url(' +
          (provider.websitePreviewImage
            ? provider.websitePreviewImage
            : websitePreviewImagePlaceholder) +
          ')',
        backgroundPosition: provider.websitePreviewImage ? '' : 'center',
      }"
    >
      <section class="itemSection">
        <div class="itemContent">
          <p
            v-if="provider.name"
            :style="{ color: provider.textColor ? provider.textColor : 'white' }"
          >
            {{ provider.name }}
          </p>

          <div>
            <n-button @click="openLink(provider.link)">Open website</n-button>
            <n-button
              class="pl-5"
              @click="addToolToFavorites(provider)"
              v-if="!provider.isFavorited"
              ><i :style="{ color: 'black' }" class="fa-solid fa-heart"></i
            ></n-button>
            <n-button
              class="pl-5"
              @click="removeToolFromFavorites(provider)"
              v-if="provider.isFavorited"
              ><i :style="{ color: 'red' }" class="fa-solid fa-heart"></i
            ></n-button>
          </div>
        </div>
        <div class="pt-3 descriptionContainer" v-if="provider.description">
          <p>{{ provider.description }}</p>
          <div>
            <n-tag type="success" v-if="provider.isRecommended">RECOMMENDED</n-tag>
            <n-tag type="info" v-if="provider.isUsed">USED BY DEVELOPER PLATFORM</n-tag>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { NButton, useLoadingBar, useMessage, NSpin, NIcon, NTag } from "naive-ui";
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
  },
  methods: {
    sortRecommended() {
      this.$store.dispatch("SORT_HOSTINGPROVIDERS_BY_RECOMMENDED");
    },
    sortUsed() {
      this.$store.dispatch("SORT_HOSTINGPROVIDERS_BY_USED");
    },
    openLink(url) {
      if (url === "" || url === undefined) {
        return;
      }
      window.open(url, "_blank");
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", url);
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
};
</script>

<style lang="scss" scoped>
.itemSection {
  display: flex;
  flex-direction: column;
  .itemContent {
    justify-content: space-between;
    p {
      font-weight: bold;
    }
  }
  .descriptionContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      gap: 10px;
      justify-content: center;
    }
  }
}
//from globalfrontendtools
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
  height: 500px;
  border-radius: 15px;
  margin-bottom: 20px;
  // border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-size: cover;
  background-repeat: no-repeat;
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

    background: white;
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
      word-break: break-word;
    }
    div {
      display: flex;
      gap: 5px;
      padding-right: 15px;
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
  .item {
    min-width: 100% !important;
    section {
      flex-direction: column;
      div {
        padding-top: 10px;
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }
  .itemSection {
    .itemContent {
      display: flex;
      flex-direction: column;
      width: 100%;
      div {
        justify-content: center;
        * {
          width: 50%;
        }
      }
    }
    .descriptionContainer {
      p {
        padding-left: 0;
      }
      div {
        width: 100%;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
