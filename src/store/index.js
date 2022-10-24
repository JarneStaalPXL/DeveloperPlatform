import { createStore } from "vuex";
import { h, defineComponent, ref } from "vue";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  HeartOutline as HeartIcon,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { TrayItemAdd20Filled } from "@vicons/fluent";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default createStore({
  state: {
    userProjects: [],
    keysArray : [],
    showUserProjectCreateModal: false,
    showUserProjectCreateSecondModal: false,
    showInfoModal: false,
    selectedItemsQA: [],
    quickAccessTools: [],
    favoritesCategorizedChecked: true,
    contentRef: ref(null),
    showFeedbackPopup: false,
    verticalMenuCollapsed: false,
    colorMode: "dark",
    menuOptions: [
      {
        label: "Home",
        key: "/",
        icon: renderIcon(HomeIcon),
      },
      {
        label: "Favorites",
        key: "/favorites",
        icon: renderIcon(HeartIcon),
        children: [],
      },
    ],
    recurringVisitorCount: 0,
    allTools: [],
    notificationPlacement: "top-right",
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
        websitePreviewImage: require("../assets/toolsio.jpg"),
        textColor: "black",
      },
      {
        name: "SVG Illustrations",
        link: "https://undraw.co/illustrations",
        websitePreviewImage: require("../assets/undraw.jpg"),
        textColor: "black",
      },
      {
        name: "Illustrations and Icons",
        link: "https://iconscout.com/",
        promoDescription: "Free asset every day!",
        promoLink: "https://iconscout.com/l/assets-of-the-day",
        websitePreviewImage: require("../assets/iconscout.jpg"),
        textColor: "black",
      },
      {
        name: "SVG Blob Generator",
        link: "https://www.blobmaker.app/",
        websitePreviewImage: require("../assets/blobmaker.jpg"),
        textColor: "black",
      },
      {
        name: "Chart Library",
        link: "https://apexcharts.com/",
        websitePreviewImage: require("../assets/apexcharts.jpg"),
        textColor: "black",
      },
      {
        name: "Toast Alert Library",
        link: "https://apvarun.github.io/toastify-js/",
        websitePreviewImage: require("../assets/toastify.jpg"),
        textColor: "black",
      },
      {
        name: "Input auto-formatter",
        link: "https://nosir.github.io/cleave.js/",
        websitePreviewImage: require("../assets/cleave.jpg"),
        textColor: "black",
      },

      {
        name: "CSS Key Frame Creator",
        link: "https://keyframes.app/",
        websitePreviewImage: require("../assets/keyframescreator.jpg"),
      },
      {
        name: "Retro Game Creator (JS Library)",
        link: "https://kaboomjs.com/",
        websitePreviewImage: require("../assets/kaboomjs.jpg"),
      },
      {
        name: "Animation Library",
        link: "https://greensock.com/gsap/",
        websitePreviewImage: require("../assets/greensock.jpg"),
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
        websitePreviewImage: require("../assets/whirl.jpg"),
      },

      {
        name: "CSS Animated Backgrounds",
        link: "https://alvarotrigo.com/blog/animated-backgrounds-css/",
        websitePreviewImage: require("../assets/animatedbackgrounds.jpg"),
      },
      {
        name: "Mesh Gradient Generator",
        link: "https://csshero.org/mesher/",
        websitePreviewImage: require("../assets/mesher.jpg"),
      },

      {
        name: "Visual Effects Library",
        link: "https://party.js.org/",
        websitePreviewImage: require("../assets/party.jpg"),
      },

      {
        name: "Glassmorphism Generator",
        link: "https://hype4.academy/tools/glassmorphism-generator",
        websitePreviewImage: require("../assets/glassmorphism.jpg"),
      },
      {
        name: "SVG Waves Generator",
        link: "https://getwaves.io/",
        websitePreviewImage: require("../assets/wave.svg"),
      },
      {
        name: "Date Functions Library",
        link: "https://date-fns.org/",
        websitePreviewImage: require("../assets/date-fns.jpg"),
      },
      {
        name: "Mockup Creator",
        link: "https://carrd.co/build",
        websitePreviewImage: require("../assets/carrd.jpg"),
      },
      {
        name: "Fully Customizable Chart Library",
        link: "https://gionkunz.github.io/chartist-js/",
        websitePreviewImage: require("../assets/chartist.jpg"),
        textColor: "black",
      },
      {
        name: "SEO Site Checkup",
        link: "https://seositecheckup.com/",
        websitePreviewImage: require("../assets/seo-site-checkup.jpg"),
        textColor: "black",
      },
      {
        name: "Charts CSS",
        link: "https://chartscss.org/",
        websitePreviewImage: require("../assets/charts-css.png"),
        textColor: "black",
      },
      {
        name: "Vue3 Chart Library",
        link: "https://vue3charts.org/",
        websitePreviewImage: require("../assets/vue3charts.png"),
      },
      {
        name: "CompSciLib",
        link: "https://www.compscilib.com/",
        websitePreviewImage: require("../assets/compscilib.png"),
        textColor: "black",
      },
      {
        name: "Figma Assets",
        link: "https://www.figcomponents.com/",
        websitePreviewImage: require("../assets/figmaassets.png"),
        textColor: "black",
      },
      {
        name: "Humble Icons",
        link: "https://humbleicons.com/",
        websitePreviewImage: require("../assets/humbleicons.png"),
        textColor: "black",
      },
      {
        name: "Iconer Icons",
        link: "https://iconer.app/",
        websitePreviewImage: require("../assets/iconer.png"),
        textColor: "black",
      },
      {
        name: "Color Pallete Generator - Coolors.co",
        link: "https://coolors.co/generate",
        websitePreviewImage: require("../assets/coolors.png"),
        textColor: "black",
      },
      {
        name: "Swiper JS - Your own slider",
        link: "https://studio.swiperjs.com/play",
        websitePreviewImage: require("../assets/swiperjs.png"),
        textColor: "black",
      },
      {
        name: "Font Joy - Generate font pairings",
        link: "https://fontjoy.com/",
        websitePreviewImage: require("../assets/fontjoy.png"),
        textColor: "black",
      },
      {
        name: "TOOOLS Design Resources",
        link: "https://tooools.design/",
        websitePreviewImage: require("../assets/tooools.png"),
        textColor: "black",
      },
      {
        name: "Divider Generator",
        link: "https://www.shapedivider.app/",
        websitePreviewImage: require("../assets/shapedivider.png"),
        textColor: "black",
      },
      {
        name: "3D Design Creation",
        link: "https://spline.design/",
        websitePreviewImage: require("../assets/spline.png"),
        textColor: "black",
      },
      {
        name: "Mockuuups Studio",
        link: "https://mockuuups.studio/",
        websitePreviewImage: require("../assets/mockuuups_studio.png"),
      },
      {
        name: "Resize images for social media",
        link: "https://pixelhunter.io/",
        websitePreviewImage: require("../assets/pixelhunter.png"),
      },
      {
        name: "Animated Mesh Gradient",
        link: "https://whatamesh.vercel.app/",
        websitePreviewImage: require("../assets/whatamesh.png"),
      },
      {
        name: "SVG Background Generator",
        link: "https://app.haikei.app/",
        websitePreviewImage: require("../assets/haikei.png"),
      },
      {
        name: "Cubic-bezier Generator",
        link: "https://cubic-bezier.com/",
        websitePreviewImage: require("../assets/cubic-bezier.png"),
      },
      {
        name:"GitHub Profile Generator",
        link: "https://gprm.itsvg.in/",
        websitePreviewImage: require("../assets/gprm.png"),
      }
    ],
    fonts: [
      {
        name: "FontShare",
        link: "https://www.fontshare.com/",
        websitePreviewImage: require("../assets/fontshare.jpg"),
      },
      {
        name: "Google Fonts",
        link: "https://fonts.google.com/",
        websitePreviewImage: require("../assets/googlefonts.png"),
      },
      {
        name: "Font Squirrel",
        link: "https://www.fontsquirrel.com/",
        websitePreviewImage: require("../assets/font_squirrel.jpg"),
      }
    ],
    hostingproviders: [
      {
        name: "Github Pages Hosting",
        link: "https://pages.github.com/",
        description:
          "GitHub Pages is a static site hosting service that takes HTML, " +
          "CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website",
        websitePreviewImage: require("../assets/github-pages.jpg"),
        textColor: "black",
        type: "hostingprovider",
        isRecommended: true,
      },
      {
        name: "Koyeb Hosting",
        link: "https://koyeb.com/",
        description:
          "Koyeb's fully-managed serverless platform provides unique features to maximize developer productivity including a complete Service Mesh and Global Load Balancing.",
        websitePreviewImage: require("../assets/koyeb-home.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Edgo Hosting",
        link: "https://edg.io/",
        description:
          "Edgio AppOps is an Internet-scale platform that makes it easy for teams to build, release, protect, and accelerate their web apps and APIs.",
        websitePreviewImage: require("../assets/edgio.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "W3Schools Spaces Hosting",
        link: "https://www.w3schools.com/spaces/",
        description:
          "W3Schools Spaces is a personal place where you can build and experiment with code and host your own website. With W3Schools Spaces you can build with HTML, CSS and JavaScript. Edit code directly in your browser. Upload and host your files and images.",
        websitePreviewImage: require("../assets/w3schools.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Flatlogic Hosting",
        link: "https://flatlogic.com/templates?ref=c7ez7AzyG6",
        description:
          "Generate full-stack databased-based (CRUD) React, Vue, Angular app codebases in just 3 steps! Select stack and template, connect to Github and deploy your app in minutes!",
        websitePreviewImage: require("../assets/flatlogic.jpg"),
        textColor: "black",
        type: "hostingprovider",
        isRecommended: true,
      },
      {
        name: "Firebase Hosting",
        link: "https://firebase.com/",
        description:
          "Firebase Hosting is production-grade web content hosting for developers. With a single command, you can quickly deploy web apps and serve both static and dynamic content to a global CDN (content delivery network).",
        websitePreviewImage: require("../assets/firebase.jpg"),
        textColor: "black",
        type: "hostingprovider",
        isRecommended: true,
        isUsed: true,
        usedDescription: "AUTH & AUTHOR",
      },
      {
        name: "Cloudflare Pages Hosting",
        link: "https://pages.cloudflare.com/",
        description:
          "Cloudflare Pages is a JAMstack platform for frontend developers to collaborate and deploy websites. Developer-focused with effortless Git integration. Advanced collaboration built-in with unlimited seats. Unmatched performance on Cloudflare's edge network.",
        websitePreviewImage: require("../assets/cloudflare-pages.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },
      {
        name: "Hostman Hosting",
        link: "https://hostman.com/",
        description:
          "Hostman lets you launch your apps in a few clicks using a friendly interface. The pricing is fair and transparent. Works on top of AWS and DigitalOcean.",
        websitePreviewImage: require("../assets/hostman.jpg"),
        textColor: "black",
        type: "hostingprovider",
      },

      {
        name: "Heroku Hosting",
        link: "https://www.heroku.com/",
        description:
          "Heroku is a hosting service for full stack applications" +
          " in the cloud. They support Nodejs, Pyton, Ruby, Java apps and many more. The downside is that they are no longer offering free services.",
        websitePreviewImage: require("../assets/heroku.jpg"),
        type: "hostingprovider",
        textColor: "black",
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
        description:
          "fly.io is really a way to run Docker images on servers in different cities and a global router to connect users to the nearest available instance. We convert your Docker image into a root filesystem, boot tiny VMs using an Amazon project called Firecracker, and then proxy connections to it.",
        websitePreviewImage: require("../assets/fly.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Stormkit Hosting",
        link: "https://stormkit.io/",
        description:
          "Stormkit is an infrastructure provider for modern javascript applications. It supports either server-less side rendered applications or JAMStack websites. You can easily deploy, host and manage your applications/websites using Stormkit.",
        websitePreviewImage: require("../assets/stormkit.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "GitLab Pages Hosting",
        link: "https://gitlab.com/pages/",
        description:
          "GitLab Pages supports static websites and builds any Static Site Generator (SSG), such as Jekyll, Hugo, Hexo, Middleman and Pelican. We are assuming that you are familiar with Git and with the web development process, from creation to publishing.",
        websitePreviewImage: require("../assets/gitlab-pages.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Railway Hosting",
        link: "https://railway.app?referralCode=Hy5cpA",
        description:
          "Railway is a hosting service for full stack web apps and built-in databases. They provide unlimited apps and databases.",
        websitePreviewImage: require("../assets/railway.svg"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
        isUsed: true,
        usedDescription: "BACKEND & DATABASE",
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
        description:
          "Web pages written in HTML, CSS, and JavaScript can be hosted on Replit. HTML/CSS/JS repls are given a unique URL that can be shared with your friends, family, peers, and clients. After running a repl, your repl will be hosted at the URL provided in the result tab.",
        websitePreviewImage: require("../assets/replit.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Fleek Hosting",
        link: "https://fleek.co/",
        description:
          "Fleek makes it easy to build websites and apps on the new open web: permissionless, trustless, censorship resistant, and free of centralized gatekeepers.",
        websitePreviewImage: require("../assets/fleek.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "begin Hosting",
        link: "https://begin.com/",
        websitePreviewImage: require("../assets/begin.jpg"),
        type: "hostingprovider",
        textColor: "black",
      },
      {
        name: "Render Hosting",
        link: "https://render.com/",
        description:
          "Render is a unified cloud to build and run all your apps and websites with free TLS certificates, a global CDN, DDoS protection, private networks, and auto deploys from Git. Get started for free Contact sales.",
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
        websitePreviewImage: require("../assets/netlify.jpg"),
        type: "hostingprovider",
        textColor: "black",
        isRecommended: true,
        isUsed: true,
        usedDescription: "FRONT-END HOSTING",
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
    colorGeneratorsTools: [
      {
        name: "Color Lightener/Darker",
        link: "/colorlightenerdarker",
        css: "background: rgb(166, 164, 222)",
        available: true,
      },
      {
        name: "Color Pallette Generator",
        link: "/colorPalleteGenerator",
        websitePreviewImage: require("../assets/colorGradient.jpg"),
        available: true,
      },
    ],
    learningTools: [
      //Games to learn code
      {
        name: "Flexbox Froggy",
        link: "https://flexboxfroggy.com/",
        description:
          "A game for learning CSS flexbox. Guide the frog to the lilypad on the right by using the flexbox properties.",
        websitePreviewImage: require("../assets/flexboxfroggy.png"),
      },
      {
        name: "Flexbox Defense",
        link: "http://www.flexboxdefense.com/",
        description:
          "A game for learning CSS flexbox. Defend your base by writing the correct CSS flexbox properties.",
        websitePreviewImage: require("../assets/flexboxdefense.png"),
      },
      {
        name: "Grid Garden",
        link: "https://cssgridgarden.com/",
        description:
          "A game for learning CSS grid. Guide the little bug to the leaf on the right by using the CSS grid properties.",
        websitePreviewImage: require("../assets/gridgarden.png"),
      },
      {
        name: "CSS Diner - Learn CSS selectors",
        link: "https://flukeout.github.io/",
        description:
          "A game for learning CSS selectors. Eat the bugs by writing the correct CSS selectors.",
        websitePreviewImage: require("../assets/cssdiner.png"),
      },
      {
        name: "HEX Invaders",
        link: "http://www.hexinvaders.com/",
        description:
          "A game for learning CSS colors. Defeat the aliens by writing the correct CSS color values.",
        websitePreviewImage: require("../assets/hexinvaders.png"),
      },
      {
        name: "CodeCombat",
        link: "https://codecombat.com/play",
        description:
          "Learn to code by playing a game. Learn Python, JavaScript, and HTML as you solve puzzles and learn to make real-world games.",
        websitePreviewImage: require("../assets/codecombat.png"),
      },
      {
        name: "CodinGame",
        link: "https://www.codingame.com/ide/puzzle/onboarding",
        description:
          "CodinGame is a challenge-based training platform for programmers where you can improve your coding skills with fun exercises (25+ languages supported).",
        websitePreviewImage: require("../assets/codingame.png"),
      },
      {
        name: "JSRobot",
        link: "https://lab.reaal.me/jsrobot/",
        description:
          "A game for learning JavaScript. Guide the robot to the flag by writing the correct JavaScript code.",
        websitePreviewImage: require("../assets/jsrobot.png"),
      },
      {
        name: "Pixact.ly",
        link: "https://pixact.ly/",
        description: "A game for learning the porportions of width and height.",
        websitePreviewImage: require("../assets/pixactly.png"),
      },
    ],
    apis: [
      {
        name: "OpenWeatherMap",
        link: "https://openweathermap.org/api",
        description:
          "Current weather and forecasts for any location on Earth including over 200,000 cities.",

      },
      {
        name: "OpenCage",
        link: "https://opencagedata.com/api",
        description:
          "Forward and reverse geocoding, including time zone, elevation, and other data.",

      },
      {
        name: "OpenAQ",
        link: "https://docs.openaq.org/",
        description:
          "Air quality data from around the world.",
      }
    ],
    allUserActivities: [],
  },

  getters: {},
  mutations: {
    setApis(state,payload){
      state.apis = payload
    },
    setUserProjects(state, payload) {
      state.userProjects = payload;
    },
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

      if (state.name === null) {
        localStorage.setItem("userName", state.email.split("@")[0]);
      } else {
        localStorage.setItem("userName", state.name);
      }
      localStorage.setItem("profilePic", state.profilepic);
      localStorage.setItem("email", state.email);
      localStorage.setItem("uid", userdata.user.uid);
    },
    removeUserData(state) {
      state.name = "";
      state.profilepic = "";
      state.email = "";
      state.isLoggedIn = false;
      state.favoriteTools = [];
      state.userSavedColorPallets = [];
      state.quickAccessTools = [];

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
    setHostingProviders(state, payload) {
      state.hostingproviders = payload;
    },
    setAllTools(state, payload) {
      state.allTools = payload;
    },
    setRecurringVisitorCount(state, payload) {
      state.recurringVisitorCount = payload;
    },
    setColorMode(state, payload) {
      state.colorMode = payload;
    },
    setVerticalMenuCollapsed(state, payload) {
      state.verticalMenuCollapsed = payload;
    },
    setLearningTools(state, payload) {
      state.learningTools = payload;
    },

    setShowFeedbackModal(state, payload) {
      state.showFeedbackPopup = payload;
    },
    setGradientGeneratorsTools(state, payload) {
      state.gradientGeneratorsTools = payload;
    },
    setColorGeneratorsTools(state, payload) {
      state.colorGeneratorsTools = payload;
    },
    setfavoritesCategorizedChecked(state, payload) {
      state.favoritesCategorizedChecked = payload;
    },
    setQuickAccessTools(state, payload) {
      state.quickAccessTools = payload;
    },
    setsSelectedItemsQA(state, payload) {
      state.selectedItemsQA = payload;
    },
    setShowInfoModal(state, payload) {
      state.showInfoModal = payload;
    },
    setShowUserProjectCreateModal(state, payload) {
      state.showUserProjectCreateModal = payload;
    },
    setKeysArray(state, payload) {
      state.keysArray = payload;
    },
    setFonts(state, payload) {
      state.fonts = payload;
    }
  },
  actions: {
    async REMOVE_USER_PROJECT({ state,commit }, payload) {
      const res = await fetch(`${state.baseUrlStrapiApi}user-detail-info/removeProject`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
        body: JSON.stringify({data: {
          uid: localStorage.getItem("uid"),
          project: payload
        }}),
      })
      const dt = await res.json();
      commit("setUserProjects", dt.data.attributes.projects);
    },
    async GET_USER_PROJECTS({state, commit}) {
      const res = await fetch(`${state.baseUrlStrapiApi}user-detail-info/getUserProjects/${localStorage.getItem('uid')}`,
        {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        });
      const dt = await res.json();
      console.log(dt);
      commit("setUserProjects", dt.data.attributes.projects);
    },
    async USER_CREATE_PROJECT({ commit, state }, payload) {
      const res = await fetch(`${state.baseUrlStrapiApi}user-detail-info/addProject`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
        body: JSON.stringify({data: {
          uid: localStorage.getItem("uid"),
          project: payload
        }}),
      });
      const data = await res.json();
    },
    async UPDATE_CURRENT_STATUS({ commit, state }, payload) {
      const res = await fetch(`${state.baseUrlStrapiApi}current-status-info`, 
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
        body: JSON.stringify({data: {
          currentStatus: payload.currentStatus,
          statusType: payload.Type
        }}),
      });
      const dt = await res.json();
    },
    async GET_5_YEAR_VISIT_COUNT({ state }) {
      const resp = await fetch(`${state.baseUrlStrapiApi}visit-log-count/get5YearVisits`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const dt = await resp.json();
      return dt.data.attributes;
    },
    async GET_4_WEEK_VISIT_COUNT({  state}) {
      const resp = await fetch(`${state.baseUrlStrapiApi}visit-log-count/getWeeklyVisits`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const dt = await resp.json();
      return dt.data.attributes;
    },
    async GET_12_MONTH_VISIT_COUNT({  state}) {
      const resp = await fetch(`${state.baseUrlStrapiApi}visit-log-count/getMonthlyVisits`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const dt = await resp.json();
      return dt.data.attributes;
    },
    async REMOVE_TOOL_FROM_QUICK_ACCESS_TOOLS({ state, dispatch }, tool) {
      state.quickAccessTools = state.quickAccessTools.filter((t) => {
        return t.name !== tool.name;
      });
      dispatch("SAVE_QUICK_ACCESS_TOOLS", state.quickAccessTools);
    },
    async GET_QUICK_ACCESS_TOOLS({ state, commit }) {
      const resp = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/getQuickAccessTools/${localStorage.getItem("uid")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const dt = await resp.json();
      return dt.data.attributes.quickAccessTools;
    },
    async SAVE_QUICK_ACCESS_TOOLS({ state, commit }, payload) {
      // commit("setQuickAccessTools", payload);
      const resp = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/setQuickAccessTools/${localStorage.getItem("uid")}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: {
              quickAccessTools: payload,
            },
          }),
        }
      );
      const data = await resp.json();
    },
    async SET_FAVORITES_CATEGORIZED({ state, commit }, isChecked) {
      commit("setfavoritesCategorizedChecked", isChecked);
      if (localStorage.getItem("uid") !== null) {
        const resp = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-detail-info/setFavoritesCategorized/${localStorage.getItem(
            "uid"
          )}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                favoritesCategorized: state.favoritesCategorizedChecked,
              },
            }),
          }
        );

        const data = await resp.json();
      } else {
        localStorage.setItem("favoritesCategorized", isChecked);
      }
    },
    async GET_FAVORITES_CATEGORIZED({ state,commit }) {
      if (localStorage.getItem("uid") !== null) {
        const resp = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-detail-info/getFavoritesCategorized/${localStorage.getItem(
            "uid"
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );

        const user = await resp.json();
        commit(
          "setfavoritesCategorizedChecked",
          user.data.attributes.favoritesCategorized
        );
        return user.data.attributes.favoritesCategorized;
      } else {
        let isChecked = localStorage.getItem("favoritesCategorized");
        commit("setfavoritesCategorizedChecked", isChecked);
        return isChecked;
      }
    },
    async GET_ALL_FEEDBACK({ state, commit }) {
      const resp = await fetch(`${state.baseUrlStrapiApi}feedbacks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
      });
      const response = await resp.json();

      let tempArr = [];
      response.data.forEach((item) => {
        tempArr.push({
          title: item.attributes.title,
          description: item.attributes.description,
        });
      });
      return tempArr;
    },
    async SUBMIT_FEEDBACK({ state }, payload) {
      const resp = await fetch(`${state.baseUrlStrapiApi}feedbacks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.strapiApiKey,
        },
        body: JSON.stringify({
          data: {
            title: payload.title,
            description: payload.description,
            userName: payload.userName
          },
        }),
      });
      const data = await resp.json();
      return data;
    },
    async GET_USER_VISIT_COUNT({ state }) {
      const resp = await fetch(
        `${
          state.baseUrlStrapiApi
        }visit-log-count/getRouteVisitsFromUID/${localStorage.getItem("uid")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const data = await resp.json();
      return data;
    },
    async UPDATE_COLOR_MODE({ state, commit }, mode) {
      commit("setColorMode", mode);
      if (localStorage.getItem("uid") !== null) {
        const resp = await fetch(
          `${state.baseUrlStrapiApi}user-detail-info/setColorMode`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              userid: localStorage.getItem("uid"),
              colorMode: mode,
            }),
          }
        );
        const data = await resp.json();
        return data;
      }
    },
    async GET_USER_COLOR_MODE({ state, commit }) {
      if (localStorage.getItem("uid") !== null) {
        const res = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-detail-info/getColorMode/${localStorage.getItem("uid")}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const user = await res.json();
        commit("setColorMode", user.data.attributes.selectedColorMode);
        return user.data.attributes.selectedColorMode;
      }
    },
    async GET_CURRENT_STATUS({ state }) {
      let response = await fetch(
        `${state.baseUrlStrapiApi}current-status-info`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      let data = await response.json();
      return data;
    },
    async GET_VOTES_DESIGN_ROUTE({ state }, givenRoute) {
      const res = await fetch(
        `${state.baseUrlStrapiApi}design-vote-info/${givenRoute}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const resp = await res.json();
      return resp.data.attributes;
    },
    async VOTE_DESIGN_ROUTE({ state, commit }, payload) {
      let givenVoteType = payload.voteType;
      let givenRoute = payload.route;
      const res = await fetch(
        `${state.baseUrlStrapiApi}design-vote-info/update-votes`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: {
              route: givenRoute,
              voteType: givenVoteType,
            },
          }),
        }
      );
    },
    async GET_ROUTE_VISITS({ state, commit }, route) {
      const res = await fetch(
        `${state.baseUrlStrapiApi}visit-log-count/getRouteVisits/${route}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.strapiApiKey}`,
          },
        }
      );
      const response = await res.json();
      return {
        route: response.data.attributes.route,
        routeVisitorsCount: response.data.attributes.routeVisitorsCount,
      };
    },
    async FILL_ALL_TOOLS_ARRAY({ state, commit }) {
      let allTools = [];
      for (let tool of state.globalFrontendTools) {
        allTools.push(tool);
      }
      for (let tool of state.hostingproviders) {
        allTools.push(tool);
      }
      for (let tool of state.gradientGeneratorsTools) {
        allTools.push(tool);
      }
      for (let tool of state.colorGeneratorsTools) {
        allTools.push(tool);
      }
      for (let tool of state.learningTools) {
        allTools.push(tool);
      }
      commit("setAllTools", allTools);
    },
    async GET_USER_FAVORITE_TOOLS({ commit, state, dispatch }) {
      if (localStorage.getItem("uid") !== null) {
        //getting user favorite tools from strapi
        const response = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-data/favorite-tools/${localStorage.getItem("uid")}`,
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
        if (res.favoritetools === null) {
          commit("setFavoriteTools", []);
        } else {
          commit("setFavoriteTools", res.favoritetools);
        }

        if (state.favoritetools !== null) {
          dispatch("SET_FAVORITE_TOOLS");
        }
      } else {
        //getting user favorite tools from localStorage
        let toolsString = localStorage.getItem("favTools");
        if (toolsString !== null) {
          let tools = JSON.parse(toolsString);
          commit("setFavoriteTools", tools);

          if (state.favoritetools !== null) {
            dispatch("SET_FAVORITE_TOOLS");
          }
        }
      }

      return state.favoritetools;
    },
    async SET_FAVORITE_TOOLS({ commit, state }) {
      const gbt = JSON.parse(JSON.stringify(state.globalFrontendTools));

      for (const tool of gbt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setGlobalFrontendTools", gbt);

      //hosting providers manipulation favorites
      const htp = JSON.parse(JSON.stringify(state.hostingproviders));
      for (const provider of htp) {
        provider.isFavorited = state.favoritetools.some(
          (t) => t.name === provider.name
        );
      }
      commit("setHostingProviders", htp);

      //learning tools manipulation favorites
      const ltp = JSON.parse(JSON.stringify(state.learningTools));
      for (const tool of ltp) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setLearningTools", ltp);

      //gradient generators manipulation favorites
      const ggt = JSON.parse(JSON.stringify(state.gradientGeneratorsTools));
      for (const tool of ggt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setGradientGeneratorsTools", ggt);

      //color generators manipulation favorites
      const cgt = JSON.parse(JSON.stringify(state.colorGeneratorsTools));
      for (const tool of cgt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setColorGeneratorsTools", cgt);

      //fonts manipulation favorites
      const fnt = JSON.parse(JSON.stringify(state.fonts));
      for (const font of fnt) {
        font.isFavorited = state.favoritetools.some(
          (t) => t.name === font.name
        );
      }

      commit("setFonts", fnt);

      //apis manipulation favorites
      const aps = JSON.parse(JSON.stringify(state.apis));
      for (const api of aps) {
        api.isFavorited = state.favoritetools.some(
          (t) => t.name === api.name
        );
      }
      commit("setApis", aps);
    },
    async SORT_HOSTINGPROVIDERS_BY_RECOMMENDED({ commit, state }) {
      let array = state.hostingproviders.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return 0;
      });
      commit("setHostingProviders", array);
    },
    async SORT_HOSTINGPROVIDERS_BY_USED({ commit, state }) {
      let array = state.hostingproviders.sort((a, b) => {
        if (a.isUsed && !b.isUsed) return -1;
        if (!a.isUsed && b.isUsed) return 1;
        return 0;
      });
      commit("setHostingProviders", array);
    },
    async REMOVE_TOOL_FROM_FAVORITES({ dispatch, commit, state }, tool) {
      if (localStorage.getItem("uid") !== null) {
        const response = await fetch(
          `${state.baseUrlStrapiApi}user-data/favorite-tools/removeToolFromFavorites`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                removeTool: tool,
                uid: localStorage.getItem("uid"),
              },
            }),
          }
        );
        const res = await response.json();
        commit("setFavoriteTools", res.favoritetools);

        //Also remove tool from quick access tools
        
        dispatch("REMOVE_TOOL_FROM_QUICK_ACCESS_TOOLS", tool);
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
      if (localStorage.getItem("uid") !== null) {
        const tools = await fetch(
          `${state.baseUrlStrapiApi}user-data/favorite-tools/addToolToFavorites`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
            body: JSON.stringify({
              data: {
                toolToAdd: tool,
                uid: localStorage.getItem("uid"),
              },
            }),
          }
        );
        const res1 = await tools.json();
        succeeded = true;
      } else {
        if (localStorage.getItem("favTools") === null) {
          localStorage.setItem("favTools", JSON.stringify([]));
        } else {
          //check if tool is already in localstorage
          if ((await dispatch("CHECK_TOOL_PRESENT_LST", tool.name)) === false) {
            favTools = localStorage.getItem("favTools");
            favTools = JSON.parse(favTools);
            favTools.push(tool);
            localStorage.setItem("favTools", JSON.stringify(favTools));
            succeeded = true;
          } else {
            errorText = '"' + tool.name + '"' + " is already in favorites";
            succeeded = false;
          }

          dispatch("GET_USER_FAVORITE_TOOLS");
          return succeeded;
        }
      }

      if (succeeded) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(errorText);
      }
    },
    async CHECK_TOOL_PRESENT_STRAPI({ state }, toolname) {
      let found = false;
      //check if tools is iterable
      if (state.favoritetools.length > 0) {
        found = state.favoritetools.some((tool) => {
          return tool.name === toolname;
        });
      }
      return found;
    },
    async CHECK_TOOL_PRESENT_LST({}, toolname) {
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
    async REMOVE_ADMIN({ state }, payload) {
      try {
        const response = await fetch(
          `${state.baseUrlStrapiApi}admin-info/removeAdmin/${payload}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const res = await response.json();
        return Promise.resolve(res.message);
      } catch (err) {
        return Promise.reject(err);
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
    async GET_USER_ACTIVTIES({ state, commit }, payload) {
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}visit-log-count/visitors/${50}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const response = await rawResponse.json();
      let tempArr = [];
      let index;
      for (let act of response.data.attributes.visitors) {
        let date = new Date(act.createdAt);
        let isAdmin = false;
        if (act.isadmin !== null) {
          if (act.isadmin) {
            isAdmin = "Admin";
          }
        } else {
          isAdmin = "User";
        }
        tempArr.push({
          key: act.id,
          userid: act.userid,
          username: act.name,
          email: act.email,
          route: act.route,
          createdat: date,
          ip: act.ip,
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
      }
    },
    async SEARCH_TOOLS({ state }, payload) {
      let filteredTools = state.allTools.filter((tool) => {
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
      // const userId = await dispatch("GET_USER_ID", user.id);
      const rawResponse = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/setColorPallette/${localStorage.getItem("uid")}`,
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
      const rawResponse = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/setColorPallette/${localStorage.getItem("uid")}`,
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
    },
    async CREATE_ACCOUNT({ state, dispatch, commit }, user) {
      const resp = await fetch(
        `${state.baseUrlStrapiApi}user-detail-info/createUser`,
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
      commit("setUserData", { user: user });
      dispatch("LOAD_USER_SAVED_DATA", user.uid);  
      const content2 = await resp.json();
      return content2.statusCode === 409;
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
    async GET_USER_SAVED_COLOR_PALLETES({ state, commit }, userUid) {
      if (userUid === undefined) {
        return Promise.reject("User uid is undefined");
      }
      const dataResponse = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/getColorPallete/${localStorage.getItem("uid")}`,
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
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}visit-log-count`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const response = await rawResponse.json();
      commit("setPageVisits", response.data.attributes.count);
    },
    async IS_ADMIN({ state, commit }, uid) {
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}admin-info/isadmin/${uid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const admins = await rawResponse.json();
      commit("setIsAdmin", admins.data.attributes.isAdmin);
      return admins.data.attributes.isAdmin;
    },
    async GET_UNIQUE_VISITORS({ state, commit }) {
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}visit-log-count/uniqueVisitors`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const response = await rawResponse.json();
      commit("setUniqueVisitors", response.data.attributes.uniqueVisitors);
    },
  },
  modules: {},
});
