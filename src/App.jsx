import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from '../src/components/Login'
import Notification from './components/atoms/notification/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Button from './components/atoms/button/Button'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
    <Notification message={confirmMessage} className={"confirm"} />
    <Notification message={errorMessage} className={"error"} />
    {!user && <Login
      handleLogin = {handleLogin}
      handleLUsernameChange = {handleLUsernameChange}
      handlePasswordChange = {handlePasswordChange}
      username = {username}
      password = {password}
    />}
      {user && (
        <div>
          <p>{user.name} logged in <Button type="submit">logout</Button></p> 
          <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </div>
      )}
    
      
    </div>
  )
}

export default App