import { createStore } from 'vuex'

export default createStore({
  state: {
    baseUrlStrapi: 'https://frontendplatformbackend.herokuapp.com',
    baseUrlStrapiApi: 'https://frontendplatformbackend.herokuapp.com' + '/api/',
    strapiApiKey: '1bad8621f0c81dc23565fd6f813668bfb5f9b32eb678b6f9db74439ac6849d30ac8b5ee03ba74b66c73892a6a291aac2cb6c5899d85aa3851be2ce20cbf8a8bb1c12aed7b1c9a61b2731d5e4e4a86e20b0fe3c6c96c5cd0bf928236d3eda0f609fe998f20b9e95b3f3ed5431ec43dc1c98369f4ef3c713d3bc70d07ab80011b8',
    selectedLinearGradient: {},
    name: "",
    profilepic: "",
    email: "",
    isLoggedIn: false,
    userObj: {},
    loggedInFirebaseUser: null,
    routings: {
      home: {
        path: '/',
        name: 'home',
        component: 'HomeView'
      },
      lineargradientgenerator: {
        path: '/LinearGradientGenerator',
        name: 'lineargradientgenerator',
        component: 'LinearGradientGeneratorView'
      },
      radialgradientgenerator: {
        path: '/RadialGradientGenerator',
        name: 'radialgradientgenerator',
        component: 'RadialGradientGeneratorView'
      },
      websitebuilder: {
        path: '/WebsiteBuilder',
        name: 'websitebuilder',
        component: 'WebsiteBuilderView'
      },
      domAnalyzer: {
        path: '/DOMAnalyzer',
        name: 'domanalyzer',
        component: 'DomAnalyzerView'
      },
      responsivityChecker: {
        path: '/ResponsivityChecker',
        name: 'responsivitychecker',
        component: 'ResponsivityCheckerView'
      },
      colorPalleteGenerator: {
        path: '/colorPalleteGenerator',
        name: 'colorpalletegenerator',
        component: 'ColorPalleteGeneratorView'
      },
      colorLightenerDarker: {
        path: '/colorlightenerdarker',
        name: 'colorlightenerdarker',
        component: 'ColorLightenerDarkerView'
      }
    },
    userSavedColorPallets: [],
  },

  getters: {
  },
  mutations: {
    addColorPalletToSaved(state, colorPallet) {
      let newArr = [];
      if (state.userSavedColorPallets !== null) {
        for (let cp of state.userSavedColorPallets) {
          newArr.push(cp);
        }
      }
      else {
        state.userSavedColorPallets = [];
      }
      colorPallet = JSON.parse(colorPallet);
      newArr.unshift(colorPallet[0]);
      state.userSavedColorPallets = JSON.parse(JSON.stringify(newArr));
    },
    setUserSavedColorPallets(state, payload) {
      if (payload !== undefined && payload !== null) state.userSavedColorPallets = payload;
    },
    setSelectedLinearGradient(state, payload) {
      state.selectedLinearGradient = payload
    },
    setUserData(state, userdata) {
      state.name = userdata.user.displayName;
      state.profilepic = userdata.user.photoURL;
      state.email = userdata.user.email
      state.userObj = userdata.user.providerData[0];


      localStorage.setItem('userName', state.name);
      localStorage.setItem('profilePic', state.profilepic);
      localStorage.setItem('email', state.email);
      localStorage.setItem('uid', state.userObj.uid);
    },
    removeUserData(state) {
      state.name = "";
      state.profilepic = "";
      state.email = "";
      state.isLoggedIn = false;
      state.favoriteTools = [];
      state.userSavedColorPallets = [];

      localStorage.removeItem('userName');
      localStorage.removeItem('profilePic');
      localStorage.removeItem('email');
      localStorage.removeItem('uid');
    },
    removeColorPalletFromSaved(state, colorPallet) {
      if (colorPallet !== undefined && colorPallet !== null) {
        //check if colorPallet object is in state.userSavedColorPallets using filter
        let newArr = state.userSavedColorPallets.filter(cp => {
          return cp[0] !== colorPallet.colorpallet[0];
        }
        );
        state.userSavedColorPallets = newArr;
        return;
      }
    }
  },
  actions: {
    async REMOVE_COLOR_FROM_SAVED_PALLETTE({ state, dispatch, commit }, user) {
      if (user === undefined) {
        return Promise.reject("user is undefined");
      }
      commit('removeColorPalletFromSaved', user);

      //remove colorpallette from strapi
      const userId = await dispatch('GET_USER_ID', user.id);
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}user-details/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.strapiApiKey
        },
        body: JSON.stringify({ data: { colorpallet: state.userSavedColorPallets } })
      });
      const content = await rawResponse.json();
      await dispatch('GET_USER_SAVED_COLOR_PALLETES', user.id);
    },
    async ADD_COLORPALLETE_TO_ACCOUNT({ state, dispatch, commit }, user) {
      if (user === undefined) {
        return Promise.reject("Color Pallete is undefined");
      }

      commit('addColorPalletToSaved', user.colorPallet);
      if (state.userSavedColorPallets === undefined) {
        return;
      }
      //find id of user with useruid
      const userId = await dispatch('GET_USER_ID', user.id);
      const rawResponse = await fetch(`${state.baseUrlStrapiApi}user-details/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.strapiApiKey
        },
        body: JSON.stringify({ data: { colorpallet: state.userSavedColorPallets } })
      });
      const content = await rawResponse.json();
    },
    async CREATE_ACCOUNT({ state, dispatch, commit }, user) {
      if (!await dispatch('USER_EXISTS', user.uid)) {
        const rawResponse = await fetch(`${state.baseUrlStrapiApi}user-details`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.strapiApiKey
          },
          body: JSON.stringify({
            data: {
              userid: user.uid,
            }
          })
        });
        const content = await rawResponse.json();
      }
      commit("setUserData", { user: user });
      dispatch('LOAD_USER_SAVED_DATA', user.uid);
    },
    async USER_EXISTS({ state }, userId) {
      const dataResponse = await fetch(`${state.baseUrlStrapiApi}user-details?userid=${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.strapiApiKey
        }
      });
      const content2 = await dataResponse.json();
      return content2.data.length > 0
    },
    async GET_USER_ID({ state }, userUid) {
      const dataResponse = await fetch(`${state.baseUrlStrapiApi}user-details?userid=${userUid}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.strapiApiKey
        }
      });
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
      const userId = await dispatch('GET_USER_ID', userUid);
      const dataResponse = await fetch(`${state.baseUrlStrapiApi}user-details/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.strapiApiKey
        }
      });
      const content2 = await dataResponse.json();
      commit("setUserSavedColorPallets", content2.data.attributes.colorpallet);
    },
    async LOAD_USER_SAVED_DATA({ dispatch }, uid) {
      dispatch('GET_USER_SAVED_COLOR_PALLETES', uid);
    },
  },
  modules: {
  }
})
