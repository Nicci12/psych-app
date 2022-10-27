import Head from "next/head";
import Image from 'next/image'
import utilStyles from "../styles/utils.module.css";
import layoutStyles from  '../styles/layout.module.css'
import { getCategories, getSortedPostsData } from "../lib/posts";
import React, { useEffect } from "react";
import Navbar from "../components/Navigation/Navbar";



export const name = 'Welcome to Alternative Wellness'
export const siteTitle = 'Next.js Sample Website'


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

export default function Home({home}) {

  return (
    <div>
  <Head>
<title>{siteTitle}</title>
       </Head>
      <Navbar />
      <header className={layoutStyles.header}>

            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
              />
              </header>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
      
      <div >
        </div>

  
    </div>
  )
}


// export default function Home() {
//   useEffect(() => {
//     console.log(categories);
//   }, []);
//   return (
//     <>
//       <Layout home>
//         <Head>
//           <title>{siteTitle}</title>
//         </Head>
//         <Categories />
//         <section className={utilStyles.headingMd}>
//           <p>
//             Hello, I’m <strong>Shu</strong>. I’m a software engineer and a
//             translator (English/Japanese). You can contact me on{" "}
//             <a href="https://twitter.com/chibicode">Twitter</a>.
//           </p>
//           <p>
//             (This is a sample website - you’ll be building a site like this in{" "}
//             <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//           </p>
//         </section>

//       </Layout>
//     </>
//   );
// }
