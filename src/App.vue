<template>
  <!-- <n-tooltip trigger="hover" v-if="$route.path !== '/' && isScrollingUp === false">
    <template #trigger>
      <a
        @click="scrollToTop()"
        v-if="$route.path !== '/' && isScrollingUp === false"
        class="float2"
      >
        <i class="fa-solid fa-arrow-up my-float"></i>
      </a>
    </template>
    Scroll to top
  </n-tooltip>
  <n-tooltip trigger="hover" v-if="$route.path !== '/' && isScrollingUp === true">
    <template #trigger>
      <a
        @click="scrollToBottom()"
        v-if="$route.path !== '/' && isScrollingUp === true"
        class="float2"
      >
        <i class="fa-solid fa-arrow-down my-float"></i>
      </a>
    </template>
    Scroll to bottom
  </n-tooltip>
-->
  <n-tooltip trigger="hover" v-if="!$store.state.isLoggedIn && $route.path === '/'">
    <template #trigger>
      <a @click="googleSignin()" class="float3">
        <i class="fa-brands fa-google my-float"></i>
      </a>
    </template>
    Log in with Google
  </n-tooltip>

  <n-tooltip trigger="hover" v-if="$store.state.isLoggedIn && $route.path === '/'">
    <template #trigger>
      <a @click="handleSignout()" class="float3">
        <i class="fa-solid fa-right-from-bracket my-float"></i>
      </a>
    </template>
    Log out
  </n-tooltip>

  <n-tooltip trigger="hover" v-if="$store.state.isLoggedIn && $route.path === '/'">
    <template #trigger>
      <a @click="$router.push('/favorites')" class="float4"
        ><i class="fa-solid fa-heart my-float"></i
      ></a>
    </template>
    Go to favorites
  </n-tooltip>
  <footer class="stickyFooter">
    <n-button
      @click="$router.push('/favorites')"
      v-if="$store.state.isLoggedIn && $route.path !== '/favorites'"
      >Go to favorites</n-button
    >
    <n-button @click="$router.push('/')" v-if="$route.path !== '/'"
      >Go back to homepage</n-button
    >
    <n-button @click="handleSignout()" v-if="$store.state.isLoggedIn">Log out</n-button>
  </footer>

  <div class="content">
    <!-- <n-tooltip trigger="hover" v-if="$route.path !== '/'">
      <template #trigger>
        <router-link to="/" class="float">
          <i class="fa-solid fa-house my-float"></i>
        </router-link>
      </template>
      Go back to homepage
    </n-tooltip> -->
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-message-provider>
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
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
  </div>
</template>

<script>
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
} from "naive-ui";
export default {
  name: "TemplateDesigner",
  mounted() {},
  data() {
    return {
      isScrollingDown: false,
      isScrollingUp: false,
      lastScrollY: 0,
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
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
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
          this.$store.dispatch("CREATE_ACCOUNT", result.user);
          this.$store.dispatch("GET_PAGE_VISITS");
          this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
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
  mounted() {
    if (localStorage.getItem("uid") !== null) {
      this.$store.dispatch("LOAD_USER_SAVED_DATA", localStorage.getItem("uid"));
    }
    if (localStorage.getItem("favTools") === null) {
      localStorage.setItem("favTools", JSON.stringify([]));
    }
    //get user favorite tools
    this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
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
      darkTheme,
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
  });
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.stickyFooter {
  display: flex;
  gap: 25px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: black;
  text-align: center;
  padding: 20px;
  z-index: 999;
  button {
    color: white;
  }
}
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

<style lang="scss">
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
  font-family: "DynaPuff", cursive;
  //Set cursor image
  // cursor: url("./assets/cursor.svg"), default;
}
</style>
