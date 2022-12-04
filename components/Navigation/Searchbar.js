import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useAuthContext } from "../../context/authContext";
import Health from "../../public/images/Health.png"
import Image from "next/image";

const Searchbar = () => {
  const authContext = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global">
            <div className="flex items-center lg:min-w-0 lg:flex-1" aria-label="Global">
              <a href="#" className="pt-4 p-1.5">
                <span className="sr-only">Alternative Wellness</span>
                <Image
                  width={100}
                  height={100}
                  src={Health}
                  alt="logo"
                />
              </a>
            </div>
            {/* <div className="flex lg:hidden">
                <button
                  className="m-2.5 inline-flex items-center w-100 h-100 justify-center bg-purple-500 rounded-lg p-2.5 text-black-700"
                  onClick={() => setMobileMenuOpen(true)}>
                  Open Main Menu
                </button>
              </div> */}
            <div className=" flex justify-center items-center gap-4 lg:flex lg:min-w-0 lg:justify-center lg:gap-x-12">
              {!authContext.user && (
                <Link href="/">
                  <a className="d-none" href="/home">
                    Posts-disabled
                  </a>
                </Link>
              )}
              {" "}
              {authContext.user && (
                <Link href="/">
                  <a
                    href="/"
                    className="font-semibold text-gray-900 hover:text-gray-900">
                    Home
                  </a>
                </Link>
                )}
              {!authContext.user && (
                <Link href="/">
                  <a
                    href="/"
                    className="font-semibold d-none text-gray-900 hover:text-gray-900">
                    Home- disabled
                  </a>
                </Link>
                )}
                {" "}
              {!authContext.user && (
                <Link href="/posts">
                  <a className="d-none" href="/posts">
                    Posts-disabled
                  </a>
                </Link>
              )}
              {authContext.user && (
                <Link href="/posts">
                  <a
                    href="/posts"
                    className="font-semibold text-gray-900 hover:text-gray-900">
                    Posts
                  </a>
                </Link>
              )}
              {authContext.user && (
                <Link href={`/user-profile`}>
                  <a>
                    <img
                      src={`${authContext.user.image}`}
                      className="h-12 w-12 rounded-full ring-2 ring-white"
                      alt="Profile Picture"
                      loading="lazy"
                    />
                  </a>
                </Link>
              )}
            </div>
            {!authContext.user && (
              <a
                className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                onClick={() => {
                  signIn();
                }}>
                Log In
              </a>
            )}
            {authContext.user && (
              <a
                className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                onClick={() => {
                  signOut({
                    callbackUrl: `${window.location.origin}/`,
                  });
                }}>
                Log Out
              </a>
            )}
          </nav>
          {/* <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <Dialog.Panel
                focus="true"
                className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6">
                <div className="flex h-9 items-center justify-between">
                  <div className="flex">
                    <a href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Alternative Wellness</span>
                      <Image
                    width={100}
                    height={100}
                    src={Health}
                    alt="logo"
                  />
                    </a>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="-m-2.5 inline-flex items-center justify-center bg-blue-700 rounded-md p-2.5 text-black-700"
                      onClick={() => setMobileMenuOpen(false)}>Close Menu
                      <div className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <h1>WELCOME TO ALTERNATIVE WELLNESS</h1>
                    </div>
                    <div className="py-6">
                      {!authContext.user && (
                        <a
                          className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                          onClick={() => {
                            signIn();
                          }}>
                          Sign In
                        </a>
                      )}
                      {!authContext.user && (
                        <a
                          className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                          onClick={() => {
                            signOut({
                              callbackUrl: `${window.location.origin}/`,
                            });
                          }}>
                          Sign Out
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog> */}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
