import { useState, useEffect } from 'react';

import Blogs from './components/blog/Blogs';
import Notification from './components/notification/Notification';
import LoginForm from './components/login/LoginForm';

import { setToken, getAllBlogs, postNewBlog } from './services/blog.service';
import login from './services/login.service';

import './main.css';

function App() {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [notification, setNotification] = useState({ type: '', message: '' });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(async () => {
    setBlogs(await getAllBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      setToken(loggedUser.token);
    }
  }, []);

  const messageHandler = (type, message, time = 3000) => {
    setNotification({
      type,
      message,
    });
    setTimeout(() => {
      setNotification({
        type: '',
        message: '',
      });
    }, time);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await login({ username, password });
      setUser(loggedUser);
      setToken(loggedUser.token);

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(loggedUser));
      setUsername('');
      setPassword('');
      messageHandler('success', 'successful login');
    } catch (error) {
      messageHandler('error', 'wrong username or password', 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      await postNewBlog({ title, author, url });
      setAuthor('');
      setUrl('');
      setTitle('');
      setBlogs(await getAllBlogs());
    } catch (error) {
      messageHandler('error', error.message, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedBlogsUser');
  };

  const renderNewBlogForm = () => (
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

  return (
    <div>
      <div>
        { !notification.type ? null : (
          <Notification type={notification.type} message={notification.message} />
        )}
      </div>
      <div>
        {user === null ? (
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            setUsername={({ target }) => setUsername(target.value)}
            setPassword={({ target }) => setPassword(target.value)}
          />
        ) : <button type="button" onClick={handleLogout}>Logout</button> }
        {user !== null && (
          <div>
            <Blogs blogsToRender={blogs} />
            {renderNewBlogForm()}
          </div>
        ) }

      </div>

    </div>

  );
}

export default App;
