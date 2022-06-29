<template>
  <n-config-provider :theme="darkTheme">
    <n-card class="titleCard">
      <template #header>
        <div class="d-flex justify-content-between">
          <p class="title">Frontend Platform</p>

          <Transition appear>
            <n-avatar v-if="$store.state.isLoggedIn" size="large" :style="{
              color: 'white',
              backgroundColor: '#A097E0',
              marginTop: 'auto',
              marginBottom: 'auto',
            }">{{ userName ? userName.toUpperCase() : "" }}</n-avatar>
          </Transition>
        </div>
      </template>
    </n-card>
    <n-card class="categoryCard" :style="{ marginTop: '30px' }">
      <!--card header template-->
      <template #header>
        <div class="d-flex" style="gap: 10px">
          <h4>Gradient Generators</h4>
          <n-badge :value="2" color="grey" />
        </div>
      </template>
      <GradientGeneratorsList />
    </n-card>

    <n-card class="categoryCard" :style="{ marginTop: '30px' }">
      <!--card header template-->
      <template #header>
        <div class="d-flex" style="gap: 10px">
          <h4>SEO</h4>
          <n-badge :value="1" color="grey" />
        </div>
      </template>
      <SEOList />
    </n-card>
  </n-config-provider>
</template>

<script>
import GradientGeneratorsList from "@/components/HomeViewComponents/GradientGenerators/GradientGeneratorsList.vue";
import SEOList from "@/components/HomeViewComponents/SEO/SEOList.vue";
import { NCard, NConfigProvider, darkTheme, NAvatar, NBadge } from "naive-ui";
export default {
  name: "HomeView",
  components: {
    NCard,
    NConfigProvider,
    NAvatar,
    NBadge,
    GradientGeneratorsList,
    SEOList,
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

.titleCard,
.categoryCard {
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