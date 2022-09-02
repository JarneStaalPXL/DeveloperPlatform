<template>
  <!-- <n-tooltip trigger="hover" v-if="$route.path !== '/' && isScrollingUp === false">
    <template #trigger>
      <a @click="scrollToTop()" v-if="$route.path !== '/' && isScrollingUp === false" class="float2">
        <i class="fa-solid fa-arrow-up my-float"></i>
      </a>
    </template>
    Scroll to top
  </n-tooltip>
  <n-tooltip trigger="hover" v-if="$route.path !== '/' && isScrollingUp === true">
    <template #trigger>
      <a @click="scrollToBottom()" v-if="$route.path !== '/' && isScrollingUp === true" class="float2">
        <i class="fa-solid fa-arrow-down my-float"></i>
      </a>
    </template>
    Scroll to bottom
  </n-tooltip> -->

  <!-- <n-tooltip trigger="hover" v-if="!$store.state.isLoggedIn && $route.path === '/'">
    <template #trigger>
      <a @click="googleSignin()" class="float3">
        <i class="fa-brands fa-google my-float"></i>
      </a>
    </template>
    Log in
  </n-tooltip> -->

  <!-- <n-tooltip trigger="hover" v-if="$store.state.isLoggedIn && $route.path === '/'">
    <template #trigger>
      <a @click="handleSignout()" class="float3">
        <i class="fa-solid fa-right-from-bracket my-float"></i>
      </a>
    </template>
    Log out
  </n-tooltip>

  <n-tooltip trigger="hover" v-if="$route.path === '/'">
    <template #trigger>
      <a @click="$router.push('/favorites')" class="float4"
        ><i class="fa-solid fa-heart my-float"></i
      ></a>
    </template>
    Favorites
  </n-tooltip>

  <footer v-if="$route.path === '/'" class="stickyFooter">
    <section class="allItemsFooter">
      <section class="pagevisitscontainer">
        <h1 v-if="getPageVisits > 0">
          {{ getPageVisits }} <i class="fa-solid fa-eyes"></i>
        </h1>
      </section>
      <h5 id="welcomeMsg" v-if="$store.state.isLoggedIn">
        Welcome
        <a
          id="adminClickPointer"
          @click="$router.push($store.state.routings.adminPanel.path)"
          v-if="isAdmin()"
          >{{ userName() }}</a
        >
        <a v-else id="adminClickPointer">{{ userName() }}</a>
      </h5>
      <n-config-provider :theme="darkTheme" v-else>
        <n-button @click="$router.push('/login')">Log in</n-button>
        <n-button @click="$router.push('/register')" v-if="!store.state.isLoggedIn"
          >Sign up</n-button
        >
      </n-config-provider>
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
  <n-config-provider :theme="darkTheme" v-else class="stickyFooter actionButtonContainer">
    <n-button @click="$router.push('/favorites')" v-if="$route.path !== '/favorites'"
      >Favorites</n-button
    >
    <n-button @click="$router.push('/')" v-if="$route.path !== '/'">Home</n-button>
    <n-button
      @click="$router.push('/login')"
      v-if="!$store.state.isLoggedIn && $route.path !== '/login'"
      >Log in</n-button
    >
    <n-button
      @click="$router.push('/register')"
      v-if="!$store.state.isLoggedIn && $route.path !== '/register'"
      >Sign up</n-button
    >
    <n-button @click="handleSignout()" v-if="$store.state.isLoggedIn">Log out</n-button>
  </n-config-provider> -->

  <div class="content">
    <!-- <n-tooltip trigger="hover" v-if="$route.path !== '/'">
      <template #trigger>
        <router-link to="/" class="float">
          <i class="fa-solid fa-house my-float"></i>
        </router-link>
      </template>
      Go back to homepage
    </n-tooltip> -->

    <n-layout>
      <n-layout-header bordered>
        <!-- <n-button @click="$router.push('/')"
          ><i class="fa-solid fa-house"></i
          ><span style="padding-left: 8px">Home</span></n-button
        >
        <n-button @click="$router.push('/favorites')"
          ><i class="fa-solid fa-heart"></i
          ><span style="padding-left: 8px">Favorites</span></n-button
        > -->
        <n-menu mode="horizontal" :options="menuOptions" @update:value="openLink" />
        <n-button
          @click="$router.push('/login')"
          v-if="!$store.state.isLoggedIn && $route.path !== '/login'"
          >Log in</n-button
        >
        <n-button
          @click="$router.push('/register')"
          v-if="!$store.state.isLoggedIn && $route.path !== '/register'"
          >Sign up</n-button
        >
        <span v-if="$store.state.name" style="margin-right: 20px"
          >Welcome {{ $store.state.name }}</span
        >
        <n-button @click="handleSignout()" v-if="$store.state.isLoggedIn"
          >Log out</n-button
        >
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          style="min-height: 320px"
        >
          <n-menu
            @update:value="openLink"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="categoryOptions"
          />
        </n-layout-sider>
        <n-layout-content>
          <n-loading-bar-provider>
            <n-notification-provider
              :max="1"
              :placement="$store.state.notificationPlacement"
            >
              <n-message-provider>
                <router-view v-slot="{ Component, route }">
                  <transition type="transition" name="fade" mode="out-in">
                    <component
                      :style="{ marginBottom: '5rem' }"
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
      <!-- 
      <n-layout-footer :inverted="inverted" bordered>
        Footer Footer Footer
      </n-layout-footer> -->
    </n-layout>
  </div>
