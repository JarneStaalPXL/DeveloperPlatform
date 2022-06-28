<template>
  <section class="gradientGenerators">
    <a
      @click="$router.push($store.state.routings.lineargradientgenerator.path)"
    >
      <div
        class="gradientBox"
        style="background: linear-gradient(to right, #a6a4de, #6619f3)"
      >
        <p>Linear Gradient Generator</p>
      </div>
    </a>

    <a
      @click="$router.push($store.state.routings.radialgradientgenerator.path)"
    >
      <div
        class="gradientBox"
        style="background: radial-gradient(#a6a4de, #6619f3)"
      >
        <p>Radial Gradient Generator</p>
      </div>
    </a>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.gradientGenerators {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 0 !important;
}

.gradientBox {
  width: 300px;
  margin: auto;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 18px;
  }
  &:hover {
    border: 2px solid white;
  }
}
</style>