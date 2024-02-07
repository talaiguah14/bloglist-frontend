import { useState, useEffect } from 'react';
import Blog from './components/organisms/Blog';
import Login from './components/organisms/loginForm/Login';
import Notification from './components/atoms/notification/notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Button from './components/atoms/button/Button';
import BlogForm from './components/organisms/blogForm/blogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleCreateBlog = async (event) => {
    
  };
  const handleLUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <Notification message={confirmMessage} className={'confirm'} />
      <Notification message={errorMessage} className={'error'} />
      {!user && (
        <Login
          handleLogin={handleLogin}
          handleLUsernameChange={handleLUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in <Button type='submit'>logout</Button>
          </p>
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            title={title}
            handleTitleChange={handleTitleChange}
            author={author}
            handleAuthorChange={handleAuthorChange}
            url={url}
            handleUrlChange={handleUrlChange}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
