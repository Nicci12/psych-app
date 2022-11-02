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
  const contentArrayH6 = postData.contentHtml.split("<h6>");
  const updatedContentH6 = contentArrayH6.map((itemH6) => {
    if (itemH6.includes("</h6>")) {
      const newSplit = itemH6.split("</h6>");
      const iframeSrc = newSplit[0];
      let endOfString = "";
      if (newSplit[1]) {
        endOfString = newSplit[1];
      }
      const newIframeString = `<iframe src=${iframeSrc} allowFullscreen="true" width="100%" height="350px" style="border:none;justify-self:center;margin:20px 0;"></iframe>`;
      console.log(newIframeString);
      return newIframeString + endOfString;
    } else {
      return itemH6;
    }
  });
  // postData["contentHtml"] = updatedContentH2.join("");
  postData["contentHtml"] = updatedContentH6.join("");
  const categories = getCategories();
  const categoriesObj = {};
  categories.forEach((fileName) => {
    const postsData = getSortedPostsData(fileName);
    categoriesObj[fileName] = postsData;
  });
  postData["h2TitlesArray"] = h2TitlesArray;
  postData["contentHtml"] = updatedContentH2.join("");

  return {
    props: {
      category: params.category,
      article: params.article,
      categoriesObj: categoriesObj,
      postData: postData,
    },
  };
}

export default function Article({
  category,
  article,
  postData,
  categoriesObj,
}) {
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
  return (
    <Layout>
      <div className={tocStyles.articlesTocWrapper}>
        {postData.h2TitlesArray.map((heading, index) => {
          if (heading === selectedHeader) {
            return (
              <h3 className={tocStyles.tocTitle} key={heading + index}>
                {heading}
              </h3>
            );
          } else {
            return (
              <h3 className={tocStyles.tocTitle} key={heading + index}>
                <a href={`#${heading.replace(/ /g, "-")}`}>{heading}</a>
              </h3>
            );
          }
        })}
      </div>
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
                    <a>{category}</a>
                  </Link>
                </h3>
                <div className={tocStyles.articlesWrapper}>
                  {categoriesObj[category].map((article) => {
                    if (article.id === postData.article) {
                      return (
                        <h3
                          key={article.uid}
                          className={tocStyles.articleTitle}
                        >
                          {article.title}
                        </h3>
                      );
                    } else {
                      return (
                        <h3
                          key={article.uid}
                          className={tocStyles.articleTitle}
                        >
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
      <div>{article.replace(/-/g, " ")}</div>
      <div>{category}</div>
      <Date dateString={postData.date} />
      <img src={postData.image} />
      <div
        dangerouslySetInnerHTML={{
          __html: postData.contentHtml,
        }}
      />
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