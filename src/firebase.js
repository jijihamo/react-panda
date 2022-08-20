import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC985irVhzcG035laBTJZTMSWhBXxYf8Lo",
  authDomain: "react-community-c15c9.firebaseapp.com",
  projectId: "react-community-c15c9",
  storageBucket: "react-community-c15c9.appspot.com",
  messagingSenderId: "610394844461",
  appId: "1:610394844461:web:b46441b150b2b40c3677a4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;