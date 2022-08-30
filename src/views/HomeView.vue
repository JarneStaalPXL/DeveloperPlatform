<template>
  <section class="fullContainer">
    <section class="explanationContainer">
      <h1>Developer Platform</h1>
      <p>Useful tools you can use for your website and design.<br /></p>
    </section>
    <n-auto-complete
      class="autoCompleteInput"
      :on-update:value="showResultsTools"
      :input-props="{
        autocomplete: 'disabled',
      }"
      :options="toolResults"
      placeholder="Search (press space for all tools)"
      :on-select="openLink"
    />

    <section class="toolCategoriesContainer">
      <section class="categories">
        <h4>Categories</h4>
        <section>
          <div>
            <n-button @click="$router.push('/globalfrontendtools')"
              >Global Frontend Tools
              <n-badge
                class="ml-1 pl-1 pr-1"
                :value="$store.state.globalFrontendTools.length"
                color="grey"
              />
            </n-button>
          </div>

          <div>
            <n-button @click="$router.push('/gradientgenerators')"
              >Gradient Generators
              <n-badge
                :value="$store.state.gradientGeneratorsTools.length"
                color="grey"
              />
            </n-button>
          </div>
          <div>
            <n-button @click="$router.push('/colorgenerators')"
              >Color Generators
              <n-badge :value="2" color="grey" />
            </n-button>
          </div>
          <div>
            <n-button @click="$router.push('/hostingproviders')"
              >Hosting Providers
              <n-badge
                :value="$store.state.hostingproviders.length"
                color="grey"
              />
            </n-button>
          </div>
        </section>
      </section>

      <n-skeleton
        :style="{ margin: 'auto' }"
        height="30px"
        text
        style="width: 30%"
        v-if="$store.state.favoritetools === undefined"
      />
      <div
        v-if="$store.state.favoritetools === undefined"
        class="d-flex justify-content-between"
      >
        <n-skeleton
          v-for="i in 5"
          style="width: 15%"
          :key="i"
          :sharp="false"
          size="medium"
        />
      </div>
      <section
        class="someFavorites"
        v-if="
          $store.state.favoritetools !== undefined &&
          $store.state.favoritetools !== null
        "
      >
        <h4 v-if="$store.state.favoritetools.length > 0">
          Some of your favorites
        </h4>
        <div class="favorites" v-if="$store.state.favoritetools">
          <n-button
            v-for="tool of first5Favorites()"
            :key="tool"
            @click="openLink(tool.link)"
          >
            {{ tool.name }}
          </n-button>
        </div>
      </section>
    </section>

    <section class="mt-5 developmentSection">
      <h4>
        {{
          voted ? "Thank you for voting!" : "Do you like this homepage? Vote!"
        }}
      </h4>
      <div class="p-3 d-flex justify-content-center" :style="{ gap: '5px' }">
        <n-button @click="voteHomepage('positiveVotes')" :disabled="voted">
          <template #icon>
            <n-icon>
              <ThumbsUp />
            </n-icon>
          </template>
          Yes
        </n-button>

        <n-button @click="voteHomepage('negativeVotes')" :disabled="voted">
          <template #icon>
            <n-icon>
              <ThumbsDown />
            </n-icon>
          </template>
          No
        </n-button>
      </div>
      <h6>
        Developer Platform is a platform where you can favorite all the useful
        tools you want to use. It's continously expanding features and
        possibilities.
      </h6>
      <h6>
        Visit our
        <a @click="openLink('https://discord.gg/3nfeEgcYgh')">Discord</a> to
        provide feedback .
      </h6>
      <h6 class="mt-5">Current status:</h6>
      <n-tag type="info">DATABASE ISSUES RESOLVED</n-tag>
    </section>
   
  </section>
</template>

