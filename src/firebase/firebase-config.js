// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnHcV6vKLj_DoxEVRmlEXVDVrYF0bZi5U",
  authDomain: "ema-john-with-firebase-a-eaf04.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-eaf04",
  storageBucket: "ema-john-with-firebase-a-eaf04.appspot.com",
  messagingSenderId: "513888948896",
  appId: "1:513888948896:web:33584b48529970ffd4afc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;