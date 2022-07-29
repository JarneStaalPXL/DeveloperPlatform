<template>
  <section>
    <a @click="openLink(tool.link)" v-for="tool of tools" :key="tool">
      <div class="item" :style="{
        backgroundImage:
          'url(' +
          (tool.websitePreviewImage
            ? tool.websitePreviewImage
            : websitePreviewImagePlaceholder) +
          ')',
        backgroundPosition: tool.websitePreviewImage ? '' : 'center',
      }">
        <p v-if="tool.name" :style="{ color: tool.textColor ? tool.textColor : 'white' }">
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
          textColor: "black",
        },
        {
          name: "SVG Illustrations",
          link: "https://undraw.co/illustrations",
          websitePreviewImage: require("../../../assets/undraw.png"),
          textColor: "black",
        },
        {
          name: "Illustrations and Icons",
          link: "https://iconscout.com/",
          websitePreviewImage: require("../../../assets/iconscout.png"),
          textColor: "black",
        },
        {
          name: "SVG Blob Generator",
          link: "https://www.blobmaker.app/",
          websitePreviewImage: require("../../../assets/blobmaker.png"),
          textColor: "black",
        },
        {
          name: "Chart Library",
          link: "https://apexcharts.com/",
          websitePreviewImage: require("../../../assets/apexcharts.png"),
          textColor: "black",
        },
        {
          name: "Toast Alert Library",
          link: "https://apvarun.github.io/toastify-js/",
          websitePreviewImage: require("../../../assets/toastify.png"),
          textColor: "black",
        },
        {
          name: "Input auto-formatter",
          link: "https://nosir.github.io/cleave.js/",
          websitePreviewImage: require("../../../assets/cleave.png"),
          textColor: "black",
        },

        {
          name: "CSS Key Frame Creator",
          link: "https://keyframes.app/",
          websitePreviewImage: require("../../../assets/keyframescreator.png"),
        },
        {
          name: "Retro Game Creator (JS Library)",
          link: "https://kaboomjs.com/",
          websitePreviewImage: require("../../../assets/kaboomjs.jpg"),
        },
        {
          name: "Animation Library",
          link: "https://greensock.com/gsap/",
          websitePreviewImage: require("../../../assets/greensock.png"),
        },
        {
          name: "Animated Backgrounds",
          link: "https://animatedbackgrounds.me",
          websitePreviewImage: require("../../../assets/animatedbackgrounds.gif"),
          textColor: null,
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
          textColor: "black",
        },

        {
          name: "CSS Animated Backgrounds",
          link: "https://alvarotrigo.com/blog/animated-backgrounds-css/",
          websitePreviewImage: require("../../../assets/animatedbackgrounds.png"),
        },
        {
          name: "Mesh Gradient Generator",
          link: "https://csshero.org/mesher/",
          websitePreviewImage: require("../../../assets/mesher.png"),
        },

        {
          name: "Visual Effects Library",
          link: "https://party.js.org/",
          websitePreviewImage: require("../../../assets/party.png"),
        },

        {
          name: "Glassmorphism Generator",
          link: "https://hype4.academy/tools/glassmorphism-generator",
          websitePreviewImage: require("../../../assets/glassmorphism.png"),
        },
        {
          name: "SVG Waves Generator",
          link: "https://getwaves.io/",
          websitePreviewImage: require("../../../assets/wave.svg"),
        },
        {
          name: "Date Functions Library",
          link: "https://date-fns.org/",
          websitePreviewImage: require("../../../assets/date-fns.png"),
        },
        {
          name: "Mockup Creator",
          link: "https://carrd.co/build",
          websitePreviewImage: require("../../../assets/carrd.png"),
          textColor: "black",
        },
        {
          name: "Fully Customizable Chart Library",
          link: "https://gionkunz.github.io/chartist-js/",
          websitePreviewImage: require("../../../assets/chartist.png"),
          textColor: "black",
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
  background-position: center;

  p {
    font-size: 18px;
    background: black;
    padding: 20px;
    transition: opacity 0.3s ease-in-out;
    margin: 0;
    width: 100%;

    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.18);
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