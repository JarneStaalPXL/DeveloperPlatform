<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
    :style="
      $store.state.selectedLinearGradient !== {}
        ? 'background: ' +
          $store.state.selectedLinearGradient.gradientLayout +
          '-gradient(' +
          $store.state.selectedLinearGradient.gradientPositioning +
          ',' +
          $store.state.selectedLinearGradient.color1 +
          ',' +
          $store.state.selectedLinearGradient.color2 +
          ')'
        : ''
    "
  >
    <div
      class="d-flex flex-column justify-content-center textcontainer p-4"
      style="gap: 25px"
    >
      <n-config-provider :theme="darkTheme">
        <code
          id="codeField"
          style="font-size: 23px !important; color: white !important"
        >
          {{
            "background: " +
            $store.state.selectedLinearGradient.gradientLayout +
            "-gradient(" +
            $store.state.selectedLinearGradient.gradientPositioning +
            "," +
            $store.state.selectedLinearGradient.color1 +
            "," +
            $store.state.selectedLinearGradient.color2 +
            ")"
          }}</code
        >

        <n-button class="w-100 mt-4" strong secondary @click="copyCSS()"
          >Copy</n-button
        >
      </n-config-provider>
    </div>
  </div>
</template>

<script>
import {
  NCard,
  NConfigProvider,
  darkTheme,
  NCode,
  NButton,
  useMessage,
} from "naive-ui";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);

export default {
  components: {
    NCard,
    NConfigProvider,
    NCode,
    NButton,
  },
  beforeMount() {
    window.$message = useMessage();
  },
  methods: {
    copyCSS() {
      /* Get the text field */
      var copyText = document.getElementById("codeField").innerText;
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);

      /* Alert the copied text */
      window.$message.success("CSS is copied to clipboard.");
    },
  },
  setup() {
    return {
      hljs,
      darkTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
.textcontainer {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.14);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border: 1px solid rgba(255, 255, 255, 0.19);
}
</style>

<style>
.n-card-header__main {
  color: white !important;
}
</style>