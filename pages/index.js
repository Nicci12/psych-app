import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, {useState, useEffect } from "react";
import Navbar from "../components/Navigation/Navbar";
import IconBreadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import { getTwitterUserByHandle, getUserTweets } from "../lib/twitter";

// export const name = "Welcome to Alternative Wellness";
export const siteTitle = "A mental health blog";
export const content= "This website is aimed at helping individuals find alternative types of treatment for mental health";
export const author = "Written and Created by Nicci Dimant"
export const newDate= [
 new Date().toLocaleDateString(),
 ];

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

export default function Home({twitterEmbedsArray}) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    console.log(twitterEmbedsArray);
  }, []);
  


  function handleChange(e){
    setSearch(e.target.value)
  }


  return (
    <>
      <Navbar />
      {/* <div className={utilStyles.twitterWrapper}>
  {twitterEmbedsArray.map((setOfTweets) => {
    return setOfTweets.map((embedData) => {
      return (
        <div className={utilStyles.twitterCard} key={embedData.url}>
          <div className={utilStyles.twitterCardTopOf}>
            <a
              href={`https://twitter.com/${embedData.user_info.username}`}
              className={utilStyles.twitterImageAndNamesWrapper}
            >
              <img
                src={embedData.user_info.profile_image_url}
                className={utilStyles.twitterUserIcon}
              />
              <div className={utilStyles.twitterNamesWrapper}>
                <div className={utilStyles.twitterName}>
                  {embedData.user_info.name}
                </div>
                <div className={utilStyles.twitterUsername}>
                  @{embedData.user_info.username}
                </div>
              </div>
            </a>
            <a
              href={embedData.provider_url}
              className={utilStyles.twitterIcon}
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: embedData.html.split("<script ")[0],
            }}
          />
        </div>
      );
    });
  })}
</div> */}

      <div className={utilStyles.searchDiv}>
      <input type="text" placeholder="Search Here" className={utilStyles.navbar} onChange={handleChange} />
      </div>
      <div className={utilStyles.breadcrumb}>
        <IconBreadcrumbs />
      </div>
      <div className={utilStyles.container}>
        <Image
          className={utilStyles.picture}
          src="/images/profile.jpeg"
          height={400}
          width={400}
          alt={name}
        />
    <div className={utilStyles.div}>
    <h4>{newDate}</h4>
    <h1>{name},<br/>{siteTitle}.</h1>
    <h3>{content} </h3>
    <h5>{author}</h5>
        </div>
      </div>
    
    </>
  );
}

