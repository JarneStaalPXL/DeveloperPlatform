<template>
  <n-config-provider :theme="null">
    <n-message-provider>
      <ColorLightenerDarker />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider, NMessageProvider } from "naive-ui";
import ColorLightenerDarker from "@/components/HomeViewComponents/ColorGenerators/ColorLightenerDarker.vue";
export default {
  components: {
    ColorLightenerDarker,
    NConfigProvider,
    NMessageProvider,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style></style>
