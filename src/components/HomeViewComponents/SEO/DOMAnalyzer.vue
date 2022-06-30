<template>
  <n-space vertical>
    <!--Inputs-->
    <n-card>
      <n-input
        v-model:value="urlToAnalyse"
        placeholder="URL website to analyse"
      ></n-input>

      <n-spin size="small" :show="analysingWebsite">
        <n-button class="w-100" @click="analyzeWebsite(urlToAnalyse)"
          >Analyse</n-button
        >
      </n-spin>
    </n-card>

    <!--Results elements-->
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
          <n-statistic label="Paragraphs">
            {{ analysedDocumentElementCount.pCount }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Images">
            {{ analysedDocumentElementCount.imgCount }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Scripts">
            {{ analysedDocumentElementCount.scriptCount }}
          </n-statistic>
        </n-col>
      </n-row>
    </n-card>

    <!--Results images-->
    <n-card
      v-if="
        allImagesFromDocument !== undefined && allImagesFromDocument.length > 0
      "
      :title="'Images (' + allImagesFromDocument.length + ')'"
    >
      <div>
        <button
          class="imageBtn"
          v-for="(image, index) in allImagesFromDocument"
          :key="index"
          :style="{ backgroundImage: `url(${image.src})` }"
          @click="openImageDrawer(image)"
        ></button>
      </div>
    </n-card>

    <!--Results Meta-->
    <n-card
      class="metaCard"
      :title="'Meta data (' + metaDataObjLength() + ')'"
      v-if="metaDataObj !== undefined"
    >
      <n-statistic label="Meta description" v-if="metaDataObj.metaDescription">
        <p>{{ metaDataObj.metaDescription }}</p>
      </n-statistic>
      <n-statistic label="Meta keywords" v-if="metaDataObj.metaKeywords">
        <p>{{ metaDataObj.metaKeywords }}</p>
      </n-statistic>
      <n-statistic label="Meta title" v-if="metaDataObj.metaTitle">
        <p>{{ metaDataObj.metaTitle }}</p>
      </n-statistic>
      <n-statistic label="Meta author" v-if="metaDataObj.metaAuthor">
        <p>{{ metaDataObj.metaAuthor }}</p>
      </n-statistic>
      <n-statistic label="Meta publisher" v-if="metaDataObj.metaPublisher">
        <p>{{ metaDataObj.metaPublisher }}</p>
      </n-statistic>
      <n-statistic label="Meta copyright" v-if="metaDataObj.metaCopyright">
        <p>{{ metaDataObj.metaCopyright }}</p>
      </n-statistic>
      <n-statistic label="Meta language" v-if="metaDataObj.metaLanguage">
        <p>{{ metaDataObj.metaLanguage }}</p>
      </n-statistic>
      <n-statistic label="Meta generator" v-if="metaDataObj.metaGenerator">
        <p>{{ metaDataObj.metaGenerator }}</p>
      </n-statistic>
      <n-statistic label="Meta robots" v-if="metaDataObj.metaRobots">
        <p>{{ metaDataObj.metaRobots }}</p>
      </n-statistic>
      <n-statistic
        label="Meta revisit after"
        v-if="metaDataObj.metaRevisitAfter"
      >
        <p>{{ metaDataObj.metaRevisitAfter }}</p>
      </n-statistic>
      <n-statistic label="Meta viewport" v-if="metaDataObj.metaViewport">
        <p>{{ metaDataObj.metaViewport }}</p>
      </n-statistic>
    </n-card>

    <!--Results SEO-->
    <n-card title="SEO Score" v-if="seoScoreObj !== undefined">
      <n-row :style="{ display: 'block' }">
        <n-col :span="5">
          <n-statistic label="Images with alt attribute">
            {{ seoScoreObj.imagesWithAlt }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Images without alt attribute">
            {{ seoScoreObj.imagesWithoutAlt }}
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Images with alt attribute in %">
            {{ seoScoreObj.imagesWithAltPercentage }}%
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Images without alt attribute in %">
            {{ seoScoreObj.imagesWithoutAltPercentage }}%
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Total Score in %">
            {{ seoScoreObj.seoTotalScore }}%
          </n-statistic>
        </n-col>
      </n-row>
    </n-card>

    <!--CORS Extension Modal-->
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
    <!--Image Drawer-->
    <n-drawer
      v-model:show="imageDrawerActive"
      :width="502"
      :placement="'right'"
    >
      <n-drawer-content title="Image" closable>
        <img class="drawerImagePreview" :src="imageForImageDrawer.src" />
        <n-button @click="downloadImage(imageForImageDrawer)" class="mt-2 w-100"
          >Download image</n-button
        >
      </n-drawer-content>
    </n-drawer>
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
  NDrawer,
  NDrawerContent,
  useLoadingBar,
  NSpin,
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
    NDrawer,
    NDrawerContent,
    NSpin,
  },
  data() {
    return {
      urlToAnalyse: undefined,
      analysedDocumentElementCount: undefined,
      allImagesFromDocument: undefined,
      showModalCORSExtension: false,
      imageDrawerActive: false,
      imageForImageDrawer: undefined,
      imagesWithoutAltCount: undefined,
      metaDataObj: undefined,
      seoScoreObj: undefined,
      analysingWebsite: false,
    };
  },
  methods: {
    metaDataObjLength() {
      let count = 0;

      //for every key in the object, if the value is not undefined, increase the count
      for (let key in this.metaDataObj) {
        if (this.metaDataObj[key] !== null) {
          count++;
        }
      }

      return count;
    },
    downloadImage(image) {
      //Download image from external url
      fetch(image.src)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a new FileReader innstance
          const reader = new FileReader();
          // Add a listener to handle successful reading of the blob
          reader.addEventListener("load", () => {
            // Set the src attribute of the image to be the resulting data URL
            // obtained after reading the content of the blob
            var link = document.createElement("a");

            //Extract extension from url
            let extension = image.src.split(".").pop();
            extension = extension.split("?").shift();

            //set filename to image plus random generated number
            let filename = "image" + Math.floor(Math.random() * 100000);
            if (extension.length > 3) {
              window.$message.error("Cannot download this specific image");
              return;
            }

            link.setAttribute("download", filename + "." + extension);
            link.href = reader.result;
            document.body.appendChild(link);
            link.click();
            link.remove();
          });

          // Start reading the content of the blob
          // The result should be a base64 data URL
          reader.readAsDataURL(blob);
        });
    },
    openImageDrawer(image) {
      this.imageForImageDrawer = image;
      this.imageDrawerActive = true;
    },
    analyzeWebsite(url) {
      //Loading animation

      // fetch website content from url
      // return content
      if (url === "" || url === undefined) {
        window.$message.warning("Please enter a URL");
        document.querySelectorAll("input.n-input__input-el")[0].focus();
        return;
      }
      //Check if url is valid
      if (!url.startsWith("http")) {
        window.$message.warning("Please enter a valid and complete URL");
        document.querySelectorAll("input.n-input__input-el")[0].focus();
        return;
      }

      window.$loadingbar.start();
      this.analysingWebsite = true;

      fetch(url)
        .then((response) => {
          // The API call was successful!
          return response.text();
        })
        .then((html) => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          this.buildStatisticsForWebsite(doc);
          window.$message.success("Succesfully fetched website content");
          window.$loadingbar.finish();
          this.analysingWebsite = false;
        })
        .catch((err) => {
          // There was an error
          window.$notification.error({
            title: "Error",
            content: err.toString(),
          });
          this.showModalCORSExtension = true;
          this.analysedDocumentElementCount = undefined;
          this.allImagesFromDocument = undefined;
          this.analysingWebsite = false;
        });
    },
    buildStatisticsForWebsite(doc) {
      this.setCountForCommonElements(doc);
      this.getAllImagesFromDocument(doc);
      this.getMetaInformationFromDocument(doc);
      this.getSEOPerformance(doc);
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
      let scriptCount = doc.getElementsByTagName("script").length;

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
        scriptCount: scriptCount,
      };
    },
    getAllImagesFromDocument(doc) {
      let images = doc.getElementsByTagName("img");
      //Remove the image in images that are duplicate
      let imagesWithoutDuplicates = [];
      for (let i = 0; i < images.length; i++) {
        if (imagesWithoutDuplicates.indexOf(images[i]) === -1) {
          if (images[i].src === "") {
            images[i].src = "EMPTY";
          }
          //Don't push when src contains localhost -> unreachable image
          if (
            !images[i].src.includes("localhost") ||
            !images[i].src.includes("EMPTY")
          ) {
            imagesWithoutDuplicates.push(images[i]);
          }
        }
      }

      this.allImagesFromDocument = imagesWithoutDuplicates;
    },
    getMetaInformationFromDocument(doc) {
      //Get meta element with name="description"
      let metaDescription = doc.querySelector(
        'meta[name="description"]'
      ).content;

      //Get meta element with name="keywords"
      let metaKeywords = doc.querySelector('meta[name="keywords"]');
      if (metaKeywords !== null) {
        metaKeywords = metaKeywords.content;
      }

      //Get meta element with name="author"
      let metaAuthor = doc.querySelector('meta[name="author"]');
      if (metaAuthor !== null) {
        metaAuthor = metaAuthor.content;
      }
      //Get meta element with name="robots"
      let metaRobots = doc.querySelector('meta[name="robots"]');
      if (metaRobots !== null) {
        metaRobots = metaRobots.content;
      }
      //Get meta element with name="revisit-after"
      let metaRevisitAfter = doc.querySelector('meta[name="revisit-after"]');
      if (metaRevisitAfter !== null) {
        metaRevisitAfter = metaRevisitAfter.content;
      }
      //Get meta element with name="viewport"
      let metaViewport = doc.querySelector('meta[name="viewport"]');
      if (metaViewport !== null) {
        metaViewport = metaViewport.content;
      }

      //Get meta element with name="generator"
      let metaGenerator = doc.querySelector('meta[name="generator"]');
      if (metaGenerator !== null) {
        metaGenerator = metaGenerator.content;
      }
      //Get meta element with name="copyright"
      let metaCopyright = doc.querySelector('meta[name="copyright"]');
      if (metaCopyright !== null) {
        metaCopyright = metaCopyright.content;
      }
      //Get meta element with name="language"
      let metaLanguage = doc.querySelector('meta[name="language"]');
      if (metaLanguage !== null) {
        metaLanguage = metaLanguage.content;
      }
      //Get meta element with name="rating"
      let metaRating = doc.querySelector('meta[name="rating"]');
      if (metaRating !== null) {
        metaRating = metaRating.content;
      }
      //Get meta element with name="category"
      let metaCategory = doc.querySelector('meta[name="category"]');
      if (metaCategory !== null) {
        metaCategory = metaCategory.content;
      }

      this.metaDataObj = {
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
        metaAuthor: metaAuthor,
        metaRobots: metaRobots,
        metaRevisitAfter: metaRevisitAfter,
        metaViewport: metaViewport,
        metaGenerator: metaGenerator,
        metaCopyright: metaCopyright,
        metaLanguage: metaLanguage,
        metaRating: metaRating,
        metaCategory: metaCategory,
      };
    },
    getSEOPerformance(doc) {
      //Get count of images that do not have an alt attribute
      let imagesWithoutAlt = 0;
      let imgs = doc.getElementsByTagName("img");
      for (let img of imgs) {
        if (img.alt === "") {
          imagesWithoutAlt++;
          img.style.border = "1px solid red";
        }
      }

      let imagesWithAlt = imgs.length - imagesWithoutAlt;
      let imgWithoutAlt = imagesWithoutAlt;
      let imgWithAltPercentage = (imgs.length - imagesWithoutAlt) / imgs.length;
      let imgWithoutAltPercentage = (imagesWithoutAlt / imgs.length) * 100;

      let metaScore = (this.metaDataObjLength() / 10) * 100;
      let totalScore = metaScore + imgWithAltPercentage;
      this.seoScoreObj = {
        imagesWithAlt: imagesWithAlt,
        imagesWithoutAlt: imgWithoutAlt,
        imagesWithAltPercentage: imgWithAltPercentage.toFixed(2),
        imagesWithoutAltPercentage: imgWithoutAltPercentage.toFixed(2),
        seoTotalScore: totalScore.toFixed(2),
      };
    },
  },
  setup() {
    window.$notification = useNotification();
    window.$message = useMessage();
    window.$loadingbar = useLoadingBar();
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

  &:hover {
    border: 2px solid white;
  }
}

#installExtensionBtn {
  text-decoration: none;
}

.drawerImagePreview {
  width: 100%;
  height: auto;
}
.metaCard {
  p {
    font-size: 18px;
  }
}
</style>

