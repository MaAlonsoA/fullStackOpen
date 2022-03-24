import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  deleteBlog, getAllBlogs, postNewBlog, updateBlog,
} from '../../services/blog.service';
import Blog from './Blog';
import Toggable from '../toggable/Toggable';
import BlogForm from './BlogForm';

export default function Blogs({ messageHandler }) {
  const [blogs, setBlogs] = useState([]);
  const toggableRef = useRef();

  useEffect(async () => {
    setBlogs(await getAllBlogs());
  }, []);

  const setNewBlog = async (newBlog) => {
    toggableRef.current.toggleVisibility();
    try {
      await postNewBlog(newBlog);
      setBlogs(await getAllBlogs());
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const handleUpdateBlog = async (blogObject, id) => {
    try {
      await updateBlog(blogObject, id);
      setBlogs(await getAllBlogs());
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(await getAllBlogs());
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };
  return (
    <>
      <div className="blogList">
        <h2>Blogs</h2>
        {blogs.sort((prev, curr) => curr.likes - prev.likes).map((blog) => (
          <Blog
            key={blog.id}
            title={blog.title}
            author={blog.author}
            likes={blog.likes}
            url={blog.url}
            id={blog.id}
            updateBlog={handleUpdateBlog}
            deleteBlog={handleDeleteBlog}
          />
        ))}
      </div>
      <Toggable buttonLabel="New blog" ref={toggableRef}>
        <BlogForm setNewBlog={setNewBlog} />
      </Toggable>
    </>

  );
}

Blogs.propTypes = {
  messageHandler: PropTypes.func.isRequired,
};
