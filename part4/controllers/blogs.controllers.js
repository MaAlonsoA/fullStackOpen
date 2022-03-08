import Blog from '../models/blog.models.js';

export const getBlogs = async (request, response, next) => {
  try {
    const blogsFound = await Blog.find({});
    response.json(blogsFound);
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (request, response, next) => {
  const newBlog = new Blog(request.body);
  try {
    const savedBlog = await newBlog.save();
    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (request, response, next) => {
  const { body } = request;
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {
      new: true, runValidators: true,
    });
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};
