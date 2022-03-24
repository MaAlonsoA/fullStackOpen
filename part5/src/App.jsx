import { useState, useEffect } from 'react';

import Blogs from './components/blog/Blogs';
import Notification from './components/notification/Notification';

import LoginForm from './components/login/LoginForm';
import { setToken } from './services/blog.service';
import login from './services/login.service';

import './main.css';

function App() {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

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

  const handleLogin = async (userObject) => {
    try {
      const loggedUser = await login(userObject);
      setUser(loggedUser);
      setToken(loggedUser.token);
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(loggedUser));
      messageHandler('success', 'successful login');
    } catch (error) {
      messageHandler('error', 'wrong username or password', 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedBlogsUser');
  };

  return (
    <>
      { !notification.type
        ? null
        : <Notification type={notification.type} message={notification.message} />}

      {user === null
        ? <LoginForm login={handleLogin} />
        : (
          <>
            <button type="button" onClick={handleLogout}>Logout</button>
            <Blogs messageHandler={messageHandler} />
          </>
        )}
    </>
  );
}

export default App;
