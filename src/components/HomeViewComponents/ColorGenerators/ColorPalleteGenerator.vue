<template>
  <n-space vertical>
    <n-space :style="{ display: 'block' }" class="fullContainer">
      <div
        class="colorPalletGenerator d-flex justify-content-between"
        style="gap: 25px"
      >
        <n-card
          class="colorPalletFunctionalItem"
          title="Color Pallete Generator"
        >
          <section id="creationSection">
            <n-color-picker
              v-model:value="selectedColorForPallet"
              :swatches="[
                '#00FF78FF',
                '#0076FFFF',
                '#FF9D00FF',
                '#FF3F3FFF',
                '#A700EEFF',
              ]"
              :modes="['hex']"
              :show-preview="true"
              placeholder="Enter a color"
            >
            </n-color-picker>
            <n-button class="w-100" @click="generateColorPallet()"
              >Generate color pallete</n-button
            >
            <n-h6>Do you want to know a specific color of a site?</n-h6>
            <n-button
              @click="
                openPopupWindow(
                  'https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg'
                )
              "
              class="w-100"
              >Download Colorpicker extension</n-button
            >
          </section>
        </n-card>
      </div>
    </n-space>

    <transition appear>
      <n-card
        title="Saved Color Palletes"
        v-if="$store.state.userSavedColorPallets.length > 0"
      >
        <section class="fullSavedColorPalletsContainer">
          <n-card
            closable
            @close="removeColorFromSavedPallete(cp)"
            v-for="cp of savedColorPallets"
            :key="cp"
            class="allColorPalletCards"
            :title="'Color pallete' + ' build from HEX: ' + cp[0]"
          >
            <div
              v-for="cl in cp"
              :key="cl"
              :style="{ background: cl }"
              class="colorPalletItem"
            >
              <div class="d-flex justify-content-start w-100">
                <n-popconfirm
                  positive-text="Copy HEX code"
                  negative-text="No"
                  @positive-click="copyHEXToClipboard(cl)"
                  @negative-click="null"
                >
                  <template #trigger>
                    <n-button :style="{ backgroundColor: 'black' }" class="m-2"
                      ><n-p
                        :style="{ color: cl }"
                        class="d-flex hexCodeTextParagraph"
                      >
                        {{ cl.toUpperCase() }}
                      </n-p></n-button
                    >
                  </template>
                  Do you want to copy the HEX code to clipboard?
                </n-popconfirm>
              </div>
            </div>
          </n-card>
        </section>
      </n-card>
    </transition>
  </n-space>

  <n-drawer
    :style="{ minWidth: '50%' }"
    v-model:show="showColorPalletDrawer"
    class="clpalletDw"
    :default-width="500"
    :placement="'left'"
    :trap-focus="false"
    resizable
  >
    <n-drawer-content title="Color Pallete" closable>
      <section id="colorPalletContent">
        <div
          v-for="color in colorPallet"
          :key="color"
          :style="{ background: color }"
          class="colorPalletItem"
        >
          <div class="d-flex justify-content-between w-100">
            <p class="d-flex m-auto">{{ color.toUpperCase() }}</p>
            <n-button
              id="copyHEXButton"
              class="m-2"
              @click="copyHEXToClipboard(color)"
              >Copy HEX</n-button
            >
          </div>
        </div>
      </section>
      <template #footer>
        <n-spin :show="showSaveColorPalletBtn">
          <n-button
            @click="
              $store.state.isLoggedIn
                ? saveColorPallet(colorPallet)
                : (showColorPalletDrawer = false)
            "
            >{{
              $store.state.isLoggedIn
                ? "Save color pallete"
                : "Log in with Google to save color pallette"
            }}</n-button
          >
        </n-spin>
      </template>
    </n-drawer-content>
  </n-drawer>
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
  NSpin,
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
    NSpin,
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
  computed: {
    savedColorPallets() {
      return this.$store.state.userSavedColorPallets;
    },
  },
  mounted() {
    window.$message = useMessage();
  },
  methods: {
    openPopupWindow(url) {
      //calculate height of screen
      var height = screen.height;
      //calculate width of screen
      var width = screen.width;
      window.open(url, "popup", `height=${height},width=${width}`);
    },
    async removeColorFromSavedPallete(colorPallet) {
      colorPallet = JSON.parse(JSON.stringify(colorPallet));
      await this.$store
        .dispatch("REMOVE_COLOR_FROM_SAVED_PALLETTE", {
          id: localStorage.getItem("uid"),
          colorpallet: colorPallet,
        })
        .then(() => {
          window.$message.success("Color pallete deleted");
        })
        .catch((err) => {
          window.$message.error("Error deleting color pallete");
          console.error(err);
        });
    },
    async saveColorPallet(colorPallet) {
      this.showSaveColorPalletBtn = true;
      //check if colorPallet is already in savedColorPallets
      for (let cp of this.savedColorPallets) {
        if (cp[0] === colorPallet[0]) {
          window.$message.error("Color pallete already saved");
          this.showColorPalletDrawer = false;
          return;
        }
      }
      await this.$store
        .dispatch("GET_USER_SAVED_COLOR_PALLETES", localStorage.getItem("uid"))
        .then(async () => {
          let obj = {};
          let index = 0;
          for (let color of colorPallet) {
            obj[index] = color;
            index++;
          }

          let tempArr = [];
          if (this.$store.state.userSavedColorPallet === undefined) {
            this.$store.state.userSavedColorPallet = [];
          }
          if (this.$store.state.userSavedColorPallet !== undefined) {
            tempArr = JSON.parse(
              JSON.stringify(this.$store.state.userSavedColorPallet)
            );
          }
          tempArr.push(obj);

          //save to Strapi
          await this.$store
            .dispatch("ADD_COLORPALLETE_TO_ACCOUNT", {
              id: localStorage.getItem("uid"),
              colorPallet: JSON.stringify(tempArr),
            })
            .then(() => {
              window.$message.success("Color pallete saved successfully!");
              this.showColorPalletDrawer = false;
              this.showSaveColorPalletBtn = false;
            })
            .catch((err) => {
              console.error(err);
              this.showSaveColorPalletBtn = false;
            });
        });
    },
    copyHEXToClipboard(color) {
      navigator.clipboard.writeText(color);
      window.$message.success(color.toUpperCase() + " Copied to clipboard");
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

      this.colorPallet = colors.filter(
        (item, index) => colors.indexOf(item) === index
      );
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
      showSaveColorPalletBtn: ref(false),
    };
  },
};
</script>

<style lang="scss" scoped>
  #copyHEXButton {
    background:white;
  }
#creationSection {
  width: 50%;
  margin: auto;
}
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
#downloadThisExtensionParagraph {
  a {
    color: inherit;
    text-decoration: underline;
  }
  a:hover {
    color: white;
  }
}

.hexCodeTextParagraph {
  width: 150px;
  justify-content: center;
}

.allColorPalletCards {
  width: 25%;
}

.fullSavedColorPalletsContainer {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (max-width: 992px) {
  #creationSection {
    width: 100%;
  }
  .fullContainer {
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
