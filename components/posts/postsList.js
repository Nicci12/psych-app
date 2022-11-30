import Link from "next/link";
import layoutStyles from "../../styles/layout.module.css";

export const newDate = [new Date().toLocaleDateString()];
export default function PostsList({ category, categoryPosts }) {
  return (
    <>
      {categoryPosts.map((post) => {
        return (
          <div>
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6 max-w-screen-ml">
                <div className="grid gap-2 grid-col-2">
                  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <Link
                      href={`/posts/${category}/${post.id}`}
                      key={post.title}>
                      <div className="imageDiv hover-zoom d-flex text-align-center">
                        <a>
                          <img
                            className={layoutStyles.images}
                            width={400}
                            height={400}
                            src={post.image}
                          />
                        </a>
                      </div>
                    </Link>

                    <div className="flex justify-between items-center mb-5 text-gray-500">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                        </svg>
                        Tutorial
                      </span>
                      <span className="text-sm">{newDate}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href={`/posts/${category}/${post.id}`}>{post.title}</a>
                    </h2>
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                      Static websites are now used to bootstrap lots of websites
                      and are becoming the basis for a variety of tools that
                      even influence both web designers and developers influence
                      both web designers and developers.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          class="w-7 h-7 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                          alt="Jese Leos avatar"
                        />
                      </div>
                      <a
                        href={`/posts/${category}/${post.id}`}
                        className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                        Read more
                        <svg
                          class="ml-2 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </a>
                    </div>
                  </article>
                </div>
              </div>
              </div>
        );
      })}
    </>
  );
}
