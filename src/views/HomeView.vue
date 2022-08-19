<template>
  <n-config-provider :theme="darkTheme">
    <section :style="{ marginBottom: '100px' }">
      <n-card class="titleCard">
        <template #header>
          <div class="d-flex justify-content-between">
            <p class="title">Developer Platform</p>

            <a
              @click="$router.push($store.state.routings.adminPanel.path)"
              v-if="isAdmin()"
            >
              <Transition appear>
                <n-avatar
                  size="large"
                  :style="{
                    color: 'white',
                    backgroundColor: '#A097E0',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }"
                  >{{ userName ? userName.toUpperCase() : "" }}</n-avatar
                >
              </Transition>
            </a>

            <Transition appear>
              <n-avatar
                v-if="$store.state.isLoggedIn && !isAdmin()"
                size="large"
                :style="{
                  color: 'white',
                  backgroundColor: '#A097E0',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }"
                >{{ userName ? userName.toUpperCase() : "" }}</n-avatar
              >
            </Transition>
          </div>
        </template>
        <div class="d-flex searchToolsContainer">
          <n-input
            class="w-75"
            v-model:value="toolSearchString"
            placeholder="Search online tool"
            @keyup.enter="showResultsTools(toolSearchString)"
          >
          </n-input>
          <n-button class="w-25" @click="showResultsTools(toolSearchString)"
            >Search</n-button
          >
          <n-button class="w-25" @click="showResultsTools('')" v-show="showAll"
            >Show All Tools</n-button
          >
          <n-button class="w-25" @click="clearResults()" v-show="!showAll"
            >Hide All</n-button
          >
        </div>

        <n-card v-if="toolResults.length > 0">
          <div class="toolResultsContainer">
            <div v-for="tool of toolResults" :key="tool" class="toolResult">
              <a @click="openLink(tool.link)" class="tool">
                <div id="colorLightenerDarkerBox">
                  <p>{{ tool.name }}</p>
                </div>
              </a>
            </div>
          </div>
        </n-card>
        <p id="noresults" v-if="!hasToolResult">NO RESULTS</p>
      </n-card>

      <n-collapse>
        <n-card class="categoryCard" :style="{ marginTop: '30px' }">
          <!--card header template-->
          <n-collapse-item :default-expanded-names="['1']">
            <template #header>
              <div class="d-flex" style="gap: 10px">
                <h4>Global Frontend Tools</h4>
                <n-badge :value="$store.state.globalFrontendTools.length" color="grey" />
              </div>
            </template>

            <GlobalFrontendToolsList />
          </n-collapse-item>
        </n-card>
      </n-collapse>

      <n-collapse>
        <n-card class="categoryCard" :style="{ marginTop: '30px' }">
          <!--card header template-->
          <n-collapse-item :default-expanded-names="['2']">
            <template #header>
              <div class="d-flex" style="gap: 10px">
                <h4>Gradient Generators</h4>
                <n-badge
                  :value="$store.state.gradientGeneratorsTools.length"
                  color="grey"
                />
              </div>
            </template>
            <GradientGeneratorsList />
          </n-collapse-item>
        </n-card>
      </n-collapse>

      <n-collapse>
        <n-card class="categoryCard" :style="{ marginTop: '30px' }">
          <!--card header template-->
          <n-collapse-item :default-expanded-names="['3']">
            <template #header>
              <div class="d-flex" style="gap: 10px">
                <h4>Color Generators</h4>
                <n-badge :value="1" color="grey" />
              </div>
            </template>
            <ColorGeneratorsList />
          </n-collapse-item>
        </n-card>
      </n-collapse>

      <n-collapse>
        <n-card class="categoryCard" :style="{ marginTop: '30px' }">
          <!--card header template-->
          <n-collapse-item :default-expanded-names="['4']">
            <template #header>
              <div class="d-flex" style="gap: 10px">
                <h4>Hosting Providers</h4>
                <n-badge :value="$store.state.hostingproviders.length" color="grey" />
              </div>
            </template>
            <HostingProvidersList />
          </n-collapse-item>
        </n-card>
      </n-collapse>

      <footer class="stickyFooter">
        <section class="pagevisitscontainer">
          <h1 v-if="getPageVisits > 0">
            {{ getPageVisits }} <i class="fa-solid fa-eyes"></i>
          </h1>
        </section>
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

        <!-- <n-button>Reset PageVisits to 0</n-button> -->
      </footer>
    </section>
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
    </div>
  </n-config-provider>
</template>

<script>
import { useScriptTag } from "@vueuse/core";

useScriptTag(
  "https://player.twitch.tv/js/embed/v1.js",
  // on script tag loaded.
  (el) => {
    // do something
  }
);

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
    async showResultsTools(toolSearchString) {
      var tools = await this.$store.dispatch("SEARCH_TOOLS", toolSearchString);
      //rank tools by string size
      tools.sort((a, b) => {
        return a.name.length - b.name.length;
      });
      this.toolResults = tools;
      if (tools.length > 0) {
        this.hasToolResult = true;
      } else {
        this.hasToolResult = false;
      }

      if (this.showAll === false) {
        this.showAll = true;
      } else {
        this.showAll = false;
      }
    },
    openLink(link) {
      window.open(link, "_blank");
    },
  },
  computed: {
    getPageVisits() {
      return this.$store.state.pagevisits;
    },
    userName() {
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

h1 {
  color: white;
}

.titleCard,
.categoryCard {
  margin: auto;
  width: 85vw;
}

.titleCard {
  margin-top: 30px;
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

@media only screen and (max-width: 650px) {
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
}
</style>
