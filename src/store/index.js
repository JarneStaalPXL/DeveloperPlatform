import { createStore } from "vuex";

export default createStore({
  state: {
    isAdmin: false,
    adminEmail: "jarne.staal9@gmail.com",
    pagevisits: 0,
    baseUrlStrapi: "https://frontendplatformbackend.herokuapp.com",
    baseUrlStrapiApi: "https://frontendplatformbackend.herokuapp.com" + "/api/",
    strapiApiKey:
      "1bad8621f0c81dc23565fd6f813668bfb5f9b32eb678b6f9db74439ac6849d30ac8b5ee03ba74b66c73892a6a291aac2cb6c5899d85aa3851be2ce20cbf8a8bb1c12aed7b1c9a61b2731d5e4e4a86e20b0fe3c6c96c5cd0bf928236d3eda0f609fe998f20b9e95b3f3ed5431ec43dc1c98369f4ef3c713d3bc70d07ab80011b8",
    selectedLinearGradient: {},
    name: "",
    profilepic: "",
    email: "",
    isLoggedIn: false,
    userObj: {},
    loggedInFirebaseUser: null,
    routings: {
      home: {
        path: "/",
        name: "home",
        component: "HomeView",
      },
      lineargradientgenerator: {
        path: "/LinearGradientGenerator",
        name: "lineargradientgenerator",
        component: "LinearGradientGeneratorView",
      },
      radialgradientgenerator: {
        path: "/RadialGradientGenerator",
        name: "radialgradientgenerator",
        component: "RadialGradientGeneratorView",
      },
      websitebuilder: {
        path: "/WebsiteBuilder",
        name: "websitebuilder",
        component: "WebsiteBuilderView",
      },
      domAnalyzer: {
        path: "/DOMAnalyzer",
        name: "domanalyzer",
        component: "DomAnalyzerView",
      },
      responsivityChecker: {
        path: "/ResponsivityChecker",
        name: "responsivitychecker",
        component: "ResponsivityCheckerView",
      },
      colorPalleteGenerator: {
        path: "/colorPalleteGenerator",
        name: "colorpalletegenerator",
        component: "ColorPalleteGeneratorView",
      },
      colorLightenerDarker: {
        path: "/colorlightenerdarker",
        name: "colorlightenerdarker",
        component: "ColorLightenerDarkerView",
      },
    },
    userSavedColorPallets: [],
    globalFrontendTools: [
      {
        name: "Online Tools Toolbox",
        link: "https://10015.io/",
        websitePreviewImage: require("../assets/toolsio.png"),
        textColor: "black",
      },
      {
        name: "SVG Illustrations",
        link: "https://undraw.co/illustrations",
        websitePreviewImage: require("../assets/undraw.png"),
        textColor: "black",
      },
      {
        name: "Illustrations and Icons",
        link: "https://iconscout.com/",
        websitePreviewImage: require("../assets/iconscout.png"),
        textColor: "black",
      },
      {
        name: "SVG Blob Generator",
        link: "https://www.blobmaker.app/",
        websitePreviewImage: require("../assets/blobmaker.png"),
        textColor: "black",
      },
      {
        name: "Chart Library",
        link: "https://apexcharts.com/",
        websitePreviewImage: require("../assets/apexcharts.png"),
        textColor: "black",
      },
      {
        name: "Toast Alert Library",
        link: "https://apvarun.github.io/toastify-js/",
        websitePreviewImage: require("../assets/toastify.png"),
        textColor: "black",
      },
      {
        name: "Input auto-formatter",
        link: "https://nosir.github.io/cleave.js/",
        websitePreviewImage: require("../assets/cleave.png"),
        textColor: "black",
      },

      {
        name: "CSS Key Frame Creator",
        link: "https://keyframes.app/",
        websitePreviewImage: require("../assets/keyframescreator.png"),
      },
      {
        name: "Retro Game Creator (JS Library)",
        link: "https://kaboomjs.com/",
        websitePreviewImage: require("../assets/kaboomjs.jpg"),
      },
      {
        name: "Animation Library",
        link: "https://greensock.com/gsap/",
        websitePreviewImage: require("../assets/greensock.png"),
      },
      {
        name: "Animated Backgrounds",
        link: "https://animatedbackgrounds.me",
        websitePreviewImage: require("../assets/animatedbackgrounds.gif"),
        textColor: null,
      },

      {
        name: "SVG Pattern Generator",
        link: "https://patternpad.com/",
        websitePreviewImage: require("../assets/patternpad.svg"),
      },
      {
        name: "CSS Loaders",
        link: "https://whirl.netlify.app/",
        websitePreviewImage: require("../assets/whirl.png"),
        textColor: "black",
      },

      {
        name: "CSS Animated Backgrounds",
        link: "https://alvarotrigo.com/blog/animated-backgrounds-css/",
        websitePreviewImage: require("../assets/animatedbackgrounds.png"),
      },
      {
        name: "Mesh Gradient Generator",
        link: "https://csshero.org/mesher/",
        websitePreviewImage: require("../assets/mesher.png"),
      },

      {
        name: "Visual Effects Library",
        link: "https://party.js.org/",
        websitePreviewImage: require("../assets/party.png"),
      },

      {
        name: "Glassmorphism Generator",
        link: "https://hype4.academy/tools/glassmorphism-generator",
        websitePreviewImage: require("../assets/glassmorphism.png"),
      },
      {
        name: "SVG Waves Generator",
        link: "https://getwaves.io/",
        websitePreviewImage: require("../assets/wave.svg"),
      },
      {
        name: "Date Functions Library",
        link: "https://date-fns.org/",
        websitePreviewImage: require("../assets/date-fns.png"),
      },
      {
        name: "Mockup Creator",
        link: "https://carrd.co/build",
        websitePreviewImage: require("../assets/carrd.png"),
        textColor: "black",
      },
      {
        name: "Fully Customizable Chart Library",
        link: "https://gionkunz.github.io/chartist-js/",
        websitePreviewImage: require("../assets/chartist.png"),
        textColor: "black",
      },
    ],
    hostingproviders: [
      {
        name: "Github Pages",
        link: "https://pages.github.com/",
        websitePreviewImage: require("../assets/github-pages.webp"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Koyeb",
        link: "https://koyeb.com/",
        websitePreviewImage: require("../assets/kojeb.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Layer0",
        link: "https://www.layer0.co/",
        description:
          "Layer0 allows you to deploy JAMStack websites very easily using technologies " +
          "like Next.js, Nuxt.js, React and more.",
        websitePreviewImage: require("../assets/layer0.webp"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "W3Schools Spaces",
        link: "https://www.w3schools.com/spaces/",
        websitePreviewImage: require("../assets/w3schools.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Flatlogic",
        link: "https://flatlogic.com/",
        websitePreviewImage: require("../assets/flatlogic.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Firebase",
        link: "https://firebase.com/",
        websitePreviewImage: require("../assets/firebase.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Cloudflare Pages",
        link: "https://pages.cloudflare.com/",
        websitePreviewImage: require("../assets/cloudflare-pages.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Hostman",
        link: "https://hostman.com/",
        websitePreviewImage: require("../assets/hostman.png"),
        textColor: "black",
        type: "hostingprovider",
      },

      {
        name: "Heroku",
        link: "https://www.heroku.com/",
        description:
          "Heroku is a hosting service for full stack applications" +
          " in the cloud. They support Nodejs, Pyton, Ruby, Java apps and many more.",
        websitePreviewImage: require("../assets/heroku.png"),
        type: "hostingprovider",
      },
      {
        name: "Qovery",
        link: "https://www.qovery.com/",
        description:
          "Qovery is another hosting service which provides hosting for full-stack" +
          " web apps and built-in databases. They provide unlimited apps and databases.",
        websitePreviewImage: require("../assets/qovery.jpg"),
        type: "hostingprovider",
      },
      {
        name: "Fly.io",
        link: "https://fly.io/",
        websitePreviewImage: require("../assets/fly.png"),
        type: "hostingprovider",
      },
      {
        name: "Stormkit",
        link: "https://stormkit.io/",
        websitePreviewImage: require("../assets/stormkit.jpg"),
        type: "hostingprovider",
      },
      {
        name: "GitLab Pages",
        link: "https://gitlab.com/pages/",
        websitePreviewImage: require("../assets/gitlab-pages.jpg"),
      },
      {
        name: "Railway",
        link: "https://railway.app/",
        websitePreviewImage: require("../assets/railway.png"),
        type: "hostingprovider",
      },
      {
        name: "Vercel",
        link: "https://vercel.com/",
        description:
          "Vercel is an amazing service. They allow you to " +
          "easily develop applications, previewing them before setting it to production.",
        websitePreviewImage: require("../assets/vercel.jpg"),
        type: "hostingprovider",
      },
      {
        name: "Replit",
        link: "https://repl.it/",
        websitePreviewImage: require("../assets/replit.png"),
        type: "hostingprovider",
      },
      {
        name: "Fleek",
        link: "https://fleek.co/",
        websitePreviewImage: require("../assets/fleek.jpg"),
        type: "hostingprovider",
      },
      {
        name: "begin",
        link: "https://begin.com/",
        websitePreviewImage: require("../assets/begin-logo.svg"),
        type: "hostingprovider",
      },
      {
        name: "Render",
        link: "https://render.com/",
        websitePreviewImage: require("../assets/render.png"),
        type: "hostingprovider",
      },
      {
        name: "Netlify",
        link: "https://www.netlify.com/",
        description:
          "Netlify is the go-to platform for deploying" +
          " modern web projects. It comes with an integrated system to let you" +
          " quickly deploy projects from GitHub and GitLab.",
        websitePreviewImage: require("../assets/netlify.jpg"),
        type: "hostingprovider",
      },
    ],
  },

  getters: {},
  mutations: {
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setPageVisits(state, payload) {
      state.pagevisits = payload;
    },
    addColorPalletToSaved(state, colorPallet) {
      let newArr = [];
      if (state.userSavedColorPallets !== null) {
        for (let cp of state.userSavedColorPallets) {
          newArr.push(cp);
        }
      } else {
        state.userSavedColorPallets = [];
      }
      colorPallet = JSON.parse(colorPallet);
      newArr.unshift(colorPallet[0]);
      state.userSavedColorPallets = JSON.parse(JSON.stringify(newArr));
    },
    setUserSavedColorPallets(state, payload) {
      if (payload !== undefined && payload !== null)
        state.userSavedColorPallets = payload;
    },
    setSelectedLinearGradient(state, payload) {
      state.selectedLinearGradient = payload;
    },
    setUserData(state, userdata) {
      state.name = userdata.user.displayName;
      state.profilepic = userdata.user.photoURL;
      state.email = userdata.user.email;
      state.userObj = userdata.user.providerData[0];

      localStorage.setItem("userName", state.name);
      localStorage.setItem("profilePic", state.profilepic);
      localStorage.setItem("email", state.email);
      localStorage.setItem("uid", state.userObj.uid);
    },
    removeUserData(state) {
      state.name = "";
      state.profilepic = "";
      state.email = "";
      state.isLoggedIn = false;
      state.favoriteTools = [];
      state.userSavedColorPallets = [];

      localStorage.removeItem("userName");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("email");
      localStorage.removeItem("uid");
    },
    removeColorPalletFromSaved(state, colorPallet) {
      if (colorPallet !== undefined && colorPallet !== null) {
        //check if colorPallet object is in state.userSavedColorPallets using filter
        let newArr = state.userSavedColorPallets.filter((cp) => {
          return cp[0] !== colorPallet.colorpallet[0];
        });
        state.userSavedColorPallets = newArr;
        return;
      }
    },
  },
  actions: {
    async ADD_PAGE_VISIT({ commit, state }) {
      if (window.location.hostname !== "localhost") {
        //get pagevisits
        const rawRes = await fetch(`${state.baseUrlStrapiApi}analytics/1`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        });
        const res = await rawRes.json();
        commit("setPageVisits", res.data.attributes.PageVisits + 1);

        const rawResponse = await fetch(
          `${state.baseUrlStrapiApi}analytics/1`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                PageVisits: state.pagevisits,
              },
            }),
          }
        );
        const response = await rawResponse.json();
      }
    },
    async SEARCH_TOOLS({ commit, state }, payload) {
      let allTools = [];
      for (let tool of state.globalFrontendTools) {
        allTools.push(tool);
      }
      for (let tool of state.hostingproviders) {
        allTools.push(tool);
      }

      let filteredTools = allTools.filter((tool) => {
        return tool.name.toLowerCase().includes(payload.toLowerCase());
      });
      return filteredTools;
    },
    async REMOVE_COLOR_FROM_SAVED_PALLETTE({ state, dispatch, commit }, user) {
      if (user === undefined) {
        return Promise.reject("user is undefined");
      }
      commit("removeColorPalletFromSaved", user);

      //remove colorpallette from strapi
      const userId = await dispatch("GET_USER_ID", user.id);
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: { colorpallet: state.userSavedColorPallets },
          }),
        }
      );
      const content = await rawResponse.json();
      await dispatch("GET_USER_SAVED_COLOR_PALLETES", user.id);
    },
    async ADD_COLORPALLETE_TO_ACCOUNT({ state, dispatch, commit }, user) {
      if (user === undefined) {
        return Promise.reject("Color Pallete is undefined");
      }

      commit("addColorPalletToSaved", user.colorPallet);
      if (state.userSavedColorPallets === undefined) {
        return;
      }
      //find id of user with useruid
      const userId = await dispatch("GET_USER_ID", user.id);
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: { colorpallet: state.userSavedColorPallets },
          }),
        }
      );
      const content = await rawResponse.json();
    },
    async CREATE_ACCOUNT({ state, dispatch, commit }, user) {
      if (!(await dispatch("USER_EXISTS", user.uid))) {
        const rawResponse = await fetch(
          `${state.baseUrlStrapiApi}user-details`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                userid: user.uid,
              },
            }),
          }
        );
        const content = await rawResponse.json();
      }
      commit("setUserData", { user: user });
      dispatch("LOAD_USER_SAVED_DATA", user.uid);
    },
    async USER_EXISTS({ state }, userId) {
      const dataResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details?userid=${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const content2 = await dataResponse.json();
      return content2.data.length > 0;
    },
    async GET_USER_ID({ state }, userUid) {
      const dataResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details?userid=${userUid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const content2 = await dataResponse.json();
      if (content2.data.length === 0) {
        return Promise.reject("User does not exist");
      }
      return content2.data[0].id;
    },
    async GET_USER_SAVED_COLOR_PALLETES({ state, dispatch, commit }, userUid) {
      if (userUid === undefined) {
        return Promise.reject("User uid is undefined");
      }
      const userId = await dispatch("GET_USER_ID", userUid);
      const dataResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const content2 = await dataResponse.json();
      commit("setUserSavedColorPallets", content2.data.attributes.colorpallet);
    },
    async LOAD_USER_SAVED_DATA({ dispatch }, uid) {
      dispatch("GET_USER_SAVED_COLOR_PALLETES", uid);
    },
    async GET_PAGE_VISITS({ state, commit, dispatch }) {
      if (await dispatch("IS_ADMIN")) {
        const dataResponse = await fetch(
          `${state.baseUrlStrapiApi}analytics/1`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const content2 = await dataResponse.json();
        commit("setPageVisits", content2.data.attributes.PageVisits);
      }
    },
    IS_ADMIN({ state, commit }) {
      let isAdmin = false;
      if (localStorage.getItem("email") === null) {
        isAdmin = false;
      } else if (isAdmin === false) {
        if (localStorage.getItem("email").includes(state.adminEmail)) {
          isAdmin = true;
        }
      }
      commit("setIsAdmin", isAdmin);
      return isAdmin;
    },
  },
  modules: {},
});
