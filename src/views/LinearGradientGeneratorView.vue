<template>
  <div>
    <n-config-provider :hljs="hljs" :theme="null">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-dialog-provider>
              <LinearGradientBackgroundGenerator />
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
import LinearGradientBackgroundGenerator from "@/components/HomeViewComponents/GradientGenerators/LinearGradientBackgroundGenerator.vue";
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
