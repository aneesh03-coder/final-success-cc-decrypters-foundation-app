import "../styles/globals.css";
import Layout from "../components/LayOut";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
