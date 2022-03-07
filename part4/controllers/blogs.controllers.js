import Blog from '../models/blog.models.js';

export const getBlogs = async (request, response, next) => {
  try {
    const blogsFound = await Blog.find({});
    response.json(blogsFound);
  } catch (error) {
    next(error);
  }
};

export const postBlog = (request, response) => {
  const newBlog = new Blog(request.body);
  newBlog.save().then((blog) => {
    response.json(blog);
  });
};
