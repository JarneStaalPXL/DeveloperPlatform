<template>
    <n-space vertical>
        <n-card>
            <n-space :style="{ display: 'block' }">
                <div class="colorPalletGenerator d-flex justify-content-between" style="gap:25px;">
                    <n-card class="w-50" title="Color lighter/darkener">
                        <n-color-picker v-model:value="color" :modes="['hex']"
                            :on-complete="generateDarkOrLighterColor(color, shadePercentage)"
                            placeholder="Enter a color" :swatches="[
                                '#00FF78FF',
                                '#0076FFFF',
                                '#FF9D00FF',
                                '#FF0000FF',
                                '#A700EEFF',
                            ]" :show-preview="true">
                        </n-color-picker>


                        <n-radio-group @change="handleChange" name="radiobuttongroup1" class="d-flex mb-2">
                            <n-radio-button class="w-100" :value="'Lighter'" :label="'Lighter'" />
                            <n-radio-button class="w-100" :value="'Darker'" :label="'Darker'" />
                        </n-radio-group>


                        <n-input-number @keyup="generateDarkOrLighterColor(color, shadePercentage)"
                            v-model:value="shadePercentage" placeholder="Enter amount ">
                            <template #suffix>
                                %
                            </template>
                        </n-input-number>



                        <!-- <n-button class="w-100" @click="generateDarkOrLighterColor(color, shadePercentage)">Apply
                        </n-button> -->
                        <n-card title="Result" class="mt-3">
                            <n-color-picker v-model:value="shadedColor" :modes="['hex']" :show-preview="true" disabled>
                            </n-color-picker>
                            <n-button class="w-100" @click="copyHEXToClipboard(shadedColor)">Copy to clipboard
                            </n-button>
                        </n-card>
                        <!-- <h4 class="mt-5 pb-3">Result</h4>
                        <n-color-picker v-model:value="shadedColor" :modes="['hex']" :show-preview="true">
                        </n-color-picker> -->

                    </n-card>
                    <n-card class="w-50" title="Color Pallet Generator">
                        <n-color-picker v-model:value="selectedColorForPallet" :swatches="[
                            '#00FF78FF',
                            '#0076FFFF',
                            '#FF9D00FF',
                            '#FF0000FF',
                            '#A700EEFF',
                        ]" :modes="['hex']" :show-preview="true" placeholder="Enter a color">
                        </n-color-picker>
                        <n-button class="w-100" @click="generateColorPallet()">Generate color pallet</n-button>
                    </n-card>

                </div>
            </n-space>
        </n-card>

        <n-card title="Saved Color Pallets">
            <section>
                <n-card v-for="color of savedColorPallets" :key="color"
                    :title="'Color pallet' + ' build from HEX: ' + color[0]">
                    <div v-for="cl in color" :key="cl" :style="{ background: cl }" class="colorPalletItem">
                        <div class="d-flex justify-content-between w-100">
                            <p class="d-flex m-auto">{{ cl.toUpperCase() }}</p>
                            <n-button :style="{ backgroundColor: '#2C2C32' }" class="m-2"
                                @click="copyHEXToClipboard(cl)">Copy HEX</n-button>
                        </div>
                    </div>
                </n-card>
            </section>
        </n-card>
    </n-space>

    <n-drawer :style="{ minWidth: '500px' }" v-model:show="showColorPalletDrawer" :default-width="500"
        :placement="'left'" :trap-focus="false" resizable>
        <n-drawer-content title="Color Pallet" closable>
            <section id="colorPalletContent">
                <div v-for="color in colorPallet" :key="color" :style="{ background: color }" class="colorPalletItem">
                    <div class="d-flex justify-content-between w-100">
                        <p class="d-flex m-auto">{{ color.toUpperCase() }}</p>
                        <n-button :style="{ backgroundColor: '#2C2C32' }" class="m-2"
                            @click="copyHEXToClipboard(color)">Copy HEX</n-button>
                    </div>
                </div>
            </section>
            <template #footer>
                <n-button @click="saveColorPallet(colorPallet)">Save color pallet</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script>
import { ref } from "vue";
import { useMessage, NButton, NInput, NColorPicker, NCard, NSpace, NInputNumber, NRadio, NDrawer, NDrawerContent, NRadioGroup, NRadioButton } from "naive-ui";
export default {
    components: {
        NButton, NInput, NColorPicker, NCard, NSpace, NInputNumber, NRadio, NDrawer, NDrawerContent, NRadioGroup, NRadioButton
    },
    data() {
        return {
            color: "#A700EEFF",
            selectedColorForPallet: "#A700EEFF",
            shadedColor: undefined,
            shadePercentage: undefined,
            showColorPalletDrawer: false,
            lighter: false,
            colorPallet: [],
            savedColorPallets: [],
        }
    },
    mounted() {
        window.$message = useMessage();
    },
    methods: {
        saveColorPallet(colorPallet) {
            let obj = {};
            let index = 0;
            for (let color of colorPallet) {
                obj[index] = color;
                index++;
            }
            this.savedColorPallets.push(obj);
            this.showColorPalletDrawer = false;
        },
        copyHEXToClipboard(color) {
            navigator.clipboard.writeText(color);
            window.$message.success(color.toUpperCase() + ' Copied to clipboard');
        },
        generateDarkOrLighterColor(color, shadePercentage) {
            let shadeColor = this.shadeColor(color, shadePercentage);
            this.shadedColor = shadeColor;
        },
        generateColorPallet() {
            let colors = [];
            colors.push(this.selectedColorForPallet);
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