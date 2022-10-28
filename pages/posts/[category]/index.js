import Layout from "../../../components/layout";
import {getCategoryPaths, getSortedPostsData} from '../../../lib/posts'
import Categories from '../../../components/posts/categories'

export async function getStaticProps({ params }) {
  const categoryPosts = getSortedPostsData(params.category);
  return {
    props: {
      category: params.category,
      categoryPosts: categoryPosts,
    },
  };
}

export default function Category({ category, categoryPosts }) {
  return <Categories categoriesObj={{ [category]: categoryPosts }} />
}

export async function getStaticPaths() {
  const paths = getCategoryPaths();
  return {
    paths,
    fallback: false,
  };
}

