import PropTypes from 'prop-types';

function Blog({ title, author }) {
  return (
    <div>
      {title}
      {author}
    </div>
  );
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Blog;
