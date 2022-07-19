<template>
  <n-card class="colorPalletFunctionalItem" title="Color lighter/darkener">
    <section>
      <n-h6>Please select a color</n-h6>
      <n-color-picker
        v-model:value="color"
        :modes="['hex']"
        :on-complete="generateDarkOrLighterColor(color, shadePercentage)"
        placeholder="Enter a color"
        :swatches="[
          '#00FF78FF',
          '#0076FFFF',
          '#FF9D00FF',
          '#FF3F3FFF',
          '#A700EEFF',
        ]"
        :show-preview="true"
      >
      </n-color-picker>

      <n-h6>Choose if u want a Lighter or Darker color</n-h6>
      <n-radio-group
        @change="handleChange"
        name="radiobuttongroup1"
        class="d-flex mb-2"
      >
        <n-radio-button class="w-100" :value="'Lighter'" :label="'Lighter'" />
        <n-radio-button class="w-100" :value="'Darker'" :label="'Darker'" />
      </n-radio-group>

      <n-h6>Enter the amount that will apply to this color</n-h6>
      <n-input-number
        @keyup="generateDarkOrLighterColor(color, shadePercentage)"
        v-model:value="shadePercentage"
        placeholder="Enter amount "
        :min="0"
        :max="100"
      >
        <template #suffix> % </template>
      </n-input-number>

      <!-- <n-button class="w-100" @click="generateDarkOrLighterColor(color, shadePercentage)">Apply
                        </n-button> -->
      <n-card title="Result" class="mt-5" v-if="shadePercentage">
        <n-h6
          >This is a {{ lighter ? "lighter" : "darker" }} color of
          {{ color }}</n-h6
        >
        <n-color-picker
          v-model:value="shadedColor"
          :modes="['hex']"
          :show-preview="true"
          disabled
        >
        </n-color-picker>
        <n-button class="w-100" @click="copyHEXToClipboard(shadedColor)"
          >Copy to clipboard
        </n-button>
      </n-card>
      <!-- <h4 class="mt-5 pb-3">Result</h4>
                        <n-color-picker v-model:value="shadedColor" :modes="['hex']" :show-preview="true">
                        </n-color-picker> -->
    </section>
  </n-card>
</template>

<script>
import { ref } from "vue";
import {
  useMessage,
  NButton,
  NInput,
  NColorPicker,
  NCard,
  NSpace,
  NInputNumber,
  NRadio,
  NDrawer,
  NDrawerContent,
  NRadioGroup,
  NRadioButton,
  NPopconfirm,
  NH6,
  NP,
} from "naive-ui";
export default {
  components: {
    NButton,
    NInput,
    NColorPicker,
    NCard,
    NSpace,
    NInputNumber,
    NRadio,
    NDrawer,
    NDrawerContent,
    NRadioGroup,
    NRadioButton,
    NPopconfirm,
    NH6,
    NP,
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
    };
  },
  mounted() {
    window.$message = useMessage();
  },
  methods: {
    copyHEXToClipboard(color) {
      navigator.clipboard.writeText(color);
      window.$message.success(color.toUpperCase() + " Copied to clipboard");
    },
    generateDarkOrLighterColor(color, shadePercentage) {
      let shadeColor = this.shadeColor(color, shadePercentage);
      this.shadedColor = shadeColor;
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

      R = parseInt((R * (100 + percent)) / 100);
      G = parseInt((G * (100 + percent)) / 100);
      B = parseInt((B * (100 + percent)) / 100);

      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;

      var RR =
        R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
      var GG =
        G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
      var BB =
        B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

      return "#" + RR + GG + BB;
    },
  },
  setup() {
    const checkedValueRef = ref(null);
    return {
      checkedValue: checkedValueRef,
      handleChange(e) {
        checkedValueRef.value = e.target.value;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 50%;
  height: 90vh;
  margin: auto;
}

@media only screen and (max-width: 992px) {
  section {
    width: 100%;
  }
  .colorPalletGenerator {
    display: block !important;
  }
  .colorPalletFunctionalItem {
    width: 100% !important;
    margin-bottom: 10px;
  }
  .clpalletDw {
    min-width: 100% !important;
  }
  .allColorPalletCards {
    width: 100%;
  }
  .fullSavedColorPalletsContainer {
  }
}
</style>