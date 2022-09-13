<template>
  <section class="fullSectionLinear">
    <n-space vertical>
      <n-card>
        <header class="d-flex justify-content-between flex-wrap" style="gap: 50px">
          <n-card
            title="Random Gradient Generator"
            style="width: 33%"
            class="naiveUICard"
          >
            <n-space vertical>
              <div class="d-flex flex-column justify-content-end">
                <n-space vertical>
                  <n-input-number
                    id="amountInput"
                    class="w-100 m-auto"
                    v-model:value="amountBG"
                    clearable
                    placeholder="Amount"
                    min="1"
                    :value="amountBG"
                    max="50"
                  />
                  <n-button
                    id="getBGBtn"
                    class="w-100"
                    @click="this.GetGeneratedGradientBackgrounds(amountBG)"
                    >Generate gradients</n-button
                  >
                  <n-spin size="small" :show="downloadingGradients">
                    <n-popconfirm
                      @positive-click="this.downloadAllShownGradients()"
                      @negative-click="this.abortedDownloadGradients()"
                      positive-text="Download"
                    >
                      <template #trigger>
                        <n-button class="w-100">
                          {{
                            currentFileAmountZipped <= 0
                              ? "Download " + generatedGradientBGS.length + " gradients"
                              : "Downloaded " + currentFileAmountZipped + " gradients"
                          }}
                        </n-button>
                      </template>

                      Are you sure you want to download
                      {{ generatedGradientBGS.length }} gradients
                      {{ windowWidth > 560 ? "in 4K resolution" : "" }}?<br />
                      Size will be maximum of
                      {{
                        windowWidth > 550
                          ? 2 * amountBG + "MB"
                          : convertKilobytesToMegabytes(amountBG * 150) + "MB"
                      }}
                    </n-popconfirm>
                  </n-spin>
                </n-space>
              </div>
            </n-space>
          </n-card>

          <n-card title="Gradient Creator" style="width: 33%" class="naiveUICard">
            <n-space vertical>
              <n-color-picker
                :modes="['hex']"
                v-model:value="selectedFirstColor"
                :show-alpha="false"
              />
              <n-color-picker
                :modes="['hex']"
                v-model:value="selectedSecondColor"
                :show-alpha="false"
              />

              <n-button
                id="getBGBtn"
                class="w-100"
                @click="this.GetGeneratedGradientBackgroundsFromSelectedColor()"
              >
                Generate gradient</n-button
              >
            </n-space>
          </n-card>
          <n-card title="Positioning" style="width: 22%" class="naiveUICard">
            <n-select
              v-if="gradientLayout.includes('linear')"
              v-model:value="gradientPositioning"
              placeholder="position"
              :options="[
                {
                  label: 'to right',
                  value: 'to right',
                },
                {
                  label: 'to left',
                  value: 'to left',
                },
                {
                  label: 'to top',
                  value: 'to top',
                },
                {
                  label: 'to bottom',
                  value: 'to bottom',
                },
                {
                  label: 'to top right',
                  value: 'to top right',
                },
                {
                  label: 'to top left',
                  value: 'to top left',
                },
                {
                  label: 'to bottom right',
                  value: 'to bottom right',
                },
                {
                  label: 'to bottom left',
                  value: 'to bottom left',
                },
              ]"
            >
            </n-select>
          </n-card>
        </header>
        <!-- <h3 v-if="generatedGradientBGS.length > 0">Choose a background</h3> -->

        <n-card v-if="generatedGradientBGS.length > 0" class="naiveUICard mt-3">
          <!--Generated backgrounds (gradients)-->
          <div id="generatedBGContainer" class="w-100">
            <button
              @click="setSelectedGradient(item)"
              v-for="item of generatedGradientBGS"
              class="gradientBox"
              :key="item"
              :style="
                'background: ' +
                gradientLayout +
                '-gradient(' +
                gradientPositioning +
                ',' +
                item.color1 +
                ',' +
                item.color2 +
                ')'
              "
            ></button>
          </div>
        </n-card>
      </n-card>
      <n-drawer v-model:show="drawerActive" :width="'95vw'">
        <n-drawer-content closable>
          <n-scrollbar style="max-height: 100%">
            <section
              v-if="selectedGradient !== null"
              class="d-flex flex-column justify-content-between"
              id="resultContainer"
            >
              <div class="typographyContainer">
                <div>
                  <div>
                    <p>Heading 1</p>
                    <h1 :style="getGradientCSSForText()">gradient text</h1>
                  </div>
                  <div>
                    <p>Heading 2</p>
                    <h2 :style="getGradientCSSForText()">gradient text</h2>
                  </div>
                </div>
                <div>
                  <div>
                    <p>Heading 3</p>
                    <h3 :style="getGradientCSSForText()">gradient text</h3>
                  </div>
                  <div>
                    <p>Heading 4</p>
                    <h4 :style="getGradientCSSForText()">gradient text</h4>
                  </div>
                </div>
                <div>
                  <div>
                    <p>Heading 5</p>
                    <h5 :style="getGradientCSSForText()">gradient text</h5>
                  </div>
                  <div>
                    <p>Heading 6</p>
                    <h6 :style="getGradientCSSForText()">gradient text</h6>
                  </div>
                </div>
              </div>

              <div
                class="resultGradientBox"
                :style="
                  'background: ' +
                  gradientLayout +
                  '-gradient(' +
                  gradientPositioning +
                  ',' +
                  selectedGradient.color1 +
                  ',' +
                  selectedGradient.color2 +
                  ')'
                "
              >
                <h1 id="result"></h1>
                <img src="" />
              </div>
            </section>
          </n-scrollbar>
          <template
            #header
            :style="{
              display: 'block !important',
            }"
          >
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex" style="gap: 20px">
                <p class="m-auto">Position</p>
                <n-select
                  id="drawerPositioningSelect"
                  v-if="gradientLayout.includes('linear')"
                  v-model:value="gradientPositioning"
                  placeholder="position"
                  :options="[
                    {
                      label: 'to right',
                      value: 'to right',
                    },
                    {
                      label: 'to left',
                      value: 'to left',
                    },
                    {
                      label: 'to top',
                      value: 'to top',
                    },
                    {
                      label: 'to bottom',
                      value: 'to bottom',
                    },
                    {
                      label: 'to top right',
                      value: 'to top right',
                    },
                    {
                      label: 'to top left',
                      value: 'to top left',
                    },
                    {
                      label: 'to bottom right',
                      value: 'to bottom right',
                    },
                    {
                      label: 'to bottom left',
                      value: 'to bottom left',
                    },
                  ]"
                >
                </n-select>
              </div>
            </div>
          </template>

          <template #footer>
            <div
              class="d-flex w-100 justify-content-center align-items-center"
              style="gap: 10px"
            >
              <n-popconfirm
                v-model:show="copyCSSPopShow"
                :show-icon="false"
                positive-text="Background gradient"
                negative-text="Text gradient"
              >
                <template #action>
                  <n-button
                    type="success"
                    @click="copyToClipboard(getGradientCSSForText())"
                    >Text Gradient
                  </n-button>
                  <n-button
                    type="success"
                    @click="
                      copyToClipboard(
                        'background: ' +
                          gradientLayout +
                          '-gradient(' +
                          gradientPositioning +
                          ',' +
                          selectedGradient.color1 +
                          ',' +
                          selectedGradient.color2 +
                          ')'
                      )
                    "
                    >Background Gradient</n-button
                  >
                </template>
                <template #trigger>
                  <n-button class="w-50">Copy CSS</n-button>
                </template>
                What CSS do you want to copy?
              </n-popconfirm>

              <n-button class="w-50" @click="createCanvasWithGradientAndDownload()">
                Download background
              </n-button>
            </div>
          </template>
        </n-drawer-content>
      </n-drawer>
    </n-space>
  </section>
