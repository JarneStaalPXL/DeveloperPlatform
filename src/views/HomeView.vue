<template>
  <n-config-provider :theme="darkTheme">
    <n-card class="titleCard">
      <template #header><p id="title">Frontend Platform</p></template>
    </n-card>
    <section class="gradientGenerators mt-5 pt-5">
      <a @click="$router.push('/LinearGradientGenerator')">
        <n-card title="Linear Gradient Generator">
          <div
            class="gradientBox"
            style="background: linear-gradient(to right, #a6a4de, #6619f3)"
          ></div>
        </n-card>
      </a>

      <a @click="$router.push('/RadialGradientGenerator')">
        <n-card title="Radial Gradient Generator">
          <div
            class="gradientBox"
            style="background: radial-gradient(#a6a4de, #6619f3)"
          ></div>
        </n-card>
      </a>
    </section>
  </n-config-provider>
</template>

<script>
import { NCard, NConfigProvider, darkTheme } from "naive-ui";
export default {
  name: "HomeView",
  components: {
    NCard,
    NConfigProvider,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>


<style lang="scss" scoped>
h1 {
  color: white;
}
.gradientBox {
  width: 300px;
  margin: auto;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 0;
}

.gradientGenerators {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
}
.titleCard,
.gradientGenerators {
  margin: auto;
  width: 85vw;
}
a {
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 30px;
  transition: ease-in-out 0.3s;
  &:hover {
    border: 2px solid white;
  }
}
// .n-card.n-card--bordered {
//   border: 2px solid transparent;
//   &:hover .radio-btns__btn:not(:hover) {
//     filter: grayscale(100%);
//   }
// }
// .n-card.n-card--bordered:hover {
//   border: 2px solid white;
// }

#title {
  font-size: 30px;
  margin: 0;
  padding: 0;
}
</style>