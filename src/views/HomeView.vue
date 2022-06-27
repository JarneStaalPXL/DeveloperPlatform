<template>
  <n-config-provider :theme="darkTheme">
    <n-card class="titleCard">
      <template #header>
        <div class="d-flex justify-content-between">
          <p class="title">Frontend Platform</p>

          <Transition appear>
            <n-avatar
              v-if="$store.state.isLoggedIn"
              size="large"
              :style="{
                color: 'white',
                backgroundColor: '#243834',
                marginTop: 'auto',
                marginBottom: 'auto',
              }"
              >{{ userName ? userName.toUpperCase() : "" }}</n-avatar
            >
          </Transition>
        </div>
      </template>
    </n-card>
    <n-card
      class="gradientGeneratorCard"
      title="Gradient Generators"
      :style="{ marginTop: '30px' }"
    >
      <section class="gradientGenerators mt-5 pt-5">
        <a @click="$router.push('/LinearGradientGenerator')">
          <div
            class="gradientBox"
            style="background: linear-gradient(to right, #a6a4de, #6619f3)"
          >
            <p>Linear Gradient Generator</p>
          </div>
        </a>

        <a @click="$router.push('/RadialGradientGenerator')">
          <div
            class="gradientBox"
            style="background: radial-gradient(#a6a4de, #6619f3)"
          >
            <p>Radial Gradient Generator</p>
          </div>
        </a>
      </section>
    </n-card>
  </n-config-provider>
</template>

<script>
import { NCard, NConfigProvider, darkTheme, NAvatar } from "naive-ui";
export default {
  name: "HomeView",
  components: {
    NCard,
    NConfigProvider,
    NAvatar,
  },
  setup() {
    return {
      darkTheme,
    };
  },
  methods: {},
  computed: {
    userName() {
      let username = localStorage.getItem("userName");
      if (username) {
        return username.split(" ")[0][0] + username.split(" ")[1][0];
      } else if (this.$store.state.name) {
        return (
          this.$store.state.name.split(" ")[0][0] +
          this.$store.state.name.split(" ")[1][0]
        );
      }
      return null;
    },
  },
};
</script>


<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#name {
  margin-top: auto;
}
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

.gradientGenerators {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 0 !important;
}
.titleCard,
.gradientGeneratorCard {
  margin: auto;
  width: 85vw;
}
.titleCard {
  margin-top: 30px;
}
a {
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 30px;
  transition: ease-in-out 0.3s;
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

.title {
  font-size: 30px;
  margin: 0;
  padding: 0;
}
</style>