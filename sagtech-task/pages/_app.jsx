import "../styles/globals.css";
import Layout from "../components/Layout";
import { ProvideAuth } from "../utils/auth";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
