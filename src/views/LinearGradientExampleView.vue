<template>
  <n-config-provider :theme="darkTheme" :hljs="hljs">
    <n-message-provider>
      <LinearGradientExample />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
import LinearGradientExample from "@/components/LinearGradientExample.vue";

hljs.registerLanguage("css", css);
export default {
  components: {
    LinearGradientExample,
    NConfigProvider,
    NMessageProvider,
  },
  setup() {
    return {
      darkTheme,
      hljs,
    };
  },
};
</script>

<style>
</style>