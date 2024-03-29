<template>
  <n-loading-bar-provider>
    <div class="content">
      <n-config-provider :theme="$store.state.colorMode === 'Light' ? null : darkTheme">
        <!--MODALS-->
        <n-loading-bar-provider>
          <n-notification-provider
            :max="1"
            :placement="$store.state.notificationPlacement"
          >
            <n-message-provider>
              <FeedbackComponent v-model:show="$store.state.showFeedbackPopup" />
              <InfoComponent v-model:show="$store.state.showInfoModal" />
              <UserProjectCreateComponent
                v-model:show="$store.state.showUserProjectCreateModal"
              />
              <LoadingAnimationComponent :show="$store.state.showLoadingAnimation" />
            </n-message-provider>
          </n-notification-provider>
        </n-loading-bar-provider>
        <!---->
        <n-layout>
          <n-layout-header bordered class="mobileNav desktopNav">
            <section class="d-flex justify-content-between">
              <section class="logotitleSection">
                <a @click="$router.push('/')">
                  <img
                    src="@/assets/faviconpic.png"
                    alt="Developer Platform"
                    class="logo"
                /></a>
                <n-h4 id="siteTitleNavbar">{{
                  $route.path !== "/" ? "Developer Platform" : ""
                }}</n-h4>
              </section>
              <section class="justify-content-end">
                <n-menu
                  mode="horizontal"
                  :options="menuOpts"
                  @update:value="openLinkFromNav"
                  :value="navMenu"
                />
                <SearchComponent
                  :style="{
                    width: '300px',
                    height: '35px',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: '50px',
                  }"
                  class="desktopSearch"
                />
              </section>
            </section>
            <n-popover
              placement="bottom-end"
              trigger="click"
              style="max-height: 500px"
              scrollable
            >
              <template #trigger>
                <n-icon size="30" class="mobileMenu">
                  <menu-hamburger-icon />
                </n-icon>
              </template>
              <div class="large-text">
                <n-menu
                  accordion
                  :style="{ height: '95%' }"
                  @update:value="openLink"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="mobileCategories"
                />
              </div>
            </n-popover>
          </n-layout-header>
          <n-layout has-sider>
            <n-layout-sider
              class="layoutSider"
              :collapsed="$store.state.verticalMenuCollapsed"
              @collapse="$store.state.verticalMenuCollapsed = true"
              @expand="$store.state.verticalMenuCollapsed = false"
              bordered
              show-trigger
              collapse-mode="width"
              :collapsed-width="64"
              :width="265"
              :native-scrollbar="false"
              style="min-height: 320px"
            >
              <n-menu
                class="categoryMenu"
                accordion
                :style="{ height: '95%' }"
                @update:value="openLinkFromCategory"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="categoryOptions"
                v-model:value="categoryMenu"
              />
              <n-menu
                :value="feedbackMenu"
                accordion
                @update:value="openLink"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="extraOptions"
              />
            </n-layout-sider>
            <n-layout-content ref="contentRef">
              <n-loading-bar-provider>
                <n-notification-provider
                  :max="1"
                  :placement="$store.state.notificationPlacement"
                >
                  <n-message-provider>
                    <router-view v-slot="{ Component, route }">
                      <transition type="transition" name="fade" mode="out-in">
                        <component
                          :is="Component"
                          :key="route.meta.usePathKey ? route.path : undefined"
                        />
                      </transition>
                    </router-view>
                  </n-message-provider>
                </n-notification-provider>
              </n-loading-bar-provider>
            </n-layout-content>
          </n-layout>
        </n-layout>
      </n-config-provider>
    </div>
  </n-loading-bar-provider>
</template>

<script>
import { h, ref } from "vue";
import {
  PersonOutline as PersonIcon,
  HomeOutline as HomeIcon,
  HeartOutline as HeartIcon,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
  BookOutline as BookIcon,
  Menu as MenuHamburgerIcon,
  Information as InfoIcon,
} from "@vicons/ionicons5";
import { World as WorldIcon, Api as ApiIcon } from "@vicons/tabler";
import { Gradient as GradientIcon, CloudApp as HostingIcon } from "@vicons/carbon";
import {
  Color24Regular as ColorIcon,
  PersonFeedback16Regular as FeedbackIcon,
  FolderArrowUp24Regular as FileIcon,
} from "@vicons/fluent";
import { Font as FontIcon } from "@vicons/fa";
import SearchComponent from "./components/GlobalComponents/SearchComponent.vue";
import FeedbackComponent from "./components/GlobalComponents/FeedbackComponent.vue";
import InfoComponent from "./components/GlobalComponents/InfoComponent.vue";
import UserProjectCreateComponent from "./components/GlobalComponents/UserProjectCreateComponent.vue";
import LoadingAnimationComponent from "./components/GlobalComponents/LoadingAnimationComponent.vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

