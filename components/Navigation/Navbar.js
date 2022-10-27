import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    const { data: session } = useSession()
  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbarLeft}>
        <Link href="/">
          <a className={navbarStyles.navbarLinkLeft}>Home</a>
        </Link>
      </div>
      <div className={navbarStyles.navbarRight}>
        <Link href="/posts">
          <a className={navbarStyles.navbarLinkRight}>Posts</a>
        </Link>
        {!session && (
  <div
    className={navbarStyles.navbarLinkRight}
    onClick={() => {
      signIn();
    }}
  >
    Sign In
  </div>
)}
{session && (
  <div
    className={navbarStyles.navbarLinkRight}
    onClick={() => {
      signOut();
     }}
   >
    Sign Out
  </div>
)}
      </div>
    </div>
  );
};

export default Navbar;