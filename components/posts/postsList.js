import Link from "next/link";


export default function PostsList({ category, categoryPosts }) {
  return (
    <div className={postsStyles.postsWrapper}>
      {categoryPosts.map((post) => {
        return (
          <Link href={`/posts/${category}/${post.id}`} key={post.title}>
            <a className={postsStyles.postLink}>
              <img src={post.image} className={postsStyles.mainImage} />
              <h3>{post.title}</h3>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
