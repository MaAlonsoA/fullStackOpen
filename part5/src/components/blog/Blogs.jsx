import PropTypes from 'prop-types';

import Blog from './Blog';

export default function Blogs({ blogsToRender }) {
  return (
    <div>
      <h2>blogs</h2>
      {blogsToRender.map((blog) => (
        <Blog
          key={blog.id}
          title={blog.title}
          author={blog.author}
        />
      ))}
    </div>
  );
}

Blogs.propTypes = {
  blogsToRender: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
