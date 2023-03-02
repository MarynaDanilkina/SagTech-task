import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "./firebase.js"
import firebase from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";

console.log(firebase);
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    console.log('email', email);
    console.log('password', password);
    const result = auth.createUserWithEmailAndPassword(email, password);
    console.log(result);
    // return auth.createUserWithEmailAndPassword(email, password)
    // return auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((response) => {
    //             setUser(response.user);
    //             return response.user;
    //         });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    console.log('unsubscribe', unsubscribe)
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
