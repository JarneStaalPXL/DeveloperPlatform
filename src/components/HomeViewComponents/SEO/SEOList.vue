<template>
  <section class="seoListContainer">
    <a @click="$router.push($store.state.routings.domAnalyzer.path)">
      <div class="item">
        <p>DOM Analyser</p>
      </div>
    </a>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.seoListContainer {
  display: flex;
  gap: 50px;
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