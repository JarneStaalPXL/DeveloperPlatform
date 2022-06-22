<template>
  <n-config-provider :theme="darkTheme">
    <n-card>
      <n-space horizontal class="d-flex justify-content-center">
        <n-button @click="$router.push('/LinearGradientGenerator')">Linear Gradient Generator</n-button>
        <n-button @click="$router.push('/RadialGradientGenerator')">Radial Gradient Generator</n-button>
        <!-- <n-button @click="$router.push('/WebsiteBuilder')"
          >Website Builder</n-button
        > -->
      </n-space>
    </n-card>
  </n-config-provider>

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

* {
  font-family: "Poppins", sans-serif;
}
</style>
