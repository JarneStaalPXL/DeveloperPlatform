<template>
    <n-space vertical>
        <n-card>
            <n-space :style="{ display: 'block' }">
                <div class="colorPalletGenerator d-flex justify-content-between" style="gap:25px;">
                    <n-card class="w-50" title="Color lighter/darkener">
                        <n-color-picker v-model:value="color" :modes="['hex']" placeholder="Enter a color">
                        </n-color-picker>
                        <n-input-number v-model:value="shadePercentage" placeholder="Enter amount ">
                            <template #suffix>
                                %
                            </template>
                        </n-input-number>

                        <n-space class="p-3 d-flex justify-content-between">
                            <n-radio :checked="checkedValue === 'Lighter'" value="Lighter" name="basic-demo"
                                @change="handleChange">
                                Lighter
                            </n-radio>
                            <n-radio :checked="checkedValue === 'Darker'" value="Darker" name="basic-demo"
                                @change="handleChange">
                                Darker
                            </n-radio>
                        </n-space>

                        <n-button class="w-100" @click="generateDarkOrLighterColor(color, shadePercentage)">Apply
                        </n-button>

                        <h4 class="mt-5 pb-3">Result</h4>
                        <n-color-picker v-model:value="shadedColor"></n-color-picker>

                    </n-card>
                    <n-card class="w-50" title="Color Pallet Generator">
                        <n-color-picker v-model:value="selectedColorForPallet" :modes="['hex']"
                            placeholder="Enter a color">
                        </n-color-picker>
                        <n-button class="w-100" @click="generateColorPallet()">Generate color pallet</n-button>
                    </n-card>

                </div>
            </n-space>
        </n-card>
    </n-space>

    <n-drawer v-model:show="showColorPalletDrawer" :width="'70%'" :height="200" :placement="'left'" closable
        :trap-focus="false">
        <n-drawer-content title="Color Pallet">
            <section id="colorPalletContent">
                <div v-for="color in colorPallet" :key="color" :style="{ background: color }" class="colorPalletItem">
                    <div class="d-flex justify-content-between w-100">
                        <p class="d-flex m-auto">{{ color }}</p>
                        <n-button :style="{ backgroundColor: '#2C2C32' }" class="m-2"
                            @click="copyHEXToClipboard(color)">Copy HEX</n-button>
                    </div>
                </div>
            </section>
        </n-drawer-content>
    </n-drawer>
</template>

<script>
import { ref } from "vue";
import { useMessage, NButton, NInput, NColorPicker, NCard, NSpace, NInputNumber, NRadio, NDrawer, NDrawerContent } from "naive-ui";
export default {
    components: {
        NButton, NInput, NColorPicker, NCard, NSpace, NInputNumber, NRadio, NDrawer, NDrawerContent
    },
    data() {
        return {
            color: "#A700EEFF",
            selectedColorForPallet: "#A700EEFF",
            shadedColor: undefined,
            shadePercentage: undefined,
            showColorPalletDrawer: false,
            lighter: false,
            colorPallet: []
        }
    },
    mounted() {
        window.$message = useMessage();
    },
    methods: {
        copyHEXToClipboard(color) {
            navigator.clipboard.writeText(color);
            window.$message.success('HEX Copied to clipboard');
        },
        generateDarkOrLighterColor(color, shadePercentage) {
            let shadeColor = this.shadeColor(color, shadePercentage);
            this.shadedColor = shadeColor;
        },
        generateColorPallet() {
            let colors = [];;
            for (let i = 0; i < 10; i++) {
                let color = this.shadeColor(this.selectedColorForPallet, i * 10);
                colors.push(color);
            }

            this.colorPallet = colors.filter((item, index) => colors.indexOf(item) === index);
            this.showColorPalletDrawer = true;
        },
        shadeColor(hexColor, percent) {
            if (this.checkedValue === "Darker") {
                //turn percent negative
                percent = -percent;
            }
            if (this.checkedValue === "Lighter") {
                //turn percent positive
                percent = percent;
            }
            var R = parseInt(hexColor.substring(1, 3), 16);
            var G = parseInt(hexColor.substring(3, 5), 16);
            var B = parseInt(hexColor.substring(5, 7), 16);

            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);

            R = (R < 255) ? R : 255;
            G = (G < 255) ? G : 255;
            B = (B < 255) ? B : 255;

            var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
            var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
            var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

            return "#" + RR + GG + BB;
        },
    },
    setup() {
        const checkedValueRef = ref(null);
        return {
            checkedValue: checkedValueRef,
            handleChange(e) {
                checkedValueRef.value = e.target.value;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.colorPalletItem {
    height: 50px;
    display: flex;
}

#colorPalletContent {
    border-radius: 5px;
    justify-content: space-evenly;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>