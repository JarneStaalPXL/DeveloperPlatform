<template>
  <div>
    <n-config-provider :hljs="hljs" :theme="null">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider :max="3">
            <n-dialog-provider>
              <DOMAnalyzer />
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
import DOMAnalyzer from "@/components/HomeViewComponents/SEO/DOMAnalyzer.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
// @ is an alias to /src
export default {
  name: "DOMAnalyzerView",
  components: {
    NConfigProvider,
    NMessageProvider,
    NLoadingBarProvider,
    NDialogProvider,
    DOMAnalyzer,
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