<script>
import { ThumbsDown, ThumbsUp } from "@vicons/ionicons5";
import {
  NCard,
  NConfigProvider,
  darkTheme,
  NAvatar,
  NBadge,
  NCollapse,
  NCollapseItem,
  NIcon,
  NInput,
  NButton,
  NAutoComplete,
  NTag,
  useMessage,
  NSkeleton,
  useNotification,
} from "naive-ui";
export default {
  name: "HomeView",
  components: {
    NCard,
    NTag,
    NConfigProvider,
    NAvatar,
    NBadge,
    NCollapse,
    NCollapseItem,
    NInput,
    NButton,
    NAutoComplete,
    NSkeleton,
    NIcon,
    ThumbsDown,
    ThumbsUp,
  },
  data() {
    return {
      voted: false,
      toolSearchString: "",
      toolResults: [],
      hasToolResult: true,
      showAll: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  setup() {
    return {
      darkTheme,
    };
  },

  mounted() {
    window.$message = useMessage();
    window.$notification = useNotification();
    this.checkIfVoted();

    if (localStorage.getItem("uid") !== null) {
      // window.$message.success("Welcome back " + this.userName() + "!", {
      //   duration: 5000,
      // });

      //check if on mobile
      if (window.innerWidth < 768) {
        window.$message.success("Welcome back " + this.userName() + "!", {
          duration: 5000,
        });
      } else {
        window.$notification.info({
          title: "Welcome back " + this.userName() + " !",
          content:
            "Feel free to browse the tools and try them out. \nIf you like them, you can add them to your favorites.\n",
        });
      }
    } else {
      if (window.innerWidth < 768) {
        window.$message.success("Welcome to Developer Platform", {
          duration: 5000,
        });
      } else {
        window.$notification.info({
          title: "Welcome to Developer Platform",
          content:
            "Feel free to browse the tools and try them out. \nIf you like them, you can add them to your favorites.\n" +
            "\nDisclaimer: Log in to get the full functionality of the platform.",
        });
      }
    }
  },
  methods: {
    checkIfVoted() {
      if (localStorage.getItem("voted") !== null) {
        if (localStorage.getItem("voted") === "true") {
          this.voted = true;
        }
      }
    },
    voteHomepage(value) {
      localStorage.setItem("voted", true);
      this.$store.dispatch("VOTE_DESIGN_ROUTE",{
        voteType: value ,
        route: "Homepage"
      });
      window.$notification.info({
        title: "Thank you for voting!",
      });
      this.checkIfVoted();
    },
    first5Favorites() {
      if (
        this.$store.state.favoritetools !== undefined &&
        this.$store.state.favoritetools !== null &&
        this.$store.state.favoritetools.length > 0
      ) {
        return this.$store.state.favoritetools.slice(0, 5);
      }
    },
    clearResults() {
      this.toolResults = [];
      this.showAll = true;
    },
    async showResultsTools(value) {
      var tools = await this.$store.dispatch("SEARCH_TOOLS", value);
      //rank tools by string size
      tools.sort((a, b) => {
        return a.name.length - b.name.length;
      });

      let optionsArr = [];
      for (let tool of tools) {
        optionsArr.push({
          label: tool.name,
          value: tool.link,
        });
      }

      this.toolResults = optionsArr;
      if (this.showAll === false) {
        this.showAll = true;
      } else {
        this.showAll = false;
      }
    },
    openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    userName() {
      return localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
.developmentSection {
  width: 75%;
  margin: auto;

  a {
    color: #2bd48c;

    &:hover {
      cursor: pointer;
    }
  }
}

#adminClickPointer {
  cursor: pointer;
}

.optionContainer {
  width: 300px;
  height: 300px;
  background: lightblue;
  border-radius: 10px;
}

.stickyFooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: #24242a;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .pagevisitscontainer {
    display: flex;
    justify-content: flex-end;
    color: white;
    margin-top: auto;
    margin-bottom: auto;
  }

  .timeContainer {
    .clock-inner {
      display: flex;
      color: white;
      font-size: 25px;
    }
  }

  h1,
  i {
    font-size: 25px;
  }
}

h4 {
  margin: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#name {
  margin-top: auto;
}

// h1 {
//   color: white;
// }

.categoryCard {
  margin: auto;
  width: 85vw;
}

.titleCard {
  a:hover {
    cursor: pointer;
  }
}

a {
  text-decoration: none;
  border: 2px solid transparent;
  // border-radius: 30px;
  transition: ease-in-out 0.3s;
}

// .n-card.n-card--bordered {
//   border: 2px solid transparent;
//   &:hover .radio-btns__btn:not(:hover) {
//     filter: grayscale(100%);
//   }
// }
// .n-card.n-card--bordered:hover {
//   border: 2px solid white;
// }

.title {
  font-size: 30px;
  margin: 0;
  padding: 0;
}

.toolResult {
  display: flex;
}

.tool {
  p {
    margin: 0;
    font-weight: bold;
    font-size: 16px;
  }

  padding: 20px;
  text-align: left;
  background: white;
  color: black;
  margin: 5px;

  width: 100%;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background: #5acea7;
    color: white;
  }
}

#noresults {
  padding: 10px;
  font-size: 20px;
  text-align: left;
  margin: 0;
}

.toolResultsContainer {
  display: flex;
  flex-wrap: wrap;
}

//new css
.toolCategoriesContainer {
  padding: 20px;
  border: 10px solid;
  border-image-slice: 1 !important;
  border-width: 5px;
  border-image: linear-gradient(to right, #1ea4e9, #36fd3c);

  width: fit-content;
  margin: 35px auto;

  gap: 30px;
  display: flex;
  flex-direction: column;

  .categories {
    gap: 20px;
    width: 100%;
    justify-content: space-between;

    section {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .someFavorites {
    h4 {
      margin-bottom: 20px;
    }

    .favorites {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  div {
    padding-left: 9px;

    * {
      width: auto;
    }
  }
}

.autoCompleteInput {
  width: 450px;
}

.navbarContent {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

.explanationContainer {
  padding-top: 5%;
  background: linear-gradient(to right, #1ea4e9, #36fd3c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

//

.optionsRow1Container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;

  p {
    font-size: 20px;
  }

  .optionContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media only screen and (max-width: 980px) {
  .titleCard,
  .categoryCard {
    margin: 0;
    width: 100vw;
  }

  .searchToolsContainer {
    flex-direction: column;

    div,
    button {
      width: 100% !important;
    }
  }

  .toolResultsContainer {
    flex-direction: column;
  }

  .toolCategoriesContainer {
    width: 75vw;

    div {
      width: 100%;
      padding-left: 0;

      * {
        padding-left: 20px;
        width: 100%;
      }
    }
  }

  .autoCompleteInput {
    width: 75vw;
  }

  .explanationContainer {
    padding-top: 4em;
  }

  .explanationContainer p {
    font-size: 15;
    width: 75vw;
    margin: auto;
    margin-bottom: 25px;
  }

  .allItemsFooter {
    #welcomeMsg {
      font-size: 15px;
    }

    .pagevisitscontainer *,
    .timeContainer * {
      font-size: 20px;
    }

    .pagevisitscontainer h1 {
      margin: 0;
    }
  }
}
</style>
