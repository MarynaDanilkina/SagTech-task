import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from '../toolkitRedux/index';

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
