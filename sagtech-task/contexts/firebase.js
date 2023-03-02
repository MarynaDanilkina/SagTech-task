import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app"
import "firebase/auth"
console.log(firebase);
// const firebaseConfig = {
//   apiKey: "AIzaSyD3rpuRH92zeoSpdJZzRp_pixuZH0oHeLM",
//   authDomain: "calendar-2ea87.firebaseapp.com",
//   projectId: "calendar-2ea87",
//   storageBucket: "calendar-2ea87.appspot.com",
//   messagingSenderId: "694460366490",
//   appId: "1:694460366490:web:78d89402317597d2886923",
//   measurementId: "G-F89K699QZK",
// }
const firebaseConfig = {
  apiKey: "AIzaSyD3rpuRH92zeoSpdJZzRp_pixuZH0oHeLM",
  authDomain: "calendar-2ea87.firebaseapp.com",
  projectId: "calendar-2ea87",
  storageBucket: "calendar-2ea87.appspot.com",
  messagingSenderId: "694460366490",
  appId: "1:694460366490:web:78d89402317597d2886923",
  measurementId: "G-F89K699QZK",
};
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
// export const auth = app.auth()
export default app
