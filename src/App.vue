<template>
  <n-config-provider :theme="darkTheme"> </n-config-provider>

  <router-view />
</template>


<script>
import { NButton, NSpace, NConfigProvider, darkTheme, NCard } from "naive-ui";
export default {
  name: "TemplateDesigner",
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
