import Link from "next/link";
import navbarStyles from "../../styles/navbar.module.css";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { useAuthContext } from "../../context/authContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Searchbar = () => {
  const authContext = useAuthContext();
  return (
    <>
      <Navbar bg="light" expand="lg" width={100}>
        <Container width={100}>
              {authContext.user === "admin" && (
                <Link href={`/admin`}>
                  <a>Admin Dashboard</a>
                </Link>
              )}
              <a className="navbar-brand" href="/">
                Alternative Wellness
              </a>
              <div
                className="expand d-flex flex-directio-row navbar-expand"
                id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link href="/">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/">
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {!authContext.user && (
                      <Link href="/posts">
                        <a className="d-none" href="/posts">
                          Posts-disabled
                        </a>
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {authContext.user && (
                      <Link href="/posts">
                        <a className="nav-link active" href="/posts">
                          Posts
                        </a>
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {!authContext.user && (
                      <span>
                        <a
                          className="nav-link active"
                          onClick={() => {
                            signIn();
                          }}>
                          Sign In
                        </a>
                      </span>
                    )}
                  </li>
                  <li className="nav-item">
                    {authContext.user && (
                      <div>
                        <a
                          className="nav-link active"
                          onClick={() => {
                            signOut({
                              callbackUrl: `${window.location.origin}/`,
                            });
                          }}>
                          Sign Out
                        </a>
                      </div>
                    )}
                  </li>
                </ul>
                {authContext.user && (
                  <Link href={`/user-profile`}>
                    <a className={navbarStyles.navbarLinkRight}>
                      <img
                        src={`${authContext.user.image}`}
                        className="rounded-circle"
                        height="25"
                        alt="Profile Picture"
                        loading="lazy"
                      />
                    </a>
                  </Link>
                )}
              </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Searchbar;

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
