import utilStyles from "../styles/utils.module.css";
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, { useState, useEffect } from "react";
import { getTwitterUserByHandle } from "../lib/twitter";
import Searchbar from "../components/Navigation/Searchbar";
import { searchCategories } from "../lib/categories";
import Image from "next/image";

export const name = "Alternative Wellness";
export const content =
  "All things mental health and alternative treatment"
export const newDate = [new Date().toLocaleDateString()];

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

export default function Home({ twitterEmbedsArray }) {
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
    <div className={utilStyles.hero}>
      <Searchbar />
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
        <input
          type="text"
          placeholder={`Search ${status.selectedTopic.name}`}
          className={utilStyles.navbar}
          onChange={handleChange}
        />
      </div>
      <div className={utilStyles.container}>
        <div className={utilStyles.breadcrumbs}>
          <span className="mx-2">Search According to Catergories:</span>
          {searchCategories.map((item) => {
            return (
              <div
                onClick={() => handleSearchCategoryClicked(item)}
                className={
                  item.name === status.selectedTopic.name
                    ? utilStyles.topicName
                    : item.name
                }>
                {item.name}/
              </div>
            );
          })}
        </div>
        <div className={utilStyles.landingPageText}>
          <div className={utilStyles.textdiv}>
            <h4>{newDate}</h4>
            <h1 className={utilStyles.heading}>
              {name}
            </h1>
            <h2 className>{content} </h2>
          </div>
          {searchCategories.map((item) => {
            return (
              <div className={utilStyles.topics}>
                {item.name === status.selectedTopic.name ? (
                  <div className={utilStyles.breadcrumbImages}>
                    <Image width={600} height={500} src={item.image}></Image>
                  </div>
                ) : (
                  <div className={utilStyles.noImage}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
}
