<template>
  <a @click="scrollToTop()" v-if="$route.path !== '/' && isScrollingUp === false" class="float2">
    <i class="fa-solid fa-arrow-up my-float"></i>
  </a>
  <a @click="scrollToBottom()" v-if="$route.path !== '/' && isScrollingUp === true" class="float2">
    <i class="fa-solid fa-arrow-down my-float"></i>
  </a>
  <a v-if="!$store.state.isLoggedIn" @click="googleSignin()" class="float3">
    <i class="fa-brands fa-google my-float"></i>
  </a>
  <a @click="handleSignout()" class="float3" v-else>
    <i class="fa-solid fa-right-from-bracket my-float"></i>
  </a>

  <div class="content">
    <router-link to="/" v-if="$route.path !== '/'" class="float">
      <i class="fa-solid fa-house my-float"></i>
    </router-link>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
      </transition>
    </router-view>
  </div>
</template>


<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NButton, NSpace, NConfigProvider, darkTheme, NCard } from "naive-ui";
export default {
  name: "TemplateDesigner",
  mounted() { },
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
          this.$store.commit("setUserData", { user: result.user });
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
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
#bottom-sticky-button {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
}

.float,
.float2,
.float3 {
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
  z-index: 99999;
}

.float2 {
  bottom: 20px;
}

.my-float {
  margin-top: 22px;
  color: black;
}

.float3 {
  bottom: 170px;
}

a:hover {
  cursor: pointer;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

body {
  background-color: #18181c;
}

* {
  font-family: "Poppins", sans-serif;
  //Set cursor image
  // cursor: url("./assets/cursor.svg"), default;
}
</style>
