<template>
  <section class="colorGeneratorContainer">
    <a @click="openLink(tool.link)" v-for="tool of tools" :key="tool">
      <div
        class="item"
        :style="{ backgroundImage: 'url(' + tool.websitePreviewImage + ')' }"
      >
        <p>{{ tool.name }}</p>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          name: "Online Tools Toolbox",
          link: "https://10015.io/",
          websitePreviewImage: require("../../../assets/toolsio.png"),
        },
      ],
    };
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 300px;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: black;

  p {
    font-size: 18px;
  }

  &:hover {
    border: 2px solid white;
  }
}
</style>