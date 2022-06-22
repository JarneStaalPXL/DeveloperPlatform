<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-message-provider>
        <WebsiteBuilder />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { darkTheme, NMessageProvider, NConfigProvider } from "naive-ui";
import WebsiteBuilder from "@/components/WebsiteBuilder.vue";
export default {
  components: {
    WebsiteBuilder,
    NMessageProvider,
    NConfigProvider,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style>
</style>