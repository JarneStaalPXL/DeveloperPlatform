<template>
  <section class="providersContainer">
    <a
      v-for="provider of $store.state.hostingproviders"
      :key="provider"
      @click="openLink(provider.link)"
    >
      <div
        class="item"
        :style="{
          backgroundImage:
            'url(' +
            (provider.websitePreviewImage ? provider.websitePreviewImage : '') +
            ')',
          backgroundPosition: provider.websitePreviewImage ? '' : 'center',
          backgroundSize: '100% 100%',
        }"
      >
        <p :style="{ color: provider.textColor ? provider.textColor : 'white' }">
          {{ provider.name }}
        </p>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openLink(url) {
      if (url === "" || url === undefined) {
        return;
      }
      window.open(url, "_blank");
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", url);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
  },
};
</script>

<style lang="scss" scoped>
.providersContainer {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 0 !important;
}

.item {
  width: 300px;
  height: 300px;
  border-radius: 15px;

  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;

  p {
    font-size: 18px;
    color: white;
    background: black;
    padding: 13px;
    width: 100%;
    align-self: flex-end;
    margin-bottom: 0;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  &:hover {
    border: 2px solid white;
    cursor: pointer;
  }
}

@media only screen and (max-width: 790px) {
  .providersContainer {
    justify-content: center;

    a {
      width: 100%;
    }
    .item {
      width: 100%;
    }
  }
}
</style>
