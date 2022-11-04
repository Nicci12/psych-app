import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";


const Navbar = () => {
  const authContext = useAuthContext();
  return (
    <div className={navbarStyles.navbar}>
      {authContext.user && (
        <Link href={`/user-profile`}>
          <a className={navbarStyles.navbarLinkRight}>
            <img
              src={`${authContext.user.image}`}
              className={navbarStyles.navbarImage}
            />
          </a>
        </Link>
      )}

      <div className={navbarStyles.navbarLeft}>
        <Link href="/">
          <a className={navbarStyles.navbarLinkLeft}>Home</a>
        </Link>
      </div>
      <div className={navbarStyles.navbarRight}>
        <Link href="/posts">
          <a className={navbarStyles.navbarLinkRight}>Posts</a>
        </Link>
        {!authContext.user && (
          <button
            className={navbarStyles.navbarButton}
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        )}
        {authContext.user && (
          <button
            className={navbarStyles.navbarButton}
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