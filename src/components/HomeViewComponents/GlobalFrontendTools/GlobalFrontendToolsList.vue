<template>
  <section>
    <a
      @click="openLink(tool.link)"
      v-for="tool of $store.state.globalFrontendTools"
      :key="tool"
    >
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
  align-items: flex-end;
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