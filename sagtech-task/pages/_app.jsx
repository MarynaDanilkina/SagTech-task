/* eslint-disable import/no-extraneous-dependencies */
import "../styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Layout from "../components/Layout";
import store from "../toolkitRedux/index";
import { auth } from "@/config/firebase";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
}

export default MyApp;
