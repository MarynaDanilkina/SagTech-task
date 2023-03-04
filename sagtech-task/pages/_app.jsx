import "../styles/globals.css";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Layout from "../components/Layout";
import store from "../toolkitRedux/index";
import { auth } from "@/firebase";

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
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
}

export default MyApp;