</template>

<script>
import { h, defineComponent, ref } from "vue";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  HeartOutline as HeartIcon,
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
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
  // {
  //   label: "Login",
  //   key: "/login",
  //   icon: renderIcon(PersonIcon),
  // },
  // {
  //   label: "Register",
  //   key: "/register",
  //   icon: renderIcon(PersonIcon),
  // },
  // {
  //   label: "Favorites",
  //   key: "Dance Dance Dance",
  //   icon: renderIcon(BookIcon),
  //   children: [
  //     {
  //       type: "group",
  //       label: "People",
  //       key: "people",
  //       children: [
  //         {
  //           label: "Narrator",
  //           key: "narrator",
  //           icon: renderIcon(PersonIcon),
  //         },
  //         {
  //           label: "Sheep Man",
  //           key: "sheep-man",
  //           icon: renderIcon(PersonIcon),
  //         },
  //       ],
  //     },
  //     {
  //       label: "Beverage",
  //       key: "beverage",
  //       icon: renderIcon(WineIcon),
  //       children: [
  //         {
  //           label: "Whisky",
  //           key: "whisky",
  //         },
  //       ],
  //     },
  //     {
  //       label: "Food",
  //       key: "food",
  //       children: [
  //         {
  //           label: "Sandwich",
  //           key: "sandwich",
  //         },
  //       ],
  //     },
  //     {
  //       label: "The past increases. The future recedes.",
  //       key: "the-past-increases-the-future-recedes",
  //     },
  //   ],
  // },
];

const categoryOptions = [
  {
    label: "Global Frontend Tools",
    key: "/globalfrontendtools",
    icon: renderIcon(BookIcon),
  },
  {
    label: "Gradient Generators",
    key: "/gradientgenerators",
    icon: renderIcon(BookIcon),
    children: [
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
    label: "Color Generators",
    key: "/colorgenerators",
    icon: renderIcon(BookIcon),
    children: [
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
    label: "Hosting Providers",
    key: "/hostingproviders",
    icon: renderIcon(BookIcon),
  },
  // {
  //   label: "Favorites",
  //   key: "Dance Dance Dance",
  //   icon: renderIcon(BookIcon),
  //   children: [
  //     {
  //       type: "group",
  //       label: "People",
  //       key: "people",
  //       children: [
  //         {
  //           label: "Narrator",
  //           key: "narrator",
  //           icon: renderIcon(PersonIcon),
  //         },
  //         {
  //           label: "Sheep Man",
  //           key: "sheep-man",
  //           icon: renderIcon(PersonIcon),
  //         },
  //       ],
  //     },
  //     {
  //       label: "Beverage",
  //       key: "beverage",
  //       icon: renderIcon(WineIcon),
  //       children: [
  //         {
  //           label: "Whisky",
  //           key: "whisky",
  //         },
  //       ],
  //     },
  //     {
  //       label: "Food",
  //       key: "food",
  //       children: [
  //         {
  //           label: "Sandwich",
  //           key: "sandwich",
  //         },
  //       ],
  //     },
  //     {
  //       label: "The past increases. The future recedes.",
  //       key: "the-past-increases-the-future-recedes",
  //     },
  //   ],
  // },
];

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
} from "naive-ui";
export default {
  name: "TemplateDesigner",
  data() {
    return {
      isScrollingDown: false,
      isScrollingUp: false,
      lastScrollY: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  components: {
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
  },
  methods: {
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
  async beforeMount() {
    await this.$store.dispatch("FILL_ALL_TOOLS_ARRAY");
    if (localStorage.getItem("uid") !== null) {
      this.$store.dispatch("LOAD_USER_SAVED_DATA", localStorage.getItem("uid"));
    }
    if (localStorage.getItem("favTools") === null) {
      localStorage.setItem("favTools", JSON.stringify([]));
    }
    //get user favorite tools
    await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
    this.setTime();
  },
  mounted() {
    document.addEventListener("scroll", () => {
      //Check if scrollY is decreasing
      if (window.scrollY < this.lastScrollY) {
        this.isScrollingUp = false;
      } else {
        this.isScrollingUp = true;
      }
      this.lastScrollY = window.scrollY;
    });
  },
  setup() {
    return {
      inverted: ref(false),
      menuOptions,
      darkTheme,

      handleSelect(key) {
        console.log(String(key));
      },
    };
  },
};
</script>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      isLoggedIn.value = !!user;
      store.state.isLoggedIn = isLoggedIn.value;
    }
  });
});

const handleSignout = () => {
  signOut(auth).then(() => {
    store.commit("removeUserData");
    store.commit("setIsAdmin", false);
    router.push("/");
    window.$notification.destroyAll();
  });
};
</script>

<style>
.n-layout-content {
  height: calc(100vh - 70px);
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
  text-align: center;
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
</style>

<style lang="scss" scoped>
.actionButtonContainer {
  button {
    color: white;
  }
}
@media only screen and (max-width: 980px) {
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
