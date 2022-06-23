<template>
  <n-space vertical>
    <n-card>
      <!-- <nav class="nav justify-content-center">
        <h1>Gradient Background Generator</h1>
      </nav> -->
      <header
        class="d-flex justify-content-between flex-wrap"
        style="gap: 50px"
      >
        <n-card
          class="naiveUICard"
          title="Random Gradient Generator"
          style="width: 33%"
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
                  max="1000"
                />
                <n-button
                  id="getBGBtn"
                  class="w-100"
                  @click="this.GetGeneratedGradientBackgrounds(amountBG)"
                  >Generate gradients</n-button
                >
              </n-space>
            </div>
          </n-space>
        </n-card>

        <n-card class="naiveUICard" title="Gradient Creator" style="width: 33%">
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
      </header>
      <!-- <h3 v-if="generatedGradientBGS.length > 0">Choose a background</h3> -->

      <section v-if="generatedGradientBGS.length > 0">
        <!--Generated backgrounds (gradients)-->
        <div id="generatedBGContainer">
          <button
            @click="setSelectedGradient(item)"
            v-for="item of generatedGradientBGS"
            class="gradientBox"
            :key="item"
            :style="
              'background: ' +
              gradientLayout +
              '-gradient(' +
              item.color1 +
              ',' +
              item.color2 +
              ')'
            "
          ></button>
        </div>
      </section>

      <section
        v-if="selectedGradient !== null"
        class="d-flex justify-content-between"
        id="resultContainer"
      >
        <n-card title="CSS">
          <template #cover>
            <div
              class="resultGradientBox"
              :style="
                'background: ' +
                gradientLayout +
                '-gradient(' +
                selectedGradient.color1 +
                ',' +
                selectedGradient.color2 +
                ')'
              "
            >
              <h1 id="result"></h1>
              <img src="" />
            </div>
          </template>
          <div
            class="d-flex justify-content-center flex-column"
            style="gap: 10px"
          >
            <n-code
              id="codeField"
              style="font-size: 23px !important"
              :code="
                'background: ' +
                gradientLayout +
                '-gradient(' +
                selectedGradient.color1 +
                ',' +
                selectedGradient.color2 +
                ')'
              "
              language="css"
            ></n-code>

            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
              style="gap: 10px"
            >
              <n-button style="width: 50vw" @click="copyCSS()"
                >Copy CSS</n-button
              >
              <n-button
                style="width: 50vw"
                @click="createCanvasWithGradientAndDownload()"
              >
                Download as background
              </n-button>
            </div>
          </div>
        </n-card>
      </section>
    </n-card>
  </n-space>
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
} from "naive-ui";
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
  },
  data() {
    return {
      generatedGradientBGS: [],
      selectedGradient: null,
      amountBG: 12,
      amountBGSelect: null,
      selectedFirstColor: null,
      selectedSecondColor: null,
      gradientLayout: "radial",
    };
  },
  mounted() {
    this.GetGeneratedGradientBackgrounds(this.amountBG);
    document
      .getElementById("amountInput")
      .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("getBGBtn").click();
        }
      });
  },
  methods: {
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

      let gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );

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
    copyCSS() {
      /* Get the text field */
      var copyText = document.getElementById("codeField").innerText;

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);

      /* Alert the copied text */
      window.$message.success("CSS is copied to clipboard.");
    },
    setSelectedGradient(item) {
      this.selectedGradient = item;
      setTimeout(() => {
        window.location.href = "#result";
      }, 0);
    },
    isValidHexColor(str) {
      return /^#[0-9A-F]{6}$/i.test(str);
    },
    GetGeneratedGradientBackgrounds(amountBG) {
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
      if (
        this.selectedFirstColor === null ||
        this.selectedSecondColor === null
      ) {
        window.$message.error("Please select colors.");
        return;
      }
      let arr = [];
      arr.push({
        color1: this.selectedFirstColor,
        color2: this.selectedSecondColor,
      });

      this.generatedGradientBGS = [];
      this.selectedGradient = {
        color1: this.selectedFirstColor,
        color2: this.selectedSecondColor,
      };
    },
  },
  setup() {
    window.$message = useMessage();
    window.$loadingbar = useLoadingBar();
  },
};
</script>

<style lang="scss" scoped>
nav {
  h1 {
    color: white;
  }
}

h3 {
  color: white;
  padding: 50px;
}

.gradientBox {
  width: 300px;
  margin: auto;
  height: 300px;
  border-radius: 15px;
}

.resultGradientBox {
  height: 500px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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
}

#resultContainer {
  margin-top: 60px;
}

.gradientBox:hover {
  border: 5px solid white;
}

@media only screen and (max-width: 992px) {
  .naiveUICard {
    width: 100% !important;
  }
  header {
    flex-direction: column;
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
</style>

<style>
*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.n-card-cover {
  height: 500px !important;
}
</style>