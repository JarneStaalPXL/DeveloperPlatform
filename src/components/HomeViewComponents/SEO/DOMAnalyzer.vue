<template>
  <n-space vertical>
    <!--Inputs-->
    <n-card>
      <n-button @click="playNumberAnimation()">Number animation</n-button>
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
            <n-number-animation
              ref="numberAnimationInstRef1"
              :from="0"
              :to="analysedDocumentElementCount.h1Count"
              :active="false"
            />
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 2">
            <n-number-animation
              ref="numberAnimationInstRef2"
              :from="0"
              :to="analysedDocumentElementCount.h2Count"
              :active="false"
            />
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 3">
            <n-number-animation
              ref="numberAnimationInstRef3"
              :from="0"
              :to="analysedDocumentElementCount.h3Count"
              :active="false"
            />
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 4">
            <n-number-animation
              ref="numberAnimationInstRef4"
              :from="0"
              :to="analysedDocumentElementCount.h5Count"
              :active="false"
            />
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 5">
            <n-number-animation
              ref="numberAnimationInstRef5"
              :from="0"
              :to="analysedDocumentElementCount.h5Count"
              :active="false"
            />
          </n-statistic>
        </n-col>
        <n-col :span="5">
          <n-statistic label="Heading 6">
            <n-number-animation
              ref="numberAnimationInstRef6"
              :from="0"
              :to="analysedDocumentElementCount.h6Count"
              :active="false"
            />
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Paragraphs">
            <n-number-animation
              ref="numberAnimationInstRef7"
              :from="0"
              :to="analysedDocumentElementCount.pCount"
              :active="false"
            />
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Images">
            <n-number-animation
              ref="numberAnimationInstRef8"
              :from="0"
              :to="analysedDocumentElementCount.imgCount"
              :active="false"
            />
          </n-statistic>
        </n-col>

        <n-col :span="5">
          <n-statistic label="Scripts">
            <n-number-animation
              ref="numberAnimationInstRef9"
              :from="0"
              :to="analysedDocumentElementCount.scriptCount"
              :active="false"
            />
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
          :alt="image.alt"
          :key="index"
          :class="{ redborder: image.alt === '' }"
          :style="{
            backgroundImage: `url(${image.src})`,
          }"
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
        <n-alert
          v-if="imageHasAlt === false"
          title="SEO Warning"
          type="warning"
          class="mb-2"
        >
          Image does not have an alt attribute which has a negative impact on
          SEO
          <br />
          <br />
          <a
            href="https://www.innovationvisual.com/knowledge/why-image-alt-text-is-important-for-seo#:~:text=This%20is%20because%20search%20engines,when%20they%20are%20searching%20online."
            target="_blank"
            >Read more about it</a
          >
        </n-alert>
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
  NAlert,
  NNumberAnimation,
} from "naive-ui";
import { ref } from "vue";
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
    NAlert,
    NNumberAnimation,
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
      imageHasAlt: undefined,
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
      this.imageHasAlt = image.alt ? true : false;
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
          window.$loadingbar.error();
          window.$notification.error({
            title: "Error",
            content: err.toString(),
          });
          this.showModalCORSExtension = true;
          this.analysedDocumentElementCount = undefined;
          this.allImagesFromDocument = undefined;
          this.analysingWebsite = false;
          this.seoScoreObj = undefined;
          this.metaDataObj = undefined;
        });
    },
    buildStatisticsForWebsite(doc) {
      this.setCountForCommonElements(doc);
      this.getAllImagesFromDocument(doc);
      this.getMetaInformationFromDocument(doc);
      this.getSEOPerformance(doc);
      setTimeout(() => {
        this.playNumberAnimation();
      }, 200);
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
    async getAllImagesFromDocument(doc) {
      let images = doc.getElementsByTagName("img");
      //Remove the image in images that are duplicate
      let imagesWithoutDuplicates = [];
      for (let i = 0; i < images.length; i++) {
        if (imagesWithoutDuplicates.indexOf(images[i]) === -1) {
          if (images[i].src === "") {
            images[i].src = "EMPTY";
          }
          //Don't push when src contains localhost -> unreachable image
          //TODO:
          if (
            !images[i].src.includes("localhost") ||
            !images[i].baseURI.includes("localhost") ||
            (!images[i].src.includes("EMPTY") &&
              !images[i].src.includes("data:"))
          ) {
            imagesWithoutDuplicates.push(images[i]);
          }
        }
      }
      this.allImagesFromDocument = imagesWithoutDuplicates;
    },
    getMetaInformationFromDocument(doc) {
      //Get meta element with name="description"
      let metaDescription = doc.querySelector('meta[name="description"]');
      if (metaDescription !== null) {
        metaDescription = metaDescription.content;
      }

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
          // img.style.border = "2px solid red";
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

    const numberAnimationInstRef1 = ref(null);
    const numberAnimationInstRef2 = ref(null);
    const numberAnimationInstRef3 = ref(null);
    const numberAnimationInstRef4 = ref(null);
    const numberAnimationInstRef5 = ref(null);
    const numberAnimationInstRef6 = ref(null);
    const numberAnimationInstRef7 = ref(null);
    const numberAnimationInstRef8 = ref(null);
    const numberAnimationInstRef9 = ref(null);
    return {
      numberAnimationInstRef1,
      numberAnimationInstRef2,
      numberAnimationInstRef3,
      numberAnimationInstRef4,
      numberAnimationInstRef5,
      numberAnimationInstRef6,
      numberAnimationInstRef7,
      numberAnimationInstRef8,
      numberAnimationInstRef9,

      playNumberAnimation() {
        numberAnimationInstRef1.value?.play();
        numberAnimationInstRef2.value?.play();
        numberAnimationInstRef3.value?.play();
        numberAnimationInstRef4.value?.play();
        numberAnimationInstRef5.value?.play();
        numberAnimationInstRef6.value?.play();
        numberAnimationInstRef7.value?.play();
        numberAnimationInstRef8.value?.play();
        numberAnimationInstRef9.value?.play();
      },
    };
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

.redborder {
  border: 2px solid orange;
}

a {
  color: white;
  &:hover {
    color: gray;
  }
}
</style>

