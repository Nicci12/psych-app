import Link from "next/link";
import layoutStyles from "../../styles/layout.module.css";

export default function PostsList({ category, categoryPosts }) {
  return (
    <>
      <div className={layoutStyles.posts}>
      {categoryPosts.map((post) => {
        return (
          <Link href={`/posts/${category}/${post.id}`} key={post.title}>
            <div className="imageDiv hover-zoom d-flex text-align-center">
              <a>
                <img className={layoutStyles.images} width={400} height={400} src={post.image} />
                <h5>{post.title}</h5>
              </a>
            </div>
          </Link>
        );
      })}
      </div>
    </>
  );
}
