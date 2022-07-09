<template>
    <n-config-provider :theme="darkTheme">
        <n-message-provider>
            <ColorPalletGenerator />
        </n-message-provider>
    </n-config-provider>
</template>

<script>
import { darkTheme, NConfigProvider, NMessageProvider } from "naive-ui";
import ColorPalletGenerator from '@/components/HomeViewComponents/ColorGenerators/ColorPalletGenerator.vue'
export default {
    components: {
        ColorPalletGenerator,
        NConfigProvider, NMessageProvider
    },
    setup() {
        return {
            darkTheme
        }
    }
}
</script>

<style>
</style>