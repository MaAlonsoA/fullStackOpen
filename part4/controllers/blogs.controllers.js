import Blog from '../models/blog.models.js';
import User from '../models/user.models.js';

export const getBlogs = async (request, response, next) => {
  try {
    const blogsFound = await Blog.find({}).populate('user', {
      name: 1,
    });
    response.json(blogsFound);
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (request, response, next) => {
  const {
    title, author, url, likes,
  } = request.body;
  const { userId } = request;
  const user = await User.findById(userId);
  const newBlog = new Blog({
    title, author, url, likes, user: user.id,
  });

  try {
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (request, response, next) => {
  const { id } = request.params;
  const { userId } = request;

  const blogToDelete = await Blog.findById(id);

  if (userId === blogToDelete.user.toString()) {
    try {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    response.status(401).end();
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
