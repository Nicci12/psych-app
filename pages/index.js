import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, {useState } from "react";
import Navbar from "../components/Navigation/Navbar";

export const name = "Welcome to Alternative Wellness";
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
  return {
    props: {
      categoriesObj,
    },
  };
}

export default function Home() {
  const [search, setSearch] = useState("")


  function handleChange(e){
    setSearch(e.target.value)
  }


  return (
    <>
      <Navbar />
      <div className={utilStyles.searchDiv}>
      <input type="text" placeholder="Search Here" className={utilStyles.navbar} onChange={handleChange} />
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
