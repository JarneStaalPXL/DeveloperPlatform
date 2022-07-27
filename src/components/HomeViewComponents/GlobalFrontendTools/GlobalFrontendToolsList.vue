<template>
  <section class="colorGeneratorContainer">
    <a @click="openLink(tool.link)" v-for="tool of tools" :key="tool">
      <div
        class="item"
        :style="{
          backgroundImage:
            'url(' +
            (tool.websitePreviewImage
              ? tool.websitePreviewImage
              : websitePreviewImagePlaceholder) +
            ')',
          backgroundPosition: tool.websitePreviewImage ? '' : 'center',
        }"
      >
        <p
          v-if="tool.name"
          :style="{ color: tool.textColor ? tool.textColor : 'white' }"
        >
          {{ tool.name }}
        </p>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      websitePreviewImagePlaceholder: require("../../../assets/coming-soon.jpg"),
      tools: [
        {
          name: "Online Tools Toolbox",
          link: "https://10015.io/",
          websitePreviewImage: require("../../../assets/toolsio.png"),
          textColor: null,
        },
        {
          name: "Animated Backgrounds",
          link: "https://animatedbackgrounds.me",
          websitePreviewImage: require("../../../assets/animatedbackgrounds.gif"),
          textColor: null,
        },
        {
          name: "Retro Game Creator (JS Library)",
          link: "https://kaboomjs.com/",
          websitePreviewImage: require("../../../assets/kaboomjs.jpg"),
        },
        {
          name: "SVG Pattern Generator",
          link: "https://patternpad.com/",
          websitePreviewImage: require("../../../assets/patternpad.svg"),
        },
        {
          name: "CSS Loaders",
          link: "https://whirl.netlify.app/",
          websitePreviewImage: require("../../../assets/whirl.png"),
        },
        {
          name: "CSS Key Frames Creator",
          link: "https://keyframes.app/",
          websitePreviewImage: require("../../../assets/keyframescreator.png"),
        },
        {
          name: "Toast Alert Library",
          link: "https://apvarun.github.io/toastify-js/",
          websitePreviewImage: require("../../../assets/toastify.png"),
        },
        {
          name: "Input auto-formatter",
          link: "https://nosir.github.io/cleave.js/",
          websitePreviewImage: require("../../../assets/cleave.png"),
        },
        {
          name: "Mesh Gradient Generator",
          link: "https://csshero.org/mesher/",
          websitePreviewImage: require("../../../assets/mesher.png"),
        },
      ],
    };
  },
  methods: {
    openLink(url) {
      if (url === "" || url === undefined) {
        return;
      }
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  // border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: end;
  background: black;
  background-size: cover;

  p {
    font-size: 18px;
    background: black;
    padding: 20px;
    border-radius: 15px;
    color: white;
    transition: opacity 0.3s ease-in-out;
    margin: 0;
    width: 100%;
  }

  &:hover {
    // border: 2px solid white;
    //set cursor to click
    cursor: pointer;
    p {
      transition: opacity 0.3s ease-in-out;
      opacity: 0;
      //disable selection
      user-select: none;
    }
  }
}
</style>