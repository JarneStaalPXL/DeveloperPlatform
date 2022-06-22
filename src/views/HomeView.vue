<template>
  <div class="mt-3">
    <!-- <DisplayModel /> -->
    <n-config-provider :hljs="hljs" :theme="darkTheme">
      <n-message-provider>
        <HeaderTemplateDesigner />
        <TemplateDesigner />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { NConfigProvider, darkTheme, NMessageProvider } from "naive-ui";
import DisplayModel from "@/components/DisplayModel.vue";
import TemplateDesigner from "@/components/TemplateDesigner.vue";
import HeaderTemplateDesigner from "@/components/HeaderTemplateDesigner.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("css", css);
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    DisplayModel,
    TemplateDesigner,
    NConfigProvider,
    NMessageProvider,
    HeaderTemplateDesigner,
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
