import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "../context/authContext";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "../styles/global.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}
