import Link from "next/link";


export default function PostsList({ category, categoryPosts }) {
  return (
    <div>
      {categoryPosts.map((post) => {
        return (
          <Link href={`/posts/${category}/${post.id}`} key={post.title}>
            <a>
              <img src={post.image} />
              <h3>{post.title}</h3>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
