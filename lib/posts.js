import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


const postsDirectory = path.join(process.cwd(), 'posts')

export function getCategories(){
  let fileNames = fs.readdirSync(postsDirectory)
  console.log(fileNames);
  fileNames = fileNames.filter((item) => item !== "drafts");
  console.log(fileNames);
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
  console.log(fileNames)
  fileNames = fileNames.filter((item) => item !== "drafts");
  return fileNames.map((fileName) => {
    return {
      params: {
        category: fileName,
      },
    };
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        article,
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}