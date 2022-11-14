import Link from "next/link";
import layoutStyles from "../../styles/layout.module.css";


export default function PostsList({ category, categoryPosts }) {
  return (
    <div className={layoutStyles.posts}>
      {categoryPosts.map((post) => {
        return (
          <Link href={`/posts/${category}/${post.id}`} key={post.title}>
            <a>
              <img classname={layoutStyles.images} src={post.image} />
              <h3>{post.title}</h3>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
