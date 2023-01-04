import utilStyles from "../styles/utils.module.css";
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, { useState, useEffect } from "react";
import { getTwitterUserByHandle } from "../lib/twitter";
import Searchbar from "../components/Navigation/Searchbar";
import { searchCategories } from "../lib/categories";
import Image from "next/image";
import { Tab } from "@headlessui/react";

export async function getStaticProps() {
  const categories = getCategories();
  const categoriesObj = {};
  categories.forEach((fileName) => {
    const postsData = getSortedPostsData(fileName);
    categoriesObj[fileName] = postsData;
  });
  const twitterEmbedsArray = await getTwitterUserByHandle("ndimant1996");
  console.log(twitterEmbedsArray);
  return {
    props: {
      categoriesObj,
      twitterEmbedsArray,
    },
  };
}

 function Home({ twitterEmbedsArray }) {
  const [status, setStatus] = useState({ selectedTopic: "" });


  useEffect(() => {
    console.log(twitterEmbedsArray);
  }, []);

  function handleSearchCategoryClicked(item) {
    setStatus({ ...status, selectedTopic: item });
  }

  useEffect(() => {
    setStatus({ ...status, selectedTopic: searchCategories[0] });
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  function handleChange(e) {
    setStatus({ ...status, search: e.target.value });
  }
  return (
    <>
      <div className="isolate bg-white">
        <Searchbar />
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[40.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="/public/images/logo.png">
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
        <main>
          <div className="relative px-6 pt-6 lg:px-8">
            <div className="mx-auto max-w-3xl pt-15 pb-20 sm:pt-20 sm:pb-30">
              <div>
                {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center"> */}
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <div className={utilStyles.searchDiv}>
                    <input
                      type="text"
                      placeholder={`Search ${status.selectedTopic.name}`}
                      className={utilStyles.navbar}
                      onChange={handleChange}
                    />
                  </div>
                  {/* </div> */}
                </div>
                {/* <div className={utilStyles.container}> */}
                <Tab.Group>
                  <div className={utilStyles.breadcrumbs}>
                    <span className="mx-2">
                      Search According to Catergories:
                    </span>
                    {searchCategories.map((item) => {
                      return (
                        <Tab.List
                          key={item}
                          onClick={() => handleSearchCategoryClicked(item)}
                          className={
                            item.name === status.selectedTopic.name
                              ? utilStyles.topicName
                              : item.name
                          }>
                          {item.name}/
                        </Tab.List>
                      );
                    })}
                  </div>
                </Tab.Group>
                {/* </div> */}
                <div>
                  <h1 className="text-4xl text-center font-bold tracking-tight pt-5 sm:text-center sm:text-6xl">
                    WELCOME TO ALTERNATIVE WELLNESS
                  </h1>
                  <p className="mt-6 text-lg text-center leading-8 text-gray-600 sm:text-center">
                    ALL THINGS MENTAL HEALTH AND ALTERNATIVE TYPES OF TREATMENT
                  </p>
                  <div className="mt-8 justify-center flex gap-x-4 sm:justify-center">
                    {searchCategories.map((item) => {
                      return (
                        <>
                          {item.name === status.selectedTopic.name ? (
                            <div className={utilStyles.breadcrumbImages}>
                              <Image
                                className="rounded-full"
                                width={600}
                                height={500}
                                src={item.image}></Image>
                            </div>
                          ) : (
                            <div className={utilStyles.noImage}></div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>{" "}
              </div>
            </div>{" "}
          </div>
        </main>
      </div>
    </>

    //      <div className={utilStyles.twitterWrapper}>
    // {twitterEmbedsArray.map((setOfTweets) => {
    //   return setOfTweets.map((embedData) => {
    //     return (
    //       <div className={utilStyles.twitterCard} key={embedData.url}>
    //         <div className={utilStyles.twitterCardTopOf}>
    //           <a
    //             href={`https://twitter.com/${embedData.user_info.username}`}
    //             className={utilStyles.twitterImageAndNamesWrapper}
    //           >
    //             <img
    //               src={embedData.user_info.profile_image_url}
    //               className={utilStyles.twitterUserIcon}
    //             />
    //             <div className={utilStyles.twitterNamesWrapper}>
    //               <div className={utilStyles.twitterName}>
    //                 {embedData.user_info.name}
    //               </div>
    //               <div className={utilStyles.twitterUsername}>
    //                 @{embedData.user_info.username}
    //               </div>
    //             </div>
    //           </a>
    //           <a
    //             href={embedData.provider_url}
    //             className={utilStyles.twitterIcon}
    //           >
    //             <i className="fab fa-twitter"></i>
    //           </a>
    //         </div>
    //         </div>
    //         );
    //       });
    //       <div
    //         dangerouslySetInnerHTML={{
    //           __html: embedData.html.split("<script ")[0],
    //         }}
    //       />
    // })}
    // </div> */}
  );
}

export default Home