import { getAllPosts } from './posts';

// 모든 태그 목록 가져오기
export async function getAllTags() {
  const posts = getAllPosts();
  const tagsSet = new Set();

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
}

// 특정 태그가 있는 게시물만 가져오기
export async function getPostsByTag(tag) {
  const allPosts = getAllPosts();

  return allPosts.filter(post =>
    post.tags &&
    Array.isArray(post.tags) &&
    post.tags.includes(tag)
  );
}

// 태그별 포스트 수 가져오기
export async function getTagCounts() {
  const posts = getAllPosts();
  const tagCount = {};

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tagCount[tag]) {
          tagCount[tag]++;
        } else {
          tagCount[tag] = 1;
        }
      });
    }
  });

  return tagCount;
}