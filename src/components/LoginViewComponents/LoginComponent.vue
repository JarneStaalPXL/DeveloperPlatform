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
        <n-input
          type="password"
          show-password-on="click"
          placeholder="Password"
          v-model:value="password"
        ></n-input>
      </div>
      <div class="w-100 d-flex flex-column buttonContainer">
        <n-button class="w-100" @click="signIn(email, password)"
          >Sign in</n-button
        >

        <n-button @click="forgotPassword(email)">Forgot password</n-button>
        <n-button class="w-100 mt-5" @click="googleSignin()"
          ><span style="margin-right: 5px">Log in with </span>
          <i class="fa-brands fa-google" style="margin-right: 2px"></i
          >oogle</n-button
        >
      </div>
    </section>
  </n-config-provider>
</template>

<script>
import { ref, computed } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import {
  NButton,
  NInput,
  useMessage,
  useLoadingBar,
  NCard,
  NSpace,
  darkTheme,
  NAutoComplete,
  NConfigProvider,
  useNotification,
} from "naive-ui";
export default {
  components: {
    NButton,
    NInput,
    NCard,
    NSpace,
    NAutoComplete,
    NConfigProvider,
  },
  data() {
    return {
      //   email: null,
      password: null,
    };
  },
  mounted() {
    window.$loadingbar = useLoadingBar();
    window.$message = useMessage();
    window.$notification = useNotification();
  },
  methods: {
    async forgotPassword(email) {
      console.log(email);
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          window.$notification.success({
            title: "Password reset email sent",
            content: "Check SPAM if you cannot find it in your inbox."
          })
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    },
    async googleSignin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          await this.$store.dispatch("CREATE_ACCOUNT", result.user);
          await this.$store.dispatch("GET_PAGE_VISITS");
          await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    signIn(email, password) {
      if (email === "" || password === null) {
        window.$message.error("Please fill in all fields");
        return;
      }
      window.$loadingbar.start();
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          window.$message.success("Successfully logged in.");
          await this.$store.dispatch("CREATE_ACCOUNT", user);
          await this.$store.dispatch("GET_PAGE_VISITS");
          await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
          window.$loadingbar.finish();
          this.$router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode.includes("user-not-found")) {
            window.$message.error("User is not registered.");
            window.$loadingbar.error();
            return;
          } else if (errorCode.includes("wrong-password")) {
            window.$message.error("Wrong password.");
            window.$loadingbar.error();
            return;
          } else if (errorCode.includes("invalid-email")) {
            window.$message.error("Invalid email.");
            window.$loadingbar.error();
          } else {
            window.$message.error(errorMessage);
            window.$loadingbar.error();
          }
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