//export reference to contentRef

import { ProjectOutlined as ProjectIcon } from "@vicons/antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  NButton,
  NSpace,
  NConfigProvider,
  darkTheme,
  NCard,
  NNotificationProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NTooltip,
  NIcon,
  NLayoutContent,
  NDropdown,
  NInput,
  NSwitch,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NLayoutFooter,
  NP,
  NPopover,
  NH4,
} from "naive-ui";
export default {
  name: "TemplateDesigner",
  data() {
    return {
      feedbackMenu: null,
      navMenu: null,
      categoryMenu: null,
      isLoggedIn: false,
      showMobileToolCategoriesPopover: false,
      collapsed: false,
      isScrollingDown: false,
      switchIsChecked: false,
      isScrollingUp: false,
      lastScrollY: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  components: {
    LoadingAnimationComponent,
    UserProjectCreateComponent,
    NButton,
    NSpace,
    NConfigProvider,
    NCard,
    NNotificationProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NTooltip,
    NIcon,
    NDropdown,
    NInput,
    NSwitch,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    NLayoutFooter,
    NLayoutContent,
    NPopover,
    NP,
    MenuHamburgerIcon,
    SearchComponent,
    FeedbackComponent,
    InfoComponent,
    NH4,
    InfoIcon,
    FontIcon,
    FileIcon,
    ProjectIcon,
    ApiIcon,
  },
  methods: {
    checkIfOnMobile() {
      if (window.innerWidth <= 768) {
        this.$store.commit("setVerticalMenuCollapsed", true);
      } else {
        this.$store.commit("setVerticalMenuCollapsed", false);
      }
    },
    colorCheck() {
      if (this.$store.state.colorMode.includes("Dark")) {
        this.switchIsChecked = true;
        return true;
      }

      if (this.$store.state.colorMode.includes("Light")) {
        this.switchIsChecked = false;
        return false;
      }

      this.switchIsChecked = true;
      return true;
    },
    handleColorChange(value) {
      if (value === true) {
        this.$store.dispatch("UPDATE_COLOR_MODE", "Dark");
      } else {
        this.$store.dispatch("UPDATE_COLOR_MODE", "Light");
      }
    },
    openLink(link) {
      if (link === "colormode") {
        this.handleColorChange(
          this.$store.state.colorMode.includes("Dark") ? false : true
        );
        return;
      }
      if (link === "logout") {
        this.signOutUser();
        return;
      }
      if (link === "feedback") {
        this.$store.commit("setShowFeedbackModal", true);
        return;
      }
      if (link === "info") {
        this.$store.commit("setShowInfoModal", true);
        return;
      }
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    openLinkFromNav(link) {
      if (link === "colormode") {
        this.handleColorChange(
          this.$store.state.colorMode.includes("Dark") ? false : true
        );
        return;
      }
      if (link === "logout") {
        this.signOutUser();
        return;
      }
      if (link === "feedback") {
        this.$store.commit("setShowFeedbackModal", true);
        return;
      }

      if (link === "createProject") {
        this.$store.commit("setShowUserProjectCreateModal", true);
        return;
      }

      if (link === "allProjects") {
        this.$router.push("/projects");
        return;
      }
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");

      let opt = this.menuOpts.filter((option) => option.key === link)[0];

      if (opt !== undefined) {
        this.navMenu = opt.key;
      }

      if (opt === undefined || opt.length === 0) {
        this.navMenu = "profile";
      }
      this.categoryMenu = null;
    },
    openLinkFromCategory(link) {
      if (link === "logout") {
        this.signOutUser();
        return;
      }
      if (link === "feedback") {
        this.$store.commit("setShowFeedbackModal", true);
        return;
      }
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");

      // this.categoryMenu = this.categoryOptions.find((option) => option.key === link).link;
      this.navMenu = null;
    },
    userName() {
      return localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : undefined;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },

    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
    },
    async isAdmin() {
      let isAdmin = await this.$store.dispatch("IS_ADMIN", localStorage.getItem("uid"));
      return isAdmin;
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
    async googleSignin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          await this.$store.dispatch("CREATE_ACCOUNT", result.user);
          await this.$store.dispatch("GET_PAGE_VISITS");
          await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          await this.$store.dispatch("IS_ADMIN", localStorage.getItem("uid"));
          //show notification

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
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    signOutUser() {
      signOut(window.$auth).then(() => {
        this.$store.commit("removeUserData");
        this.$store.commit("setIsAdmin", false);
        this.$router.push("/");

        window.$notification.destroyAll();
        window.$notification.info({
          title: "You have been logged out",
          content:
            "You can log in again if you want to use the full functionality of the platform.",
          duration: 3000,
        });
      });
    },
  },
  computed: {
    mobileCategories() {
      return [
        {
          label: "Global Tools",
          key: "/globalfrontendtools",
          icon: renderIcon(WorldIcon),
        },
        {
          label: "Gradient Tools",
          key: "/gradientgenerators",
          icon: renderIcon(GradientIcon),
        },
        {
          label: "Color Tools",
          key: "/colorgenerators",
          icon: renderIcon(ColorIcon),
        },
        {
          label: "Fonts",
          key: "/fonts",
          icon: renderIcon(FontIcon),
        },
        {
          label: "Hosting Providers",
          key: "/hostingproviders",
          icon: renderIcon(HostingIcon),
        },
        {
          label: "APIs",
          key: "/apis",
          icon: renderIcon(ApiIcon),
        },
        {
          label: "Learning Tools",
          key: "/learningtools",
          icon: renderIcon(BookIcon),
        },
        {
          label: "File Converters",
          key: "/fileconverters",
          icon: renderIcon(FileIcon),
          disabled: true,
        },
      ];
    },
    extraOptions() {
      return [
        {
          label: "Info",
          key: "info",
          icon: renderIcon(InfoIcon),
        },
        {
          label: "Feedback",
          key: "feedback",
          icon: renderIcon(FeedbackIcon),
        },
      ];
    },
    categoryOptions() {
      return [
        {
          label: "Global Tools",
          key: "/globalfrontendtools",
          icon: renderIcon(WorldIcon),
        },
        {
          label: "Gradient Tools",
          key: "/gradientgenerators",
          icon: renderIcon(GradientIcon),
          children: [
            {
              label: "All Gradient Tools",
              key: "/gradientgenerators",
            },
            {
              label: "Linear Gradient Generator",
              key: "/lineargradientgenerator",
            },
            {
              label: "Radial Gradient Generator",
              key: "/radialgradientgenerator",
            },
          ],
        },
        {
          label: "Color Tools",
          key: "/colorgenerators",
          icon: renderIcon(ColorIcon),
          children: [
            {
              label: "All Color Tools",
              key: "/colorgenerators",
            },
            {
              label: "Color Lightener/Darker",
              key: "/colorlightenerdarker",
            },
            {
              label: "Color Pallete Generator",
              key: "/colorPalleteGenerator",
            },
          ],
        },
        {
          label: "Fonts",
          key: "/fonts",
          icon: renderIcon(FontIcon),
        },
        {
          label: "Hosting Providers",
          key: "/hostingproviders",
          icon: renderIcon(HostingIcon),
        },
        {
          label: "APIs",
          key: "/apis",
          icon: renderIcon(ApiIcon),
        },
        {
          label: "Learning Tools",
          key: "/learningtools",
          icon: renderIcon(BookIcon),
        },
        {
          label: "File Converters",
          key: "/fileconverters",
          icon: renderIcon(FileIcon),
          disabled: true,
        },
      ];
    },
    menuOpts() {
      return [
        {
          label: "Home",
          key: "/",
          icon: renderIcon(HomeIcon),
        },
        {
          label: "Favorites",
          key: "/favorites",
          icon: renderIcon(HeartIcon),
        },
        {
          label: "Profile",
          key: "profile",
          show: this.$store.state.isLoggedIn,
          //set show property depending if user is logged in
          // show: () => this.$store.state.isLoggedIn,

          // icon: renderIcon(BookIcon),
          icon: renderIcon(PersonIcon),
          children: [
            {
              label: "Profile",
              key: "profile",
              icon: renderIcon(UserIcon),
            },
            {
              label: "Projects",
              key: "projects",
              icon: renderIcon(ProjectIcon),
              children: [
                {
                  label: "All projects",
                  key: "allProjects",
                },
                {
                  label: "Create project",
                  key: "createProject",
                  // icon: renderIcon(UserIcon),
                },
              ],
            },
            {
              label: "Switch mode",
              key: "colormode",
              icon: renderIcon(ColorIcon),
            },
            {
              label: "Logout",
              key: "logout",
              icon: renderIcon(LogoutIcon),
            },
          ],
        },
        {
          label: "Profile",
          key: "profile",
          show: !this.$store.state.isLoggedIn,
          icon: renderIcon(PersonIcon),
          children: [
            {
              label: "Login",
              key: "login",
              icon: renderIcon(PersonIcon),
            },
            {
              label: "Register",
              key: "register",
              icon: renderIcon(PersonIcon),
            },
            {
              label: "Switch mode",
              key: "colormode",
              icon: renderIcon(ColorIcon),
            },
          ],
        },
      ];
    },
    getLogInStatus() {
      return this.$store.state.isLoggedIn;
    },
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
  async beforeMount() {
    await this.$store.dispatch("FILL_ALL_TOOLS_ARRAY");
    if (localStorage.getItem("uid") !== null) {
      this.$store.dispatch("LOAD_USER_SAVED_DATA", localStorage.getItem("uid"));
      //get user favorite tools
      await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
      //set color mode
      await this.$store.dispatch("GET_USER_COLOR_MODE");
    }
    if (localStorage.getItem("favTools") === null) {
      localStorage.setItem("favTools", JSON.stringify([]));
    }
    this.checkIfOnMobile();
    this.setTime();
  },
  async mounted() {
    window.$auth = getAuth();
    onAuthStateChanged(window.$auth, (user) => {
      if (user !== null) {
        this.isLoggedIn = !!user;
        this.$store.state.isLoggedIn = this.isLoggedIn;
      }
    });
    document.addEventListener("scroll", () => {
      //Check if scrollY is decreasing
      if (window.scrollY < this.lastScrollY) {
        this.isScrollingUp = false;
      } else {
        this.isScrollingUp = true;
      }
      this.lastScrollY = window.scrollY;
    });

    window.$scrollContent = this.contentRef;
  },
  setup() {
    const contentRef = ref(null);
    return {
      inverted: ref(false),
      darkTheme,
      contentRef,

      handleSelect(key) {
        console.log(String(key));
      },
    };
  },
};
</script>

<style>
.n-card.n-card--bordered {
  text-align: center !important;
}
.n-layout-content {
  height: calc(100vh - 69px);
}
*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.n-scrollbar-content {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}
</style>

<style lang="scss">
// .content {
//   height: 100vh;
// }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // color: white;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// body {
//   background-color: #18181c;
// }

* {
  // font-family: "Poppins", sans-serif;

  // font-family: "DynaPuff", cursive;
  font-family: "Titillium Web", sans-serif;
  //Set cursor image
  // cursor: url("./assets/cursor.svg"), default;
}

.n-drawer.n-drawer--right-placement.n-drawer--native-scrollbar {
  z-index: 13 !important;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  &:hover {
    cursor: text;
  }
}
::selection {
  background: rgba(130, 250, 108, 0.3);
  color: black;
  cursor: text;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 25px;
}

@media only screen and (max-width: 980px) {
  .n-layout-content {
    height: calc(100vh - 53px);
  }
}
</style>

<style lang="scss" scoped>
.desktopNav {
  padding: 13px;
  section {
    // margin-left: 150px;
  }
}
.actionButtonContainer {
  button {
    color: white;
  }
}

#siteTitleNavbar {
  margin-top: auto;
  margin-bottom: auto;
  text-align: left;
  font-size: 23px;
  // color: #2acf97;
}
.logotitleSection {
  display: flex;
  margin-left: 13px;
}
@media only screen and (max-width: 999px) {
  .logotitleSection {
    img {
      display: none !important;
    }
  }
  #siteTitleNavbar {
    display: none;
  }
  .desktopNav {
    padding: 5px;
    section {
      margin-left: 0px;
    }
  }
  .desktopSearch {
    display: none;
  }
  .mobileNav {
    display: flex;
    justify-content: center;
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
@media only screen and (min-width: 650px) {
  .mobileMenu {
    display: none !important;
  }
}
@media only screen and (max-width: 650px) {
  .layoutSider {
    display: none !important;
  }
  .allItemsFooter {
    button {
      width: 200px !important;
    }
  }
}
#welcomeMsg {
  margin-top: auto;
  margin-bottom: auto;
  color: white;
}
.allItemsFooter {
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 85vw;
  button {
    color: white;
    width: inherit;
  }
}
.stickyFooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: #24242a;
  z-index: 10;
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

// .stickyFooter {
//   display: flex;
//   justify-content: space-between;
//   gap: 25px;
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background: #24242a;
//   text-align: center;
//   padding: 20px;
//   z-index: 999;

//   button {
//     color: white;
//   }
// }

#bottom-sticky-button {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
}

.float,
.float2,
.float3,
.float4 {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 95px;
  right: 40px;
  background-color: white;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  z-index: 2000;
}

.float4 {
  bottom: 169px;
}

.float2 {
  bottom: 20px;
}

.my-float {
  margin-top: 22px;
  color: black;
}

.float3 {
  bottom: 245px;
}

a:hover {
  cursor: pointer;
}
</style>
