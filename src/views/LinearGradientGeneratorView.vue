<template>
  <div>
    <n-config-provider :hljs="hljs" :theme="darkTheme">
      <n-message-provider>
        <LinearGradientBackgroundGenerator />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { NConfigProvider, darkTheme, NMessageProvider } from "naive-ui";
import WebsiteBuilder from "@/components/WebsiteBuilder.vue";
import LinearGradientBackgroundGenerator from "@/components/LinearGradientBackgroundGenerator.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
// @ is an alias to /src
export default {
  name: "LinearGradientGeneratorView",
  components: {
    WebsiteBuilder,
    LinearGradientBackgroundGenerator,
    NConfigProvider,
    NMessageProvider,
  },
  mounted() {
    document.addEventListener("contextmenu", (e) => {});
  },
  setup() {
    return {
      hljs,
      darkTheme,
    };
  },
};
</script>
