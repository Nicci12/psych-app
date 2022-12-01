import Layout from "../../../components/layout";
import Link from "next/link";
import {
  getAllPostIds,
  getPostData,
  getCategories,
  getSortedPostsData,
} from "../../../lib/posts";
import React, { useEffect, useState } from "react";
import tocStyles from "../../../styles/toc.module.css";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.category, params.article);

  const h2TitlesArray = [];
  const contentArrayH2 = postData.contentHtml.split("<h2>").slice(1);
  const updatedContentH2 = contentArrayH2.map((itemH2) => {
    if (itemH2.includes("</h2>")) {
      const textH2 = itemH2.split("</h2>")[0];
      const itemsAfterH2 = itemH2.split("</h2>")[1];
      h2TitlesArray.push(textH2);
      const id = textH2.replace(/ /g, "-");
      const newItem = `<a href="#${id}"><h2 id="${id}">${textH2}</h2></a>${itemsAfterH2}`;
      return newItem;
    } else {
      return itemH2;
    }
  });
  postData["h2TitlesArray"] = h2TitlesArray;
  postData["contentHtml"] = updatedContentH2.join("");

  const contentArrayH6 = postData.contentHtml.split("<h6>");
  const updatedContentH6 = contentArrayH6.map((itemH6) => {
    if (itemH6.includes("</h6>")) {
      const newSplit = itemH6.split("</h6>");
      const iframeSrc = newSplit[0];
      let endOfString = "";
      if (newSplit[1]) {
        endOfString = newSplit[1];
      }
      const newIframeString = `<iframe src=${iframeSrc} allowFullscreen="true" width="30%" height="200px" style="border:none;align-self:center;margin:20px 0 0 20px;"></iframe>`;
      return newIframeString + endOfString;
    } else {
      return itemH6;
    }
  });
  const categories = getCategories();
  const categoriesObj = {};
  categories.forEach((fileName) => {
    const postsData = getSortedPostsData(fileName);
    categoriesObj[fileName] = postsData;
  });
  postData["contentHtml"] = updatedContentH6.join("");

  return {
    props: {
      category: params.category,
      article: params.article,
      categoriesObj: categoriesObj,
      postData: postData,
    },
  };
}

export default function Article({ article, postData, categoriesObj }) {
  const router = useRouter();
  const [selectedHeader, setSelectedHeader] = useState("/posts");
  const [windowWidth, setWindowWidth] = useState();
  const [showBlogToc, setShowBlogToc] = useState(true);

  useEffect(() => {
    console.log(postData);
  }, []);

  const toggleBlogToc = () => {
    setShowBlogToc(!showBlogToc);
  };
  useEffect(() => {
    setWindowWidth(window.outerWidth);

    function handleResize() {
      setWindowWidth(window.outerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 750) {
      if (!showBlogToc) {
        setShowBlogToc(true);
      }
    } else {
      if (showBlogToc) {
        setShowBlogToc(false);
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    setSelectedHeader(router.asPath.split("/posts")[1]);
  }, []);

  useEffect(() => {
    console.log(selectedHeader);
  }, [selectedHeader]);

  return (
    <Layout>
      {windowWidth < 750 && (
        <div className={tocStyles.hamburgerMenu} onClick={toggleBlogToc}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {showBlogToc && (
        <div className={tocStyles.blogTocWrapper}>
          {Object.keys(categoriesObj).map((category) => {
            return (
              <div key={category} className={tocStyles.categoryWrapper}>
                <h3 className={tocStyles.categoryTitle}>
                  <Link href={`/posts/${category}`}>
                    <a>{category.replace(/-/g, " ")}</a>
                  </Link>
                </h3>
                <div className={tocStyles.articlesWrapper}>
                  {categoriesObj[category].map((article) => {
                    if (article.id === postData.article) {
                      return (
                        <h3
                          key={article.uid}
                          className={tocStyles.articleTitle}>
                          {article.title}
                        </h3>
                      );
                    } else {
                      return (
                        <h3
                          key={article.uid}
                          className={tocStyles.articleTitle}>
                          <Link href={`/posts/${category}/${article.id}`}>
                            <a>{article.title}</a>
                          </Link>
                        </h3>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <main class="pt-8 my-4 lg:pt-16 lg:pb-2 bg-white dark:bg-gray-900">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <div class="grid items-center grid-flow-col gap-4">
            <div class="row-span-1">
              <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header class="mb-4 lg:mb-6 not-format">
                  <address class="flex items-center mb-6 not-italic">
                    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        class="mr-4 w-16 h-16 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Jese Leos"></img>
                      <div>
                        <a
                          href="#"
                          rel="author"
                          class="text-xl font-bold text-gray-900 dark:text-white">
                          Nicola Dimant
                        </a>
                        <p class="text-base font-light text-gray-500 dark:text-gray-400">
                          FullStack Developer and content writer
                        </p>
                        <p class="text-base font-light text-gray-500 dark:text-gray-400">
                          <time
                            pubdate
                            datetime="2022-02-08"
                            title="February 8th, 2022">
                            <Date dateString={postData.date} />
                          </time>
                        </p>
                      </div>
                    </div>
                  </address>
                  <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {article.replace(/-/g, " ")}
                  </h1>
                </header>
                <p class="lead">
                  Flowbite is an open-source library of UI components built with
                  the utility-first classes from Tailwind CSS. It also includes
                  interactive elements such as dropdowns, modals, datepickers.
                </p>
                <figure>
                  <img src={postData.image} className="rounded" alt="" />
                  <figcaption>Anonymous</figcaption>
                </figure>
              </article>
            </div>
            <div className="row-span-2 col-span-2 mt-8 ml-8 items-center">
              <h1 className="text-justify font-semi-bold underline text-3xl">
                Table Contents
              </h1>
              {postData.h2TitlesArray.map((heading, index) => {
                if (heading.replace(/ /g, "-") === selectedHeader) {
                  return (
                    <ul>
                      <li className={tocStyles.link} key={heading + index}>
                        {heading}
                      </li>
                    </ul>
                  );
                } else {
                  return (
                    <ul>
                      <li
                        className={tocStyles.link}
                        onClick={() => {
                          setSelectedHeader(heading.replace(/ /g, "-"));
                        }}
                        key={heading + index}>
                        <a
                          className={tocStyles.link}
                          href={`#${heading.replace(/ /g, "-")}`}>
                          {heading}
                        </a>
                      </li>
                    </ul>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </main>
      <div class="flex flex-col justify-between mx-4 my-4 px-4 mx-auto max-w-screen-xl ">
        <h2 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          {postData.category.replace(/-/g, " ")}
        </h2>
        <span>
          <p className="text-start">
            <div
              dangerouslySetInnerHTML={{
                __html: postData.contentHtml,
              }}
            />
          </p>
        </span>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}
