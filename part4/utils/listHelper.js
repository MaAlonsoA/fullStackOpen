export const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

export const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined;
  let favorite = {
    likes: 0,
  };
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog;
  });
  return favorite;
};

export const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined;

  const authors = new Map();
  blogs.forEach(({ author }) => {
    if (authors.get(author) === undefined) authors.set(author, 1);
    else {
      const prevCount = authors.get(author);
      const newCount = prevCount + 1;
      authors.set(author, newCount);
    }
  });
  const mostRepeated = [...authors.entries()].reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc));
  return { author: mostRepeated[0], blogs: mostRepeated[1] };
};

export const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) return undefined;
  const authors = new Map();

  blogs.forEach(({ author, likes }) => {
    if (authors.get(author) === undefined) authors.set(author, likes);
    else {
      const prevLikes = authors.get(author);
      const newLikes = prevLikes + likes;
      authors.set(author, newLikes);
    }
  });

  const mostLiked = [...authors.entries()].reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc));
  return { author: mostLiked[0], likes: mostLiked[1] };
};
