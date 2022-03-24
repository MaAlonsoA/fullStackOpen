import { useState, useEffect } from 'react';

import Blogs from './components/blog/Blogs';
import Notification from './components/notification/Notification';
import BlogForm from './components/blog/BlogForm';
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

  const setNewBlog = async (newBlog) => {
    try {
      await postNewBlog(newBlog);
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
            <BlogForm
              setNewBlog={setNewBlog}
            />
          </div>
        ) }

      </div>

    </div>

  );
}

export default App;
