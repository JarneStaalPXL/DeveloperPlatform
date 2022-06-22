<template>
  <n-space vertical>
    <n-card>
      <nav class="nav justify-content-center">
        <h1>Gradient Background Generator</h1>
      </nav>
      <header class="d-flex justify-content-center" style="gap: 50px">
        <n-card title="Random Gradient Background Generator" class="w-25">
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
                  >Generate backgrounds</n-button
                >
              </n-space>
            </div>
          </n-space>
        </n-card>

        <n-card title="Gradient Creator" class="w-25">
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
              >Generate background with specified color gradient</n-button
            >
          </n-space>
        </n-card>
      </header>
      <h3 v-if="generatedGradientBGS.length > 0">Choose a background</h3>

      <section id="generatedBGContainer" v-if="generatedGradientBGS.length > 0">
        <!--Generated backgrounds (gradients)-->
        <button
          @click="setSelectedGradient(item)"
          v-for="item of generatedGradientBGS"
          class="gradientBox"
          :key="item"
          :style="
            'background: linear-gradient(to right,' +
            item.color1 +
            ',' +
            item.color2 +
            ')'
          "
        ></button>
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
                'background: linear-gradient(to right,' +
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
          <div class="d-flex justify-content-center" style="gap: 25px">
            <n-code
              id="codeField"
              style="font-size: 23px !important"
              :code="
                'background: linear-gradient(to right,' +
                selectedGradient.color1 +
                ',' +
                selectedGradient.color2 +
                ')'
              "
              language="css"
            ></n-code>
            <n-button @click="copyCSS()">Copy</n-button>
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
  NInputNumber,
  NColorPicker,
} from "naive-ui";
import { useMessage } from "naive-ui";
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
  },
  data() {
    return {
      generatedGradientBGS: [],
      selectedGradient: null,
      amountBG: 12,
      amountBGSelect: null,
      selectedFirstColor: null,
      selectedSecondColor: null,
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
    copyCSS() {
      /* Get the text field */
      var copyText = document.getElementById("codeField").innerText;
      console.log(copyText);

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
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 1rem;
  list-style: none;
  height: auto;
  margin: 0 auto;
  justify-content: space-between;
}
#resultContainer {
  margin: auto;
  margin: 60px;
}

.gradientBox:hover {
  border: 5px solid white;
}
</style>

<style>
*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.n-card-cover {
  height: 500px !important;
}
</style>