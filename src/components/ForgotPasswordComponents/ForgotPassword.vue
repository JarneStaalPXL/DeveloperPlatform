<template>
    <n-config-provider
    :theme="darkTheme"
    class="d-flex justify-content-center align-center bg"
    style="height: 100vh"
  >
    <section class="loginSection m-auto">
      <div class="d-flex mb-2 inputContainer">
        <n-auto-complete
          :options="options"
          type="email"
          placeholder="Email"
          v-model:value="email"
        ></n-auto-complete>
    <n-button @click="forgotPassword(email)">Forgot password</n-button>
      </div>
    </section>
  </n-config-provider>
</template>

<script>
import { ref, computed } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  NButton,
  NInput,
  useMessage,
  useLoadingBar,
  useNotification,
    NAutoComplete,
    darkTheme,
    NConfigProvider
} from "naive-ui";
export default {
  components: {
    NButton,
    NInput,
    NAutoComplete,
    NConfigProvider
  },
  mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    window.$notification = useNotification();
  },
  beforeUnmount(){
    window.$notification.destroyAll();
  },
  methods: {
    async forgotPassword(email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          window.$notification.success({
            title: "Password reset email sent",
            content: "Check SPAM if you cannot find it in your inbox.",
          });
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
  },
  setup() {
    const valueRef = ref("");
    return {
      darkTheme,
      email: valueRef,
      options: computed(() => {
        return [
          "@gmail.com",
          "@yahoo.com",
          "@hotmail.com",
          "@outlook.com",
          "@apple.com",
        ].map((suffix) => {
          const prefix = valueRef.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          };
        });
      }),
    };
  },
};
</script>

<style lang="scss" scoped>
    .buttonContainer {
      gap: 5px;
    }
    .loginSection {
      width: 50%;
    }
    .inputContainer {
      gap: 10px;
    }
    .bg {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: 300% 300%;
      background-image: linear-gradient(
        -45deg,
        rgba(59, 173, 227, 1) 0%,
        rgba(87, 111, 230, 1) 25%,
        rgba(152, 68, 183, 1) 51%,
        rgba(255, 53, 127, 1) 100%
      );
      animation: AnimateBG 20s ease infinite;
    }
    
    @keyframes AnimateBG {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    @media only screen and (max-width: 750px) {
      .loginSection {
        width: 75%;
      }
      .inputContainer {
        gap: 5px;
        flex-direction: column;
      }
      .buttonContainer {
        gap: 5px;
      }
    }
    </style>
    