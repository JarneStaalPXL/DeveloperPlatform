import { createStore } from 'vuex'

export default createStore({
  state: {
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
      colorPalletGenerator: {
        path: '/colorPalletGenerator',
        name: 'colorpalletgenerator',
        component: 'ColorPalletGeneratorView'
      }
    },
  },

  getters: {
  },
  mutations: {
    setSelectedLinearGradient(state, payload) {
      state.selectedLinearGradient = payload
    },
    setUserData(state, userObj) {
      state.name = userObj.user.displayName;
      state.profilepic = userObj.user.photoURL;
      state.email = userObj.user.email
      state.userObj = userObj.user.providerData[0];

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

      localStorage.removeItem('userName');
      localStorage.removeItem('profilePic');
      localStorage.removeItem('email');
      localStorage.removeItem('uid');
      localStorage.removeItem('startScreenBackground');
    },
  },
  actions: {
  },
  modules: {
  }
})
