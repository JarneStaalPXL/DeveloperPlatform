<template>
  <n-config-provider :theme="darkTheme">
    <div id="bottom-sticky-button">
      <n-button
        class="w-100 bg-dark"
        v-if="$route.path !== '/'"
        @click="$router.push('/')"
      >
        Go back to dashboard</n-button
      >
    </div>
  </n-config-provider>

  <router-view />
</template>


<script>
import { NButton, NSpace, NConfigProvider, darkTheme, NCard } from "naive-ui";
export default {
  name: "TemplateDesigner",
  mounted() {
    console.log(this.$route.path);
  },
  components: {
    NButton,
    NSpace,
    NConfigProvider,
    NCard,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
#bottom-sticky-button {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
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
