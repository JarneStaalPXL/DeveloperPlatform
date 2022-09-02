<template>
  <section
    class="globalFrontendtoolsContainer"
    v-if="
      $store.state.favoritetools !== null &&
      $store.state.favoritetools !== undefined &&
      $store.state.favoritetools.length > 0
    "
  >
    <div
      v-for="tool of $store.state.favoritetools"
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
      <section>
        <p v-if="tool.name" :style="{ color: tool.textColor ? tool.textColor : 'white' }">
          {{ tool.name }}
        </p>
        <div>
          <n-button @click="openLink(tool.link)">Open website</n-button>

          <n-popconfirm
            @positive-click="removeToolFromFavorites(tool)"
            @negative-click="abortRemovalTool()"
          >
            <template #trigger>
              <n-button class="pl-5"
                ><i :style="{ color: 'red' }" class="fa-solid fa-heart"></i
              ></n-button>
            </template>
            Are you sure you want to remove this tool from your favorites?
          </n-popconfirm>
        </div>
      </section>
    </div>
  </section>
  <section class="h-100 noFavorites" v-else>
    <h6>You haven't added any favorites yet.</h6>
    <h6>
      Currently only
      <a @click="$router.push('/globalfrontendtools')">Global Frontend Tools</a> and
      <a @click="$router.push('hostingproviders')">Hosting Providers</a> can be added as
      favorite.
    </h6>
  </section>
</template>

<script>
import { NButton, NPopconfirm, useLoadingBar, useMessage } from "naive-ui";
export default {
  components: {
    NButton,
    NPopconfirm,
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
};
</script>
<style lang="scss" scoped>
.noFavorites {
  a {
    color: lightcoral;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }
}

.globalFrontendtoolsContainer {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 75px;
  justify-content: space-between;

  .item {
    min-width: 37vw;
    max-width: 41vw;
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

      *,
      *:hover {
        background: white;
      }
    }
  }

  &:hover {
    p {
      // transition: opacity 0.3s ease-in-out;
      // opacity: 0;
      //disable selection
      user-select: none;
    }
  }
}

@media only screen and (max-width: 750px) {
  .globalFrontendtoolsContainer {
    .item {
      min-width: 100%;
      max-width: 100%;
    }
  }
}
</style>
