import Head from "next/head";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, { useEffect } from "react";
import Navbar from "../components/Navigation/Navbar";

export const name = "Welcome to Alternative Wellness";
export const siteTitle = "A mental health blog aimed at helping individuals find alternative types of treatment for mental health";

export async function getStaticProps() {
  const categories = getCategories();
  const categoriesObj = {};
  categories.forEach((fileName) => {
    const postsData = getSortedPostsData(fileName);
    categoriesObj[fileName] = postsData;
  });
  return {
    props: {
      categoriesObj,
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={utilStyles.container}>
        <Image
          className={utilStyles.picture}
          src="/images/profile.jpeg"
          height={400}
          width={400}
          alt={name}
        />
        <div>
          <h1 className={utilStyles.heading}>{name}</h1>
          <h2 className={utilStyles.siteTitle}>{siteTitle}</h2>
        </div>
      </div>
    </>
  );
}
