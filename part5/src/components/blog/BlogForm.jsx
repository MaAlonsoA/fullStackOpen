import { useState } from 'react';
import PropTypes from 'prop-types';

export default function BlogForm({ setNewBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    setNewBlog(blogObject);
  };
  return (
    <div>
      <h2>New Blog</h2>
      <form onSubmit={handleNewBlog} autoComplete="off">
        <div>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={author}
            name="author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={url}
            name="url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  setNewBlog: PropTypes.func.isRequired,
};
