<template>
  <n-space vertical>
    <n-card class="w-100">
      <n-space vertical>
        <n-input placeholder="URL of website" v-model:value="websiteUrl" />

        <div class="d-flex w-100" style="gap: 10px">
          <!--TODO: Set max value to max size of screen-->
          <n-input-number
            min="150"
            class="w-100"
            placeholder="WIDTH"
            v-model:value="inputWidth"
          />
          <n-input-number
            min="150"
            class="w-100"
            placeholder="HEIGHT"
            v-model:value="inputHeight"
          />
        </div>
        <n-slider
          :format-tooltip="
            (val) => (val === value[0] ? `Width ${val}` : `Heigth: ${val}`)
          "
          v-model:value="value"
          range
          :step="1"
          :min="200"
          :max="2000"
        />
        <n-space>
          <p>Height</p>
          <n-input-number
            :min="200"
            :max="2000"
            v-model:value="value[0]"
            size="small"
          />
          <p>Width</p>
          <n-input-number
            :min="200"
            :max="2000"
            v-model:value="value[1]"
            size="small"
          />
        </n-space>
        <n-button class="w-100" @click="loadWebsiteIntoFrames()">Load</n-button>
      </n-space>

      <!-- <n-button class="w-100" @click="switchElementWidthAndHeightFrame()"
        >Rotate all devices</n-button
      > -->
      <div class="injectionCanvas"></div>
      <div class="inputSizedFrameContainer">
        <n-card>
          <iframe
            :width="value[0]"
            :height="value[1]"
            id="inputSizedFrame"
            :style="{ width: value[0], height: value[1] }"
          ></iframe>
        </n-card>
      </div>

      <div class="frameContainer">
        <n-card>
          <div class="mobile">
            <iframe style="width: 455px; height: 960px" id="mobileFrame">
            </iframe>
          </div>
        </n-card>
        <n-card>
          <iframe
            style="width: 768px; height: 1024px"
            id="tabletFrame"
          ></iframe>
        </n-card>
        <n-card>
          <div class="desktop">
            <iframe
              style="width: 1920px; height: 1080px"
              id="desktopFrame"
            ></iframe>
          </div>
        </n-card>
      </div>
    </n-card>
  </n-space>
</template>

<script>
import {
  NCard,
  NSpace,
  NInputNumber,
  NButton,
  NInput,
  NSlider,
} from "naive-ui";
import { ref } from "vue";
export default {
  components: { NCard, NSpace, NInputNumber, NInput, NButton, NSlider },
  data() {
    return {
      websiteUrl: undefined,
      inputHeight: undefined,
      inputWidth: undefined,
    };
  },
  methods: {
    loadWebsiteIntoFrames() {
      if (this.websiteUrl === undefined) {
        alert("Please enter a website URL");
        return;
      }
      //set the 3 iframes with the websiteUrl
      document.querySelectorAll("iframe").forEach((frame) => {
        frame.src = this.websiteUrl;
      });

      document.getElementById("inputSizedFrame").style.width = this.value[0];
      document.getElementById("inputSizedFrame").style.height = this.value[1];
      document.getElementById("inputSizedFrame").width = this.value[0];
      document.getElementById("inputSizedFrame").height = this.value[1];
    },
    switchElementWidthAndHeightFrame() {
      //switch the width and height of the element
      document.querySelectorAll("iframe").forEach((frame) => {
        let width = frame.style.width;
        let height = frame.style.height;
        frame.style.width = height;
        frame.style.height = width;
      });
    },
  },
  setup() {
    return {
      value: ref([1200, 800]),
    };
  },
};
</script>

<style lang="scss" scoped>
.frameContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#mobileFrame,
#tabletFrame,
#desktopFrame {
  background: white;
}

.desktop {
  background-image: url("../../../assets/desktopFrame.png");
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  transform: scale(2);
}
#desktopFrame {
  margin-bottom: 143px;
  transform: scale(0.275);
  //translate to middle of screen
  translate: translate(-50%, -50%);
}

.mobile {
  background-image: url("../../../assets/mobileFrame.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

#mobileFrame {
  transform: scale(0.9);
}
</style>