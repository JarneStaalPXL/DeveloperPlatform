<template>
  <n-config-provider :theme="darkTheme">
    <a
      @click="scrollToTop()"
      v-if="$route.path !== '/' && isScrollingUp === false"
      class="float2"
    >
      <i class="fa-solid fa-arrow-up my-float"></i>
    </a>
    <a
      @click="scrollToBottom()"
      v-if="$route.path !== '/' && isScrollingUp === true"
      class="float2"
    >
      <i class="fa-solid fa-arrow-down my-float"></i> </a
  ></n-config-provider>

  <div class="content">
    <router-link to="/" v-if="$route.path !== '/'" class="float">
      <i class="fa-solid fa-house my-float"></i
    ></router-link>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </transition>
    </router-view>
  </div>
</template>


<script>
import { NButton, NSpace, NConfigProvider, darkTheme, NCard } from "naive-ui";
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
  },
  methods: {
    scrollToTop() {
      console.log(document.body.scrollHeight);
      window.scrollTo(0, 0);
    },
    scrollToBottom() {
      console.log(document.body.scrollHeight);
      window.scrollTo(0, document.body.scrollHeight);
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
.float2 {
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
}
</style>
