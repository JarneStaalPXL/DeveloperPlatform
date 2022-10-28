<template>
  <section class="fullContainer">
    <QuickAccessFavorites />
    <section class="explanationContainer">
      <h1>Developer Platform</h1>
      <p>Useful tools you can use for your website and design.<br /></p>
      <div id="searchbar">
        <SearchComponent />
      </div>
    </section>

    <section class="developmentSection">
      <h6 class="mt-3">
        Developer Platform is a platform where you can favorite all the useful tools you
        want to use. It's continously expanding features and possibilities.
      </h6>
      <h6 class="mt-3" v-if="!$store.state.isLoggedIn">
        To have access to the Quick Access dashboard, you need to
        <a @click="$router.push('login')">log in</a> or
        <a @click="$router.push('register')">sign up</a>.
      </h6>
      <h6 class="mt-3" v-if="$store.state.isLoggedIn">
        This homepage offers a Quick Access dashboard, where you can have up to 6 of your
        favorites for easy access. Configure these on
        <a @click="$router.push('favorites')">favorites</a>
      </h6>
      <h6 class="mt-3">
        <a
          href="https://github.com/DeveloperJarne/DeveloperPlatform/issues/new"
          target="_blank"
          >Open an issue</a
        >
        to request a feature. You can also contribute to the project by forking it on
        <a href="https://github.com/DeveloperJarne/DeveloperPlatform" target="_blank"
          >GitHub</a
        >.
      </h6>
      <h6 class="mt-3" id="submitFeedback">
        <a @click="$store.commit('setShowFeedbackModal', true)">Submit feedback</a> to let
        me know what you think of the platform.
      </h6>
      <h6 class="mt-3">
        <a href="https://discord.gg/3nfeEgcYgh" target="_blank"
          >Join our community on Discord</a
        >
      </h6>
    </section>
    <section class="jokeBlock">
      <div>
        <h4>{{ fetchedJokeSetup }}</h4>

        <h5 style="font-style: italic; margin-top: 10px">
          {{ fetchedJokeDelivery }}
        </h5>
      </div>
    </section>

    <section class="newFeatureBlock">
      <div>
        <h3>THE NEXT BIG FEATURE - PROJECTS</h3>
        <p>
          You are able to create <a @click="$router.push('/projects')">projects</a> within
          this platform and add all the tools and data you used for that project.
        </p>
        <p>
          Like this you can keep track of what you used for your projects and have quick
          access to them.
        </p>
        <p>As of now the feature is released but we are still trying to improve it.</p>
        <p>If you have any feedback, please let us know.</p>
      </div>
      <img class="d-flex m-auto mt-4" src="../assets/projectCreation.svg" />
    </section>

    <!--Implement what i'm working on right now or the next biggest feature or something like that-->
  </section>
</template>

<script>
import { ThumbsDown, ThumbsUp } from "@vicons/ionicons5";
import {
  NModal,
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
  NDivider,
} from "naive-ui";
import QuickAccessFavorites from "../components/HomeViewComponents/QuickAccessFavorites.vue";
import SearchComponent from "../components/GlobalComponents/SearchComponent.vue";
import FeedbackComponent from "@/components/GlobalComponents/FeedbackComponent.vue";
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
    SearchComponent,
    NModal,
    FeedbackComponent,
    QuickAccessFavorites,
    NDivider,
  },
  data() {
    return {
      showFeedbackPopup: false,
      voted: false,
      toolSearchString: "",
      // toolResults: [],
      hasToolResult: true,
      showAll: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      fetchedJokeSetup: "",
      fetchedJokeDelivery: "",
    };
  },
  setup() {
    return {
      darkTheme,
    };
  },
  beforeUnmount() {
    window.$notification.destroyAll();
  },
  async mounted() {
    //Load joke
    fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist&type=twopart"
    )
      .then((response) => response.json())
      .then((response) => {
        this.fetchedJokeSetup = response.setup;
        this.fetchedJokeDelivery = response.delivery;
      })
      .catch((err) => console.error(err));
    //

    window.$message = useMessage();
    window.$notification = useNotification();

    if (localStorage.getItem("uid") !== null) {
      // window.$message.success("Welcome back " + this.userName() + "!", {
      //   duration: 5000,
      // });

      //check if on mobile
      if ((await this.$store.dispatch("GET_USER_HOME_NOTIFICATION")) === false) {
        return;
      }

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
    clearResults() {
      this.toolResults = [];
      this.showAll = true;
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
.jokeBlock {
  margin-bottom: 25px !important;
}
.newFeatureBlock,
.jokeBlock {
  display: flex;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgb(0 0 0 / 37%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 200px;

  p {
    margin-bottom: 2px;
  }

  img {
    max-width: 50%;
  }
}

.developmentSection {
  text-align: center;
  width: 75%;
  margin: auto;
  margin-bottom: 100px;

  a {
    color: #2bd48c;

    &:hover {
      cursor: pointer;
    }
  }
}
.newFeatureBlock {
  a {
    color: #2bd48c;
    &:hover {
      color: #2bd48c;
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
  h1 {
    font-weight: 600;
  }
  h1,
  p {
    margin-bottom: 0;
    text-align: center;
    background: linear-gradient(to right, #1ea4e9, #36fd3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  padding-top: 30px;
  // margin-bottom: 100px;
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

#searchbar {
  display: none;
}

@media only screen and (max-width: 980px) {
  .newFeatureBlock {
    width: 90% !important;
    img {
    }
  }

  #searchbar {
    display: flex;
    justify-content: center !important;
  }

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

@media only screen and (min-width: 550px) {
  #submitFeedback {
    display: none;
  }
}
</style>