</template>

<script>
import {
  NCode,
  NCard,
  NButton,
  NInput,
  NSpace,
  NSelect,
  NInputNumber,
  NColorPicker,
  NIcon,
  NSpin,
  NPopconfirm,
  NDrawer,
  NDrawerContent,
  NScrollbar,
} from "naive-ui";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { defineComponent, ref } from "vue";
import { useMessage, useLoadingBar } from "naive-ui";
export default {
  name: "TemplateDesigner",
  components: {
    NCode,
    NCard,
    NInput,
    NButton,
    NSpace,
    NInputNumber,
    NColorPicker,
    NSelect,
    NIcon,
    NSpin,
    NPopconfirm,
    NDrawer,
    NDrawerContent,
    NScrollbar,
  },
  data() {
    return {
      generatedGradientBGS: [],
      selectedGradient: null,
      amountBG: 15,
      amountBGSelect: null,
      selectedFirstColor: null,
      selectedSecondColor: null,
      gradientPositioning: "to right",
      gradientLayout: "linear",
      downloadingGradients: false,
      currentFileAmountZipped: 0,
      copyCSSPopShow: false,
      drawerActive: false,
    };
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
  },
  mounted() {
    this.GetGeneratedGradientBackgrounds(this.amountBG);
    document.getElementById("amountInput").addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("getBGBtn").click();
      }
    });
  },
  methods: {
    getGradientCSSForText() {
      return (
        "background: linear-gradient(" +
        this.gradientPositioning +
        "," +
        this.selectedGradient.color1 +
        "," +
        this.selectedGradient.color2 +
        " );-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
      );
    },
    convertKilobytesToMegabytes(kilobytes) {
      return (kilobytes / 1024).toFixed(2);
    },
    abortedDownloadGradients() {
      window.$message.warning("Download aborted");
    },
    async downloadAllShownGradients() {
      let zip = new JSZip();

      //Loading
      // this.downloadingGradients = true;
      window.$loadingbar.start();

      //generate canvas and add to zip
      var result = new Promise((resolve, reject) => {
        this.generatedGradientBGS.forEach((gradient, index, array) => {
          let canvas = this.createCanvasWithPassedGradient({
            color1: gradient.color1,
            color2: gradient.color2,
          });

          canvas.toBlob((blob) => {
            zip.file(
              "background" + gradient.color1 + "-" + gradient.color2 + ".png",
              blob
            );
            this.currentFileAmountZipped = index + 1;
            if (index === array.length - 1) resolve();
          });
        });
      });

      result.then(() => {
        window.$loadingbar.finish();
        this.downloadingGradients = false;
        zip.generateAsync({ type: "blob" }).then((blob) => {
          FileSaver.saveAs(blob, "backgrounds.zip");
        });
        window.$message.success("Downloaded all backgrounds");
      });
    },
    createCanvasWithPassedGradient(colors) {
      let canvas = document.createElement("canvas");
      canvas.width = 3840;
      canvas.height = 2160;

      //Check if on mobile
      if (window.innerWidth < 768) {
        canvas.width = 540;
        canvas.height = 960;
      }

      let ctx = canvas.getContext("2d");

      let gradient = null;

      switch (this.gradientPositioning) {
        case "to right":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          break;
        case "to left":
          gradient = ctx.createLinearGradient(canvas.width, 0, 0, 0);
          break;
        case "to top":
          gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          break;
        case "to bottom":
          gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          break;
        case "to top right":
          gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
          break;
        case "to top left":
          gradient = ctx.createLinearGradient(canvas.width, canvas.height, 0, 0);
          break;
        case "to bottom right":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          break;
        case "to bottom left":
          gradient = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height);
          break;
      }

      gradient.addColorStop(0, colors.color1);
      gradient.addColorStop(1, colors.color2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return canvas;
    },
    createCanvasWithGradientAndDownload() {
      window.$loadingbar.start();
      let canvas = document.createElement("canvas");
      canvas.width = 3840;
      canvas.height = 2160;

      //Check if on mobile
      if (window.innerWidth < 768) {
        canvas.width = 540;
        canvas.height = 960;
      }

      let ctx = canvas.getContext("2d");

      let gradient = null;

      switch (this.gradientPositioning) {
        case "to right":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          break;
        case "to left":
          gradient = ctx.createLinearGradient(canvas.width, 0, 0, 0);
          break;
        case "to top":
          gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          break;
        case "to bottom":
          gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          break;
        case "to top right":
          gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
          break;
        case "to top left":
          gradient = ctx.createLinearGradient(canvas.width, canvas.height, 0, 0);
          break;
        case "to bottom right":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          break;
        case "to bottom left":
          gradient = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height);
          break;
      }

      gradient.addColorStop(0, this.selectedGradient.color1);
      gradient.addColorStop(1, this.selectedGradient.color2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL();

      let image = new Image();
      image.src = dataUrl;

      let a = document.createElement("a");
      a.href = dataUrl;
      a.download =
        "background" +
        this.selectedGradient.color1 +
        "-" +
        this.selectedGradient.color2 +
        ".png";
      a.click();
      window.$message.success("Background is downloaded.");
      setTimeout(() => {
        window.$loadingbar.finish();
      }, 0);
      return dataUrl;
    },
    copyToClipboard(copyText) {
      navigator.clipboard.writeText(copyText);
      window.$message.success("CSS is copied to clipboard.");
      this.copyCSSPopShow = false;
    },
    setSelectedGradient(item) {
      this.selectedGradient = item;
      this.$store.commit("setSelectedLinearGradient", {
        color1: item.color1,
        color2: item.color2,
        gradientPositioning: this.gradientPositioning,
        gradientLayout: this.gradientLayout,
      });

      // setTimeout(() => {
      //   window.location.href = "#result";
      // }, 0);
      this.drawerActive = true;
    },
    isValidHexColor(str) {
      return /^#[0-9A-F]{6}$/i.test(str);
    },
    GetGeneratedGradientBackgrounds(amountBG) {
      this.currentFileAmountZipped = 0;
      let arr = [];
      let index = 0;

      while (index < amountBG) {
        let color1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
        let color2 = "#" + Math.floor(Math.random() * 16777315).toString(16);

        if (this.isValidHexColor(color1) && this.isValidHexColor(color2)) {
          arr.push({
            color1: color1,
            color2: color2,
          });
          index++;
        }
      }
      this.generatedGradientBGS = arr;
    },
    GetGeneratedGradientBackgroundsFromSelectedColor() {
      if (this.selectedFirstColor === null || this.selectedSecondColor === null) {
        window.$message.error("Please select colors.");
        return;
      }
      let arr = [];
      arr.push({
        color1: this.selectedFirstColor,
        color2: this.selectedSecondColor,
      });

      // this.generatedGradientBGS = [];
      this.selectedGradient = {
        color1: this.selectedFirstColor,
        color2: this.selectedSecondColor,
      };
      this.drawerActive = true;
    },
  },
  setup() {
    window.$message = useMessage();
    window.$loadingbar = useLoadingBar();
    return {
      show: ref(false),
    };
  },
};
</script>

