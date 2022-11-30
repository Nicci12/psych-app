import layoutStyles from "../styles/layout.module.css";
import Link from "next/link";
import Searchbar from "./Navigation/Searchbar";

export default function Layout({ children, home }) {
  return (
    <>
      <Searchbar />
      <div className={layoutStyles.titles}>
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
