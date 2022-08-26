import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABW6yIexuOiGeNJd8jK8_AuUB-GqTlpwQ",
    authDomain: "frontendplatform-83b6d.firebaseapp.com",
    projectId: "frontendplatform-83b6d",
    storageBucket: "frontendplatform-83b6d.appspot.com",
    messagingSenderId: "430809266431",
    appId: "1:430809266431:web:6b6f816b983a89084234ca",
    measurementId: "G-KDFQEEQDZJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


createApp(App).use(store).use(router).mount('#app')