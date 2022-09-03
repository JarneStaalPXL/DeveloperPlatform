<template>
  <div>
    <n-config-provider :hljs="hljs">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-dialog-provider>
              <RadialGradientBackgroundGenerator />
            </n-dialog-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </div>
</template>

<script>
import {
  NConfigProvider,
  darkTheme,
  NMessageProvider,
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
} from "naive-ui";
import WebsiteBuilder from "@/components/WebsiteBuilder.vue";
import RadialGradientBackgroundGenerator from "@/components/HomeViewComponents/GradientGenerators/RadialGradientBackgroundGenerator.vue";
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
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
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
