import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { signIn, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {
  const authContext = useAuthContext();
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          {authContext.user === "admin" && (
            <Link href={`/admin`}>
              <a>Admin Dashboard</a>
            </Link>
          )}
          <a className="navbar-brand" href="/">
            Alternative Wellness
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/posts">
                  <a className="nav-link active" href="/posts">
                    Posts
                  </a>
                </Link>
              </li>
              <li class="nav-item">
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
              </li>
            </ul>
            {authContext.user && (
              <Link href={`/user-profile`}>
                <a className={navbarStyles.navbarLinkRight}>
                  <img
                    src={`${authContext.user.image}`}
                    class="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

{
  /* <div className={navbarStyles.navbar}>
{authContext.user === "admin" && (
  <Link href={`/admin`}>
    <a>Admin Dashboard</a>
  </Link>
)}

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
  
</div> */
}
