import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), "posts");

export function getCategories() {
  let fileNames = fs.readdirSync(postsDirectory);
  fileNames = fileNames.filter((item) => item !== "drafts");
  return fileNames;
}

export function getSortedPostsData(category) {
  const categoryDirectory = postsDirectory + "/" + category;
  const fileNames = fs.readdirSync(categoryDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(categoryDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getCategoryPaths() {
  let fileNames = fs.readdirSync(postsDirectory);
  console.log(fileNames);
  fileNames = fileNames.filter((item) => item !== "drafts");
  return fileNames.map((article) => {
    return {
      params: {
        category: article,
      },
    };
  });
}

export function getAllPostIds() {
  const filePaths = fs.readdirSync(postsDirectory);
  const pathsAndFileNames = filePaths.map((path) => {
    const fileNames = fs.readdirSync(postsDirectory + "/" + path);
    return fileNames.map((fileName) => {
      return {
        params: {
          category: path,
          article: fileName.replace(/\.md$/, ""),
        },
      };
    });
  });
  return [].concat.apply([], pathsAndFileNames);
}

export async function getPostData(category, article) {
  const fullPath = path.join(postsDirectory + "/" + category, `${article}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    category,
    article,
    contentHtml,
    ...matterResult.data,
  };
}
