<template>
  <section class="colorGeneratorContainer">
    <a @click="$router.push($store.state.routings.colorLightenerDarker.path)">
      <div class="item" id="colorLightenerDarkerBox">
        <p>Color Lightener/Darker</p>
      </div>
    </a>
    <a @click="$router.push($store.state.routings.colorPalleteGenerator.path)">
      <div class="item" id="colorPalleteGeneratorBox">
        <p>Color Pallete Generator</p>
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
  background: url("../../../../src/assets/colorGradient.png");
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
  }

  &:hover {
    border: 2px solid white;
  }
}
</style>