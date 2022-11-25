import PostsList from '../../components/posts/postsList';
import layoutStyles from "../../styles/layout.module.css";

export default function Categories({ categoriesObj }) {
    return (
      <>
        {Object.keys(categoriesObj).map((category) => {
          return (
            <div className={layoutStyles.titles} key={category}>
              <h1 className={layoutStyles.category}>{category.replace(/-/g," ")}</h1>
              <PostsList
                category={category}
                categoryPosts={categoriesObj[category]}
              />
      <hr></hr>
            </div>
          );
        })}
      </>
    );
  }

  