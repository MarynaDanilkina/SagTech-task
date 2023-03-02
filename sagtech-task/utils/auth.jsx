import React, { useState, useEffect, useContext, createContext } from "react";
// import queryString from "query-string";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// 
// const app = firebase.initializeApp(firebaseConfig)
// const firebaseConfig = {
//   apiKey: "AIzaSyD3rpuRH92zeoSpdJZzRp_pixuZH0oHeLM",
//   authDomain: "calendar-2ea87.firebaseapp.com",
//   projectId: "calendar-2ea87",
//   storageBucket: "calendar-2ea87.appspot.com",
//   messagingSenderId: "694460366490",
//   appId: "1:694460366490:web:78d89402317597d2886923",
//   measurementId: "G-F89K699QZK",
// };
// 
// const auth = app.auth();
// 
// const authContext = createContext();
// const getFromQueryString = (key) =>
//   queryString.parse(window.location.search)[key];
// export const useAuth = () => useContext(authContext);
// 
// function useProvideAuth() {
//   const [user, setUser] = useState(null);
// 
//   const signin = (email, password) =>
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((response) => {
//         setUser(response.user);
//         return response.user;
//       });
// 
//   const signup = (email, password) =>
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((response) => {
//         setUser(response.user);
//         return response.user;
//       });
// 
//   const signout = () =>
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//       });
// 
//   const sendPasswordResetEmail = (email) =>
//     firebase
//       .auth()
//       .sendPasswordResetEmail(email)
//       .then(() => true);
// 
//   const confirmPasswordReset = (password, code) => {
//     const resetCode = code || getFromQueryString("oobCode");
// 
//     return firebase
//       .auth()
//       .confirmPasswordReset(resetCode, password)
//       .then(() => true);
//   };
// 
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((userValue) => {
//       if (userValue) {
//         setUser(userValue);
//       } else {
//         setUser(false);
//       }
//     });
// 
//     return () => unsubscribe();
//   }, []);
// 
//   return {
//     userId: user && user.uid,
//     signin,
//     signup,
//     signout,
//     sendPasswordResetEmail,
//     confirmPasswordReset,
//   };
// }
// 
// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }
// 