<style lang="scss">
@media only screen and (max-width: 670px) {
  .n-card__content {
    padding: 7px !important;
  }
}
</style>

<style lang="scss" scoped>
nav {
  h1 {
    color: white;
  }
}

.typographyContainer {
  margin-bottom: 50px;
  display: flex;
  gap: 10vw;
  align-items: center;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-bottom: 20px;
  }
}

#drawerPositioningSelect {
  width: 200px;
}

.gradientBox {
  width: 300px;
  margin: auto;
  height: 300px;
  border-radius: 15px;
  border: 0;
}

.resultGradientBox {
  height: 300px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

#generatedBGContainer {
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 1rem;
  list-style: none;
  height: auto;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
}

// #resultContainer {
//   margin-top: 60px;
// }

.gradientBox:hover {
  border: 5px solid white;
}

@media only screen and (max-width: 992px) {
  .naiveUICard {
    width: 100% !important;
  }
}

@media only screen and (max-width: 670px) {
  .gradientBox {
    width: 150px;
    height: 150px;
  }

  #generatedBGContainer {
    grid-template-columns: repeat(2, 200px);
  }

  //make code font smaller
  #codeField {
    display: none;
  }
}

@media only screen and (max-width: 470px) {
  #generatedBGContainer {
    grid-template-columns: repeat(2, 154px);
  }
}

.n-card-cover {
  height: 500px;
}
</style>
