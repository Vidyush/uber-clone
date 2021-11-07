import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCk6RCkT7BhmagmLStp_pukjisoRaZ3OJM",
  authDomain: "uber-clone-d6c1c.firebaseapp.com",
  projectId: "uber-clone-d6c1c",
  storageBucket: "uber-clone-d6c1c.appspot.com",
  messagingSenderId: "1072913163526",
  appId: "1:1072913163526:web:396997f7fd4230e55caa87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()

export {app,provider,auth}