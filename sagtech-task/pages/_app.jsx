import "../styles/globals.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../toolkitRedux/index";

function MyApp({ Component, pageProps }) {
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
