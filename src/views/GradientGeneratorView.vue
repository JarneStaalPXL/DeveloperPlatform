<template>
  <div>
    <n-config-provider :hljs="hljs" :theme="darkTheme">
      <n-message-provider>
        <GradientBackgroundGenerator />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { NConfigProvider, darkTheme, NMessageProvider } from "naive-ui";
import WebsiteBuilder from "@/components/WebsiteBuilder.vue";
import GradientBackgroundGenerator from "@/components/GradientBackgroundGenerator.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
// @ is an alias to /src
export default {
  name: "GradientGeneratorView",
  components: {
    WebsiteBuilder,
    GradientBackgroundGenerator,
    NConfigProvider,
    NMessageProvider,
  },
  mounted() {
    document.addEventListener("contextmenu", (e) => {
      console.log(e);
    });
  },
  setup() {
    return {
      hljs,
      darkTheme,
    };
  },
};
</script>
