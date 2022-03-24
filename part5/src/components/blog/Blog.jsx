import PropTypes from 'prop-types';
import Toggable from '../toggable/Toggable';

function Blog({
  title, author, likes, url, updateBlog, id, deleteBlog,
}) {
  return (
    <div className="blog">
      {title}
      <Toggable buttonLabel="view">
        <>
          <p>
            Author:
            {' '}
            {author}
          </p>
          <p>
            Likes:
            {' '}
            {likes}
            {' '}
            <button
              type="button"
              onClick={() => updateBlog({
                title,
                author,
                likes: likes + 1,
                url,
                id,
              }, id)}
            >
              like
            </button>
          </p>
          <p>
            {url}
          </p>
          <button type="button" onClick={() => deleteBlog(id)}>remove</button>
        </>
      </Toggable>
    </div>
  );
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
