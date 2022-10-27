import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    const { data: session } = useSession()
  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbarLeft}>
        <Link href="/">
          Home
        </Link>
      </div>
      <div className={navbarStyles.navbarRight}>
        <Link href="/posts">
           Posts
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