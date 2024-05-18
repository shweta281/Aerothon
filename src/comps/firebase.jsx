import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDurl4eP_NBx3lWZu8VcMAGjnUIO2FYZo",
  authDomain: "aerothonproject.firebaseapp.com",
  projectId: "aerothonproject",
  storageBucket: "aerothonproject.appspot.com",
  messagingSenderId: "825257010229",
  appId: "1:825257010229:web:a2f84279fd2cb5d8e13d7c",
  measurementId: "G-LH0QM5E944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth() ;
export default app ;