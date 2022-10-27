import PostsList from '../../components/posts/postsList';

export default function Categories({ categoriesObj }) {
    return (
      <div>
        {Object.keys(categoriesObj).map((category) => {
          return (
            <div key={category}>
              <h2>{category}</h2>
              <PostsList
                category={category}
                categoryPosts={categoriesObj[category]}
              />
            </div>
          );
        })}
      </div>
    );
  }