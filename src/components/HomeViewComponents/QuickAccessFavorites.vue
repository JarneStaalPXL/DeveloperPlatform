<template>
  <!-- <n-card
    v-for="tool of $store.state.favoritetools"
    :key="tool"
    :title="tool.name"
    :style="{ maxWidth: '300px' }"
  >
    <template #cover>
      <div
        class="cover"
        :style="
          tool.websitePreviewImage
            ? {
                background:
                  'url(' +
                  (tool.websitePreviewImage
                    ? tool.websitePreviewImage
                    : websitePreviewImagePlaceholder) +
                  ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : tool.css
        "
      ></div>
    </template>
    <n-button @click="openLink(tool.link)">Open website</n-button>
  </n-card> -->
  <section class="mt-5 mb-5">
    <n-config-provider
      class="mb-5 w-75 m-auto"
      v-if="$store.state.quickAccessTools.length > 0"
    >
      <n-grid x-gap="24" y-gap="24" cols="1 680:2 1200:4" class="quickAccessGrid">
        <n-gi v-for="tool of $store.state.quickAccessTools" :key="tool">
          <n-card
            :title="tool.name"
            bordered
            :style="{ width: '300px', height: '300px' }"
          >
            <template #cover>
              <div
                class="cover"
                :style="
                  tool.websitePreviewImage
                    ? {
                        background:
                          'url(' +
                          (tool.websitePreviewImage
                            ? tool.websitePreviewImage
                            : websitePreviewImagePlaceholder) +
                          ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }
                    : tool.css
                "
              ></div>
            </template>
            <section class="toolContent">
              <div class="titleButtons">
                <div class="actionBtns">
                  <n-button @click="openLink(tool.link)">Open website</n-button>
                </div>
              </div>

              <div
                class="justify-content-end promoContainer"
                v-if="tool.promoDescription"
              >
                <n-button class="promoBtn" @click="openLink(tool.promoLink)">{{
                  tool.promoDescription
                }}</n-button>
              </div>
            </section>
          </n-card>
        </n-gi>
      </n-grid>
    </n-config-provider>

    <n-popover
      placement="bottom"
      trigger="click"
      scrollable
      v-if="$store.state.favoritetools.length > 0"
    >
      <template #trigger>
        <n-button class="d-flex m-auto mt-5" size="large"
          >{{
            $store.state.selectedItemsQA.length > 0
              ? "Change Quick Access Tools"
              : "Add Quick Access Tools"
          }}<HomeAddIcon :style="{ width: '20px', marginLeft: '10px' }" />
        </n-button>
      </template>
      <div style="width: 40vw">
        <n-transfer
          :max="8"
          virtual-scroll
          source-filterable
          ref="transfer"
          v-model:value="$store.state.selectedItemsQA"
          @update:value="updateValue"
          :options="getManipulatedFavorites"
        />
      </div>
    </n-popover>
  </section>
</template>

<script>
import { HomeAdd24Regular as HomeAddIcon } from "@vicons/fluent";
import { ref } from "vue";
import {
  NCard,
  NButton,
  NGrid,
  NConfigProvider,
  NGi,
  NTransfer,
  NPopover,
} from "naive-ui";
export default {
  name: "QuickAccessFavorites",
  data() {
    return {};
  },
  components: {
    NCard,
    NButton,
    NGrid,
    NConfigProvider,
    NGi,
    NTransfer,
    NPopover,
    HomeAddIcon,
  },
  computed: {
    getManipulatedFavorites() {
      let manipulatedFavorites = [];
      this.$store.state.favoritetools.forEach((tool) => {
        manipulatedFavorites.push({
          label: tool.name,
          value: tool.name,
          key: tool.name,
          link: tool.link,
          description: tool.description,
        });
      });
      return manipulatedFavorites;
    },
  },
  methods: {
    updateValue(selectedTools) {
      //limit to 4 selections
      if (selectedTools.length > 3) {
        this.$store.commit("setsSelectedItemsQA", selectedTools.slice(0, 3));
        window.$message.info("You can only select 3 tools");
        return;
      }

      this.$store.commit("setsSelectedItemsQA", selectedTools);
      //search for the value in the favorite tools
      let newQuickAccessTools = [];
      selectedTools.forEach((tool) => {
        this.$store.state.favoritetools.forEach((favoriteTool) => {
          if (favoriteTool.name == tool) {
            newQuickAccessTools.push(favoriteTool);
          }
        });
      });

      //save the new quick access tools to the local storage or strapi
      this.$store.dispatch("SAVE_QUICK_ACCESS_TOOLS", newQuickAccessTools);
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
      value: ref([]),
    };
  },
};
</script>

<style lang="scss" scoped>
.cover {
  height: 150px;
  background-size: cover;
  background-position: center;
}
</style>

<style lang="scss" scoped>
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

<style>
.quickAccessGrid {
  gap: 24px !important;
  justify-content: center !important;
  align-content: center !important;
  align-items: center !important ;
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
