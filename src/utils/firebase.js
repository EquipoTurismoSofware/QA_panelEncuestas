import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyClaOSLm01Aq3-ZWcKkR8vA5Y3ueoeGWGo",
  authDomain: "ecuestasestablecimientos.firebaseapp.com",
  projectId: "ecuestasestablecimientos",
  storageBucket: "ecuestasestablecimientos.appspot.com",
  messagingSenderId: "754744091882",
  appId: "1:754744091882:web:c9f45891db5544fbe82393",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);