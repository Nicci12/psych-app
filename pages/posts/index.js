import React from "react";
import { getCategories, getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/layout";
import Categories from "../../components/posts/categories";



export default function Posts({ categoriesObj }) {

  return (
    <Layout>
      <Categories categoriesObj={categoriesObj} />
    </Layout>
  );
}

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