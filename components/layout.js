import layoutStyles from "../styles/layout.module.css";
import Link from "next/link";
import Navbar from "../components/Navigation/Navbar";

export default function Layout({ children, home }) {
  return (
    <>
      <Navbar />
      <div className={layoutStyles.container}>
        <main className={layoutStyles.children}>{children}</main>
        {!home && (
          <div className={layoutStyles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
