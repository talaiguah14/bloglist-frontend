import { useState, useEffect, useRef } from 'react';
import Blog from './components/organisms/Blog';
import Login from './components/organisms/loginForm/Login';
import Notification from './components/atoms/notification/notification';
import Button from './components/atoms/button/Button';
import BlogForm from './components/organisms/blogForm/blogForm';
import Togglable from './components/atoms/togglable/togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const blogFormRef = useRef()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)      
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginService.login({
        username,
        password,
      });      
      if(response.status === 200){
        const user = response.data
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
        blogService.setToken(user.token)
        setUser(user);
        setUsername('');
        setPassword('');
      }else if(response.status === 401){
        setErrorMessage(response.data.message);
        setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      }
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const createBlog = async (event) => {
    event.preventDefault();

   const blogObject = {
      title: newTitle,
      author: newTitle,
      url: newUrl
    }

    blogService.createBlog(blogObject).then((response=>{
      const returnedBlog = response.data
      if (response.status === 201 && returnedBlog.id !== null) {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setConfirmMessage(`the blog has been added successfully ${returnedBlog.title}`)
        setTimeout(() => {
          setConfirmMessage(null);
        }, 5000)
      }else if(response.status === 400){
        setErrorMessage(response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      
    }))

    
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
          <h1>Blogs</h1>
          <p>
            {user.name} logged in <Button type='submit'>logout</Button>
          </p>
          <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
            title={newTitle}
            handleTitleChange={handleTitleChange}
            author={newAuthor}
            handleAuthorChange={handleAuthorChange}
            url={newUrl}
            handleUrlChange={handleUrlChange}
          />
          </Togglable>
          <h2>blogs created</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
