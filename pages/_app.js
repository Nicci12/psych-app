import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "../context/authContext";
import "../styles/global.css";
import Navbar from "../components/navigation/Navbar";

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