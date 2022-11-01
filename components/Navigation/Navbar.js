import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";


const Navbar = () => {
  const { session } = useSession();
  const authContext = useAuthContext();

  useEffect(() => {
    console.log(authContext);
  }, [authContext]);

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
          <button
            className={navbarStyles.navbarLinkRight}
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        )}
        {session && (
          <button
            className={navbarStyles.navbarLinkRight}
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;