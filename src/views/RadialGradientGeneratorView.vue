<template>
  <div>
    <n-config-provider :hljs="hljs" :theme="darkTheme">
      <n-message-provider>
        <RadialGradientBackgroundGenerator />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { NConfigProvider, darkTheme, NMessageProvider } from "naive-ui";
import WebsiteBuilder from "@/components/WebsiteBuilder.vue";
import RadialGradientBackgroundGenerator from "@/components/RadialGradientBackgroundGenerator.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
// @ is an alias to /src
export default {
  name: "RadialGradientGeneratorView",
  components: {
    WebsiteBuilder,
    RadialGradientBackgroundGenerator,
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
