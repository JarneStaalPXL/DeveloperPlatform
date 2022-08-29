<template>
  <section class="colorGeneratorContainer">
    <a 
      v-for="gradientGenerator of $store.state.colorGeneratorsTools"
      :key="gradientGenerator"
      @click="
        gradientGenerator.available === true
          ? $router.push(gradientGenerator.link)
          : comingSoonAlert()
      "
    >
      <div class="item" :style="gradientGenerator.css">
        <p>{{ gradientGenerator.name }}</p>
      </div>
    </a>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#colorLightenerDarkerBox {
  background: rgb(166, 164, 222);
}

#colorPalleteGeneratorBox {
  background: url("../../../../src/assets/colorGradient.jpg");
  background-size: 100% 100%;
}

.colorGeneratorContainer {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 0 !important;
}

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

  p {
    font-size: 18px;
    align-self: flex-end;
    width: 100%;
    margin-bottom: 0;
    padding: 15px;
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
  .colorGeneratorContainer {
    a {
      width: 100%;
    }

    .item {
      width: 100%;
    }
  }
}
</style>
