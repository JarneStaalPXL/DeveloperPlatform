<template>
  <n-modal v-model:show="$store.state.showInfoModal" preset="card" class="feedbackModal">
    <div>
      <section class="explanationContainer">
        <h1>Developer Platform</h1>
        <p>Useful tools you can use for your website and design.<br /></p>
      </section>

      <section class="developmentSection">
        <h6 class="mt-3">
          Developer Platform is a platform where you can favorite all the useful tools you
          want to use. It's continously expanding features and possibilities.
        </h6>
        <h6 class="mt-3" v-if="!$store.state.isLoggedIn">
          To have access to the Quick Access dashboard, you need to
          <a @click="$router.push('login')">log in</a> or
          <a @click="$router.push('register')">sign up</a>.
        </h6>
        <h6 class="mt-3" v-if="$store.state.isLoggedIn">
          This homepage offers a Quick Access dashboard, where you can have up to 6 of
          your favorites for easy access. Configure these on
          <a href="favorites">favorites</a>
        </h6>
        <h6 class="mt-3">
          <a
            href="https://github.com/DeveloperJarne/DeveloperPlatform/issues/new"
            target="_blank"
            >Open an issue</a
          >
          to request a feature.<br />
          You can also contribute to the project by forking it on
          <a href="https://github.com/DeveloperJarne/DeveloperPlatform" target="_blank"
            >GitHub</a
          >.
        </h6>
        <h6 class="mt-3" id="submitFeedback">
          <a @click="$store.commit('setShowFeedbackModal', true)">Submit feedback</a> to
          let me know what you think of the platform.
        </h6>
        <h6 class="mt-3">
          <a href="https://discord.gg/3nfeEgcYgh" target="_blank"
            >Join our community on Discord</a
          >
        </h6>
        <div>
          <h6 class="mt-5">Current status:</h6>
          <n-tag :type="currentStatusObj.typeOfStatus">{{
            currentStatusObj.currentStatus
          }}</n-tag>
        </div>
        <n-button
          class="mt-3"
          v-if="!$route.path.includes('/processedFeedbacks')"
          @click="openHandledFeedback()"
          >Show handled feedback</n-button
        >
      </section>
    </div>
    <!-- <template #action>
      <n-button @click="submitFeedback()" class="w-100">Submit</n-button>
    </template> -->
  </n-modal>
</template>

<script>
import { ref } from "vue";
import { NForm, NFormItem, NCard, NButton, NInput, NModal, NTag } from "naive-ui";
export default {
  name: "FeedbackComponent",
  components: {
    NForm,
    NFormItem,
    NCard,
    NButton,
    NInput,
    NModal,
    NTag,
  },
  beforeMount() {
    this.getCurrentStatus();
  },
  data() {
    return {
      currentStatusObj: {
        typeOfStatus: "info",
        currentStatus: "DEVELOPMENT",
      },
      formValue: ref({
        user: {
          title: "",
          description: "",
        },
      }),
      rules: {
        user: {
          title: {
            required: true,
            message: "Please input a title",
            trigger: "blur",
          },
          description: {
            required: true,
            message: "Please input a description",
            trigger: ["input", "blur"],
          },
        },
      },
    };
  },
  methods: {
    async getCurrentStatus() {
      let result = await this.$store.dispatch("GET_CURRENT_STATUS");
      this.currentStatusObj = result.data.attributes;
    },
    openHandledFeedback() {
      this.$store.commit("setShowInfoModal", false);
      this.$router.push("/processedFeedbacks");
    },
  },
};
</script>

<style lang="scss">
.developmentSection {
  text-align: left;
  width: 90%;
  word-wrap: break-word;
  margin: auto;
  margin-bottom: 45px;

  a {
    color: #2bd48c;

    &:hover {
      cursor: pointer;
    }
  }
}
.explanationContainer {
  width: 90%;
  margin: auto;
  h1 {
    font-weight: 600;
  }
  h1,
  p {
    margin-bottom: 0;
    text-align: left;
    background: linear-gradient(to right, #1ea4e9, #36fd3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  // margin-bottom: 100px;
}
.feedbackModal {
  width: 650px;
}
@media only screen and (max-width: 980px) {
  .explanationContainer p {
    font-size: 15;
    width: 75vw;
    margin: auto;
    margin-bottom: 25px;
  }
}

@media only screen and (max-width: 650px) {
  .feedbackModal {
    width: 85%;
  }
}
</style>
