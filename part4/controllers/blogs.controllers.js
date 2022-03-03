import Blog from '../models/blog.models.js';

export const getBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

export const postBlog = (request, response) => {
  const newBlog = new Blog(request.body);
  newBlog.save().then((blog) => {
    response.json(blog);
  });
};
