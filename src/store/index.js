import { createStore } from "vuex";

export default createStore({
  state: {
    isAdmin: false,
    favoritetools: [],
    uniqueVisitors: [],
    adminEmail: "jarne.staal9@gmail.com",
    pagevisits: 0,
    baseUrlStrapi: "https://developerplatformbackend.up.railway.app",
    baseUrlStrapiApi:
      "https://developerplatformbackend.up.railway.app" + "/api/",
    strapiApiKey:
      "74b1b6bd688a26cfc4d0bef366129a3da6ec0fbb22d9d4538942839cf229d6c66acbe12482dcfae4cab6b0a518349c47b411a2d138328eb1ea94f9ad1c15ae502bf43f41cb83480c8590b40dea0fba378361ee595ac9a893cf15a254eb9e2c148e7c34aaf72969fe32e9edadd4eba7c6e45aff7939d887ef2c29c2eb0e0613ac",
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
      adminPanel: {
        path: "/adminpanel",
        name: "adminpanel",
        component: "AdminPanelView",
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
      },
      {
        name: "Fully Customizable Chart Library",
        link: "https://gionkunz.github.io/chartist-js/",
        websitePreviewImage: require("../assets/chartist.png"),
        textColor: "black",
      },
      {
        name: "SEO Site Checkup",
        link: "https://seositecheckup.com/",
        websitePreviewImage: require("../assets/seo-site-checkup.png"),
        textColor: "black",
      },
    ],
    hostingproviders: [
      {
        name: "Github Pages Hosting",
        link: "https://pages.github.com/",
        description:
          "GitHub Pages is a static site hosting service that takes HTML, " +
          "CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website",
        websitePreviewImage: require("../assets/github-pages.png"),
        textColor: "black",
        type: "hostingprovider",
        isRecommended: true,
      },
      {
        name: "Koyeb Hosting",
        link: "https://koyeb.com/",
        description:
          "Koyeb's fully-managed serverless platform provides unique features to maximize developer productivity including a complete Service Mesh and Global Load Balancing.",
        websitePreviewImage: require("../assets/koyeb-home.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Edgo Hosting",
        link: "https://edg.io/",
        description:
          "Edgio AppOps is an Internet-scale platform that makes it easy for teams to build, release, protect, and accelerate their web apps and APIs.",
        websitePreviewImage: require("../assets/edgio.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "W3Schools Spaces Hosting",
        link: "https://www.w3schools.com/spaces/",
        description: "W3Schools Spaces is a personal place where you can build and experiment with code and host your own website. With W3Schools Spaces you can build with HTML, CSS and JavaScript. Edit code directly in your browser. Upload and host your files and images.",
        websitePreviewImage: require("../assets/w3schools.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Flatlogic Hosting",
        link: "https://flatlogic.com/templates?ref=c7ez7AzyG6",
        description: "Generate full-stack databased-based (CRUD) React, Vue, Angular app codebases in just 3 steps! Select stack and template, connect to Github and deploy your app in minutes!",
        websitePreviewImage: require("../assets/flatlogic.png"),
        textColor: "black",
        type: "hostingprovider",
        isRecommended: true,
      },
      {
        name: "Firebase Hosting",
        link: "https://firebase.com/",
        websitePreviewImage: require("../assets/firebase.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Cloudflare Pages Hosting",
        link: "https://pages.cloudflare.com/",
        websitePreviewImage: require("../assets/cloudflare-pages.png"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Hostman Hosting",
        link: "https://hostman.com/",
        websitePreviewImage: require("../assets/hostman.png"),
        textColor: "black",
        type: "hostingprovider",
      },

      {
        name: "Heroku Hosting",
        link: "https://www.heroku.com/",
        description:
          "Heroku is a hosting service for full stack applications" +
          " in the cloud. They support Nodejs, Pyton, Ruby, Java apps and many more. The downside is that they are no longer offering free services.",
        websitePreviewImage: require("../assets/heroku.png"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
        isUsed: true,
      },
      {
        name: "Qovery Hosting",
        link: "https://www.qovery.com/",
        description:
          "Qovery is another hosting service which provides hosting for full-stack" +
          " web apps and built-in databases. They provide unlimited apps and databases.",
        websitePreviewImage: require("../assets/qovery.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Fly.io Hosting",
        link: "https://fly.io/",
        websitePreviewImage: require("../assets/fly.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Stormkit Hosting",
        link: "https://stormkit.io/",
        websitePreviewImage: require("../assets/stormkit.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "GitLab Pages Hosting",
        link: "https://gitlab.com/pages/",
        websitePreviewImage: require("../assets/gitlab-pages.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Railway Hosting",
        link: "https://railway.app?referralCode=Hy5cpA",
        description:"Railway is a hosting service for full stack web apps and built-in databases. They provide unlimited apps and databases.",
        websitePreviewImage: require("../assets/railway.svg"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
        isUsed: true,
      },
      {
        name: "Vercel Hosting",
        link: "https://vercel.com/",
        description:
          "Vercel is an amazing service. They allow you to " +
          "easily develop applications, previewing them before setting it to production.",
        websitePreviewImage: require("../assets/vercel.jpg"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
      },
      {
        name: "Replit Hosting",
        link: "https://repl.it/",
        websitePreviewImage: require("../assets/replit.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Fleek Hosting",
        link: "https://fleek.co/",
        websitePreviewImage: require("../assets/fleek.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "begin Hosting",
        link: "https://begin.com/",
        websitePreviewImage: require("../assets/begin.png"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Render Hosting",
        link: "https://render.com/",
        websitePreviewImage: require("../assets/render.jpg"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
      },
      {
        name: "Netlify Hosting",
        link: "https://www.netlify.com/",
        description:
          "Netlify is the go-to platform for deploying" +
          " modern web projects. It comes with an integrated system to let you" +
          " quickly deploy projects from GitHub and GitLab.",
        websitePreviewImage: require("../assets/netlify.webp"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
        isUsed: true,
      },
    ],
    gradientGeneratorsTools: [
      {
        name: "Linear Gradient Generator",
        link: "/LinearGradientGenerator",
        css: "background: linear-gradient(to right, #a6a4de, #6619f3)",
        available: true,
      },
      {
        name: "Radial Gradient Generator",
        link: "/RadialGradientGenerator",
        css: "background: radial-gradient(#a6a4de, #6619f3)",
        available: true,
      },
      // {
      //   name: "Mesh Gradient Generator",
      //   link: "/MeshGradientGenerator",
      //   css: "background: mesh-gradient(#a6a4de, #6619f3)",
      //   available: false,
      // },
    ],
    allUserActivities: [],
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

      for (let tool of state.globalFrontendTools) {
        tool.isFavorited = false;
      }
      state.favoritetools = [];

      localStorage.removeItem("userName");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("email");
      localStorage.removeItem("uid");
      localStorage.removeItem("favTools");
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
    setAllUserActivities(state, payload) {
      state.allUserActivities = payload;
    },
    setUniqueVisitors(state, payload) {
      state.uniqueVisitors = payload;
    },
    setFavoriteTools(state, payload) {
      state.favoritetools = payload;
    },
    setGlobalFrontendTools(state, payload) {
      state.globalFrontendTools = payload;
    },
  },
  actions: {
    async GET_USER_FAVORITE_TOOLS({ dispatch, commit, state }) {
      if (localStorage.getItem("uid") !== null) {
        //getting user favorite tools from strapi

        let userid = await dispatch("GET_USER_ID", localStorage.getItem("uid"));
        const response = await fetch(
          `${state.baseUrlStrapiApi}user-details/${userid}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const res = await response.json();
        commit("setFavoriteTools", res.data.attributes.favoritetools);

        //globalfrontendtools manipulation favorites
        if (state.favoritetools !== null) {
          const dataTools = JSON.parse(
            JSON.stringify(state.globalFrontendTools)
          );
          for (const tool of dataTools) {
            tool.isFavorited = state.favoritetools.some(
              (t) => t.name === tool.name
            );
          }
          commit("setGlobalFrontendTools", dataTools);
          console.log(dataTools);
        }

        //returning favorite tools
        return res.data.attributes.favoritetools;
      } else {
        //getting user favorite tools from localStorage
        let toolsString = localStorage.getItem("favTools");
        if (toolsString !== null) {
          let tools = JSON.parse(toolsString);
          commit("setFavoriteTools", tools);
        }
      }
    },
    async REMOVE_TOOL_FROM_FAVORITES({ dispatch, commit, state }, tool) {
      if (localStorage.getItem("uid") !== null) {
        let userid = await dispatch("GET_USER_ID", localStorage.getItem("uid"));
        let newFavTools = JSON.parse(
          JSON.stringify(state.favoritetools)
        ).filter((t) => {
          return t.name !== tool.name;
        });
        const response = await fetch(
          `${state.baseUrlStrapiApi}user-details/${userid}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                favoritetools: newFavTools,
              },
            }),
          }
        );
        const res = await response.json();
        commit("setFavoriteTools", res.data.attributes.favoritetools);

        return Promise.resolve(true);
      } else {
        let toolsString = localStorage.getItem("favTools");
        if (toolsString !== null) {
          let tools = JSON.parse(toolsString);
          for (let tl of tools) {
            if (tl.name === tool.name) {
              tools.splice(tools.indexOf(tl), 1);
            }
          }
          localStorage.setItem("favTools", JSON.stringify(tools));
          commit("setFavoriteTools", tools);

          //find tool in globalFrontendTools and set isFavorited to false
          const dataTools = JSON.parse(
            JSON.stringify(state.globalFrontendTools)
          );
          for (const tl of dataTools) {
            if (tl.name === tool.name) {
              tl.isFavorited = false;
              break;
            }
          }
          commit("setGlobalFrontendTools", dataTools);

          return Promise.resolve(true);
        }
      }
    },
    async ADD_TOOL_TO_FAVORITES({ dispatch, commit, state }, tool) {
      let succeeded = false;
      let errorText;

      tool = JSON.parse(JSON.stringify(tool));
      //get fav tools of user
      let favTools = [];
      //get userid from uid

      await dispatch("GET_USER_ID", localStorage.getItem("uid"))
        .then(async (userid) => {
          if (localStorage.getItem("uid") !== null) {
            //getting users favorite tools
            const tools = await fetch(
              `${state.baseUrlStrapiApi}user-details/${userid}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + state.strapiApiKey,
                },
              }
            );
            const res = await tools.json();
            favTools = res.data.attributes.favoritetools;
            if (favTools === null) {
              const tools = await fetch(
                `${state.baseUrlStrapiApi}user-details/${userid}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + state.strapiApiKey,
                  },
                  body: JSON.stringify({
                    data: {
                      favoritetools: [tool],
                    },
                  }),
                }
              );
              const res = await tools.json();

              commit("setFavoriteTools", [tool]);

              succeeded = true;
            } else {
              let array = [];
              if (
                (await dispatch("CHECK_TOOL_PRESENT_STRAPI", tool.name)) ===
                false
              ) {
                for (let toole of favTools) {
                  array.push(toole);
                }
                array.push(tool);

                const res = await fetch(
                  `${state.baseUrlStrapiApi}user-details/${userid}`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + state.strapiApiKey,
                    },
                    body: JSON.stringify({
                      data: {
                        favoritetools: array,
                      },
                    }),
                  }
                );
                const resp = await res.json();
                commit("setFavoriteTools", array);

                succeeded = true;
              } else {
                errorText = '"' + tool.name + '"' + " is already in favorites";
                succeeded = false;
              }
            }
          } else {
            if (localStorage.getItem("favTools") === null) {
              localStorage.setItem("favTools", JSON.stringify([]));
            } else {
              //check if tool is already in localstorage
              if (
                (await dispatch("CHECK_TOOL_PRESENT_LST", tool.name)) === false
              ) {
                favTools = localStorage.getItem("favTools");
                favTools = JSON.parse(favTools);
                favTools.push(tool);
                localStorage.setItem("favTools", JSON.stringify(favTools));
                succeeded = true;
              } else {
                errorText = '"' + tool.name + '"' + " is already in favorites";
                succeeded = false;
              }

              return succeeded;
            }
          }
        })
        .catch((err) => {
          errorText = err;
          succeeded = false;
        });

      if (succeeded) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(errorText);
      }
    },
    async CHECK_TOOL_PRESENT_STRAPI({ dispatch, commit, state }, toolname) {
      let found = false;
      let tools = await dispatch("GET_USER_FAVORITE_TOOLS");

      //check if tools is iterable
      if (tools.length > 0) {
        for (let tool of tools) {
          if (tool.name === toolname) {
            found = true;
            break;
          }
        }
      }
      return found;
    },
    async CHECK_TOOL_PRESENT_LST({ dispatch, commit, state }, toolname) {
      let favTools = JSON.parse(localStorage.getItem("favTools"));
      let found = false;
      for (let tol of favTools) {
        if (tol.name === toolname) {
          found = true;
          break;
        }
      }
      return found;
    },
    async REMOVE_ADMIN({ state, dispatch }, payload) {
      //Find user with email

      const resUser = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const users = await resUser.json();
      let userid;
      for (let user of users.data) {
        if (user.attributes.email !== null) {
          if (user.attributes.email === payload) {
            userid = user.attributes.userid;
            break;
          }
        }
      }

      //check if userid is already in admins
      if (!(await dispatch("IS_ADMIN", userid))) {
        return Promise.reject("User " + userid + " is not an admin");
      } else {
        //get user id
        await dispatch("GET_ADMIN_ID", userid).then(async (userID) => {
          //remove user from admins
          const res = await fetch(`${state.baseUrlStrapiApi}admins/${userID}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          });
          const data = await res.json();
        });
      }
    },
    async CREATE_ADMIN({ state, dispatch }, payload) {
      //Find user with email

      const resUser = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const users = await resUser.json();
      let userid;
      for (let user of users.data) {
        if (user.attributes.email !== null) {
          if (user.attributes.email === payload) {
            userid = user.attributes.userid;
            break;
          }
        }
      }

      //check if userid is already in admins
      if (await dispatch("IS_ADMIN", userid)) {
        return Promise.reject("User " + userid + " is already an admin");
      }
      const response = await fetch(`${state.baseUrlStrapiApi}admins`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
        body: JSON.stringify({
          data: {
            uid: userid,
          },
        }),
      });
      const data = await response.json();
      return Promise.resolve(data);
    },
    async DELETE_USER_ACTIVITIES({ state }, payload) {
      for (let activity of payload) {
        try {
          const rawResponse = await fetch(
            `${state.baseUrlStrapiApi}visit-logs/${activity}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + state.strapiApiKey,
              },
            }
          );
        } catch (err) {
          alert(err);
        }
      }
    },
    async GET_USER_ACTIVTIES({ state, commit }, payload) {
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const response = await rawResponse.json();
      let tempArr = [];
      let index = 0;
      for (let act of response.data) {
        let date = new Date(act.attributes.createdAt);
        let isAdmin = false;
        if (act.attributes.isadmin !== null) {
          if (act.attributes.isadmin) {
            isAdmin = "Admin";
          }
        } else {
          isAdmin = "User";
        }
        tempArr.push({
          key: act.id,
          userid: act.attributes.userid,
          username: act.attributes.name,
          email: act.attributes.email,
          route: act.attributes.route,
          createdat: date,
          ip: act.attributes.ip,
          isadmin: [isAdmin],
        });
        index++;
      }
      //sort array by createdat
      tempArr
        .sort((a, b) => {
          return a.createdat - b.createdat;
        })
        .reverse();

      index = 0;
      for (let act of tempArr) {
        act.createdat = act.createdat.toString();
      }
      commit("setAllUserActivities", tempArr);
    },
    async ADD_PAGE_VISIT_ROUTE({ commit, state, dispatch }, route) {
      //check if localhost
      if (window.location.hostname !== "localhost") {
        if (route === "/") {
          route = "Homepage";
        }
        //get ip adress
        const res = await fetch(`https://api.ipify.org/?format=json`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const ip = await res.json();

        let isAdmin = await dispatch("IS_ADMIN", localStorage.getItem("uid"));
        const rawResponse = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: {
              userid:
                localStorage.getItem("uid") !== null
                  ? localStorage.getItem("uid")
                  : "Unknown user",
              route: route,
              email:
                localStorage.getItem("email") !== null
                  ? localStorage.getItem("email")
                  : "Unknown email",
              name:
                localStorage.getItem("userName") !== null
                  ? localStorage.getItem("userName")
                  : "Unknown username",
              ip: ip.ip,
              isadmin: isAdmin,
            },
          }),
        });
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
    async GET_ADMIN_ID({ state }, useruid) {
      const dataResponse = await fetch(
        `${state.baseUrlStrapiApi}admins?UID=${useruid}`,
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
        return Promise.reject("Admin does not exist");
      }
      return content2.data[0].id;
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
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const response = await rawResponse.json();
      commit("setPageVisits", response.data.length);
    },
    async IS_ADMIN({ state, commit }, uid) {
      let isAdmin = false;
      //get admins from strapi
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}admins`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const admins = await rawResponse.json();
      for (let admin of admins.data) {
        if (admin.attributes.uid === uid) {
          isAdmin = true;
          break;
        }
      }

      commit("setIsAdmin", isAdmin);
      return isAdmin;
    },
    async GET_UNIQUE_VISITORS({ state, commit }) {
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const response = await rawResponse.json();

      //create unique array of visitors checking by ip
      let finalArr = [];
      let uniqueVisitors = [];
      for (let visit of response.data) {
        if (!uniqueVisitors.includes(visit.attributes.ip)) {
          uniqueVisitors.push(visit.attributes.ip);
          finalArr.push({
            ip: visit.attributes.ip,
            name: visit.attributes.name,
          });
        }
      }
      commit("setUniqueVisitors", finalArr);
    },
  },
  modules: {},
});
