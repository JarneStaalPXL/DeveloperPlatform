<template>
  <section class="fullContainer">
    <section class="explanationContainer">
      <h1>Developer Platform</h1>
      <p>Usefull tools you can use for your website and design.<br /></p>
    </section>
    <n-auto-complete
      class="autoCompleteInput"
      :on-update:value="showResultsTools"
      :input-props="{
        autocomplete: 'disabled',
      }"
      :options="toolResults"
      placeholder="Search (press space for all tools)"
      :on-select="openTool"
    />

    <section class="toolCategoriesContainer">
      <div>
        <n-button @click="$router.push('/globalfrontendtools')"
          >Global Frontend Tools
          <n-badge
            class="ml-1 pl-1 pr-1"
            :value="$store.state.globalFrontendTools.length"
            color="grey"
        /></n-button>
      </div>

      <div>
        <n-button @click="$router.push('/gradientgenerators')"
          >Gradient Generators
          <n-badge :value="$store.state.gradientGeneratorsTools.length" color="grey"
        /></n-button>
      </div>
      <div>
        <n-button @click="$router.push('/colorgenerators')"
          >Color Generators <n-badge :value="2" color="grey"
        /></n-button>
      </div>
      <div>
        <n-button @click="$router.push('/hostingproviders')"
          >Hosting Providers
          <n-badge :value="$store.state.hostingproviders.length" color="grey"
        /></n-button>
      </div>
    </section>
    <section class="mt-5 developmentSection">
      <h6>
        Developer Platform is still in development and we appreciate all the feedback.
      </h6>
      <h6>Visit our <a @click="openLink('https://discord.gg/3nfeEgcYgh')">Discord</a></h6>
    </section>
    <footer class="stickyFooter">
      <section class="allItemsFooter">
        <section class="pagevisitscontainer">
          <h1 v-if="getPageVisits > 0">
            {{ getPageVisits }} <i class="fa-solid fa-eyes"></i>
          </h1>
        </section>
        <h5 id="welcomeMsg" v-if="$store.state.isLoggedIn && userName() !== undefined">
          Welcome
          <a
            id="adminClickPointer"
            @click="$router.push($store.state.routings.adminPanel.path)"
            v-if="isAdmin()"
            >{{ userName() }}</a
          >
        </h5>
        <section class="timeContainer">
          <div class="clock-border">
            <div class="clock-inner">
              <div class="hour">{{ hours }}</div>
              <div class="dots">:</div>
              <div class="min">{{ minutes }}</div>
              <div class="dots">:</div>
              <div class="secs">{{ seconds }}</div>
              <div class="mode"></div>
            </div>
          </div>
        </section>
      </section>
    </footer>
    <div class="w-100">
      <component
        :is="'script'"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6265128065602433"
        crossorigin="anonymous"
        async
      ></component>
      <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-6265128065602433"
        data-ad-slot="2171576343"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <component :is="'script'" crossorigin="anonymous" async
        >(adsbygoogle = window.adsbygoogle || []).push({});</component
      >
      <component :is="'script'"> </component>
    </div>
  </section>
</template>

<script>
import ColorGeneratorsList from "@/components/HomeViewComponents/ColorGenerators/ColorGeneratorsList.vue";
import ResponsivityList from "@/components/HomeViewComponents/Responsivity/ResponsivityList.vue";
import GradientGeneratorsList from "@/components/HomeViewComponents/GradientGenerators/GradientGeneratorsList.vue";
import GlobalFrontendToolsList from "@/components/HomeViewComponents/GlobalFrontendTools/GlobalFrontendToolsList.vue";
import HostingProvidersList from "@/components/HomeViewComponents/HostingProviders/HostingProvidersList";
import SEOList from "@/components/HomeViewComponents/SEO/SEOList.vue";
import {
  NCard,
  NConfigProvider,
  darkTheme,
  NAvatar,
  NBadge,
  NCollapse,
  NCollapseItem,
  NInput,
  NButton,
  NAutoComplete,
} from "naive-ui";
export default {
  name: "HomeView",
  components: {
    NCard,
    NConfigProvider,
    NAvatar,
    NBadge,
    GradientGeneratorsList,
    ResponsivityList,
    ColorGeneratorsList,
    GlobalFrontendToolsList,
    HostingProvidersList,
    SEOList,
    NCollapse,
    NCollapseItem,
    NInput,
    NButton,
    NAutoComplete,
  },
  data() {
    return {
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
  beforeMount() {
    this.setTime();
  },
  methods: {
    openTool(link) {
      window.open(link, "_blank");
    },
    isAdmin() {
      return (
        localStorage["email"] !== undefined &&
        localStorage["email"].includes("jarne.staal9@gmail.com")
      );
    },
    setTime() {
      const date = new Date();
      this.hours = date.getHours();
      this.minutes = this.checkSingleDigit(date.getMinutes());
      this.seconds = this.checkSingleDigit(date.getSeconds());
      setInterval(() => {
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
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
      window.open(link, "_blank");
    },
    userName() {
      return localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : undefined;
    },
  },
  computed: {
    getPageVisits() {
      return this.$store.state.pagevisits;
    },
    shortUserName() {
      let username = localStorage.getItem("userName");
      if (username) {
        return username.split(" ")[0][0] + username.split(" ")[1][0];
      } else if (this.$store.state.name) {
        return (
          this.$store.state.name.split(" ")[0][0] +
          this.$store.state.name.split(" ")[1][0]
        );
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.developmentSection {
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
.allItemsFooter {
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 85vw;
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

  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  margin: 35px auto;
  gap: 10px;
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
#welcomeMsg {
  margin-top: auto;
  margin-bottom: auto;
  color: white;
}

.explanationContainer {
  padding-top: 10em;
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
