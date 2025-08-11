// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKJtsmqxjWzivN7mq_2-szJ6dBh5tEEH8",
  authDomain: "caresync-b2ac1.firebaseapp.com",
  projectId: "caresync-b2ac1",
  storageBucket: "caresync-b2ac1.appspot.com",
  messagingSenderId: "314234275561",
  appId: "1:314234275561:web:4294c9ab603b7987159278",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export async function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  return signOut(auth);
}
