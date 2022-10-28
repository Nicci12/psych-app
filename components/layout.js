import layoutStyles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Navbar from "./Navigation/Navbar";

export default function Layout({ children, home }) {
  return (
    <>
      <Navbar />
      <div className={layoutStyles.container}>
        <h1 className={layoutStyles.header}>Blog Posts</h1>
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
