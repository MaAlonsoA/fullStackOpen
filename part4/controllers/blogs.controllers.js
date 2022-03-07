import Blog from '../models/blog.models.js';

export const getBlogs = async (request, response) => {
  try {
    const blogsFound = await Blog.find({});
    response.json(blogsFound);
  } catch (error) {
    response.status(404).json();
  }
};

export const postBlog = (request, response) => {
  const newBlog = new Blog(request.body);
  newBlog.save().then((blog) => {
    response.json(blog);
  });
};
