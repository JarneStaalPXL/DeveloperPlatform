<template>
  <n-config-provider>
    <n-message-provider>
      <ColorPalleteGenerator />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider, NMessageProvider } from "naive-ui";
import ColorPalleteGenerator from "@/components/HomeViewComponents/ColorGenerators/ColorPalleteGenerator.vue";
export default {
  components: {
    ColorPalleteGenerator,
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
