<template>
  <n-config-provider :theme="darkTheme">
    <n-card class="titleCard">
      <template #header>
        <div class="d-flex justify-content-between">
          <p class="title">Developer Platform</p>

          <Transition appear>
            <n-avatar
              v-if="$store.state.isLoggedIn"
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
      <div class="d-flex">
        <n-input
          class="w-75"
          v-model:value="toolSearchString"
          placeholder="Search tool"
        >
        </n-input>
        <n-button class="w-25" @click="showResultsTools(toolSearchString)"
          >Search</n-button
        >
        <n-button class="w-25" @click="showResultsTools('')" v-show="showAll">Show All Tools</n-button>
        <n-button class="w-25" @click="clearResults()" v-show="!showAll">Hide All</n-button>
      </div>

      <n-card v-if="toolResults.length > 0">
        <div v-for="tool of toolResults" :key="tool" class="toolResultsContainer">
          <a
            @click="
              openLink(tool.link)
            "
            class="tool"
          >
            <div  id="colorLightenerDarkerBox">
              <p>{{ tool.name }}</p>
            </div>
          </a>
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
              <n-badge
                :value="$store.state.globalFrontendTools.length"
                color="grey"
              />
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
              <n-badge :value="2" color="grey" />
            </div>
          </template>
          <GradientGeneratorsList />
        </n-collapse-item>
      </n-card>
    </n-collapse>

    <!-- 
    <n-card class="categoryCard" :style="{ marginTop: '30px' }">
      <template #header>
        <div class="d-flex" style="gap: 10px">
          <h4>SEO</h4>
          <n-badge :value="1" color="grey" />
        </div>
      </template>
      <SEOList />
    </n-card>

    <n-card class="categoryCard" :style="{ marginTop: '30px' }">
      <template #header>
        <div class="d-flex" style="gap: 10px">
          <h4>Website Responsivity</h4>
          <n-badge :value="1" color="grey" />
        </div>
      </template>
      <ResponsivityList />
    </n-card> -->

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
              <n-badge
                :value="$store.state.hostingproviders.length"
                color="grey"
              />
            </div>
          </template>
          <HostingProvidersList />
        </n-collapse-item>
      </n-card>
    </n-collapse>
  </n-config-provider>
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
      toolSearchString: '',
      toolResults: [],
      hasToolResult: true,
      showAll: true,
    };
  },
  setup() {
    return {
      darkTheme,
    };
  },
  mounted() {},
 
  methods: {
    clearResults() {
      this.toolResults = [];

       this.showAll = true;
    },
    async showResultsTools(toolSearchString) {
      var tools = await this.$store.dispatch(
        "SEARCH_TOOLS",
        toolSearchString
      );
      this.toolResults = tools;
      if(tools.length > 0){
        this.hasToolResult = true;
      }
      else {
        this.hasToolResult = false;
      }
  
      if(this.showAll === false){
        this.showAll = true;
      }
      else {
        this.showAll = false;
      }

    },
     openLink(link) {
    window.open(link, "_blank");
  },
  },
  computed: {
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

.toolResultsContainer{
  display:flex;
}

.tool {
  p{
    margin:0;
    font-weight: bold;
    font-size: 16px;
  }
  padding:20px;
  text-align: left;
  background: white;
  color:black;
  margin: 5px;

  width:100%;
  border-radius:5px;
  &:hover {
    cursor: pointer;
    background:#5ACEA7;
    color:white;
  }
}

#noresults {
  padding: 10px;
  font-size: 20px;
  text-align: left;
  margin:0;
}
</style>