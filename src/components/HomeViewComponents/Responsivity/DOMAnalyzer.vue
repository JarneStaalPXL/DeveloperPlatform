<template>
  <n-space vertical>
    <n-card>
      <n-input
        v-model:value="urlToAnalyse"
        placeholder="URL website to analyse"
      ></n-input>
      <n-button class="w-100" @click="analyzeWebsite(urlToAnalyse)"
        >Analyse</n-button
      >
    </n-card>
    <n-card v-if="analysedDocumentElementCount !== undefined" title="Elements">
      <n-row :style="{ display: 'block' }">
        <n-col :span="5">
          <n-statistic label="Heading 1">
            {{ analysedDocumentElementCount.h1Count }}
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 2">
            {{ analysedDocumentElementCount.h2Count }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Heading 3">
            {{ analysedDocumentElementCount.h3Count }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Heading 4">
            {{ analysedDocumentElementCount.h4Count }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Heading 5">
            {{ analysedDocumentElementCount.h5Count }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Heading 6">
            {{ analysedDocumentElementCount.h6Count }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Paragraph">
            {{ analysedDocumentElementCount.pCount }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Image">
            {{ analysedDocumentElementCount.imgCount }}
          </n-statistic>
        </n-col>
      </n-row>
    </n-card>
    <n-card v-if="allImagesFromDocument !== undefined" title="Images">
      <div>
        <button
          class="imageBtn"
          v-for="(image, index) in allImagesFromDocument"
          :key="index"
          :style="{ backgroundImage: `url(${image})` }"
        ></button>
      </div>
    </n-card>

    <n-modal v-model:show="showModalCORSExtension">
      <n-card
        style="width: 600px"
        title="Required Extension"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra> </template>
        To analyze this website, you need to download the free CORS UNBLOCK
        extension first. Once installed, click on the extension to enable it and
        reload this page.
        <template #footer>
          <a
            id="installExtensionBtn"
            target="_blank"
            href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino"
            >Install</a
          >
        </template>
      </n-card>
    </n-modal>
  </n-space>
</template>

<script>
import {
  NSpace,
  NCard,
  NInput,
  NButton,
  NCol,
  NStatistic,
  useNotification,
  useMessage,
  NRow,
  NCarousel,
  NModal,
} from "naive-ui";
export default {
  name: "DOMAnalyzer",
  components: {
    NSpace,
    NCard,
    NInput,
    NButton,
    NCol,
    NStatistic,
    NRow,
    NCarousel,
    NModal,
  },
  data() {
    return {
      urlToAnalyse: undefined,
      analysedDocumentElementCount: undefined,
      allImagesFromDocument: undefined,
      showModalCORSExtension: false,
    };
  },
  methods: {
    analyzeWebsite(url) {
      // fetch website content from url
      // return content
      fetch(url)
        .then((response) => {
          // The API call was successful!
          return response.text();
        })
        .then((html) => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          this.buildStatisticsForWebsite(doc);
          console.log(doc);
          window.$message.success("Succesfully fetched website content");
        })
        .catch((err) => {
          // There was an error
          // window.$notification.error({
          //   title: "Error",
          //   content: err.toString(),
          // });
          this.showModalCORSExtension = true;
          this.analysedDocumentElementCount = undefined;
          this.allImagesFromDocument = undefined;
        });
    },
    buildStatisticsForWebsite(doc) {
      this.setCountForCommonElements(doc);
      this.getAllImagesFromDocument(doc);
    },
    setCountForCommonElements(doc) {
      let h1Count = doc.getElementsByTagName("h1").length;
      let h2Count = doc.getElementsByTagName("h2").length;
      let h3Count = doc.getElementsByTagName("h3").length;
      let h4Count = doc.getElementsByTagName("h4").length;
      let h5Count = doc.getElementsByTagName("h5").length;
      let h6Count = doc.getElementsByTagName("h6").length;
      let pCount = doc.getElementsByTagName("p").length;
      let aCount = doc.getElementsByTagName("a").length;
      let imgCount = doc.getElementsByTagName("img").length;

      this.analysedDocumentElementCount = {
        h1Count: h1Count,
        h2Count: h2Count,
        h3Count: h3Count,
        h4Count: h4Count,
        h5Count: h5Count,
        h6Count: h6Count,
        pCount: pCount,
        aCount: aCount,
        imgCount: imgCount,
      };
    },
    getAllImagesFromDocument(doc) {
      let images = doc.getElementsByTagName("img");
      let imagesArray = [];
      for (let i = 0; i < images.length; i++) {
        //Check if image is duplicate
        if (imagesArray.indexOf(images[i].src) === -1) {
          imagesArray.push(images[i].src);
        }
      }
      this.allImagesFromDocument = imagesArray;
    },
  },
  setup() {
    window.$notification = useNotification();
    window.$message = useMessage();
  },
};
</script>

<style lang="scss" scoped>
.imageBtn {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin: 10px;
}
#installExtensionBtn {
  text-decoration: none;
}
</style>

