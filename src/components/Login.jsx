import Button from "./atoms/button/Button"
import Input from "./atoms/input/Input"

const LoginForm = ({
  handleLogin,
  handleLUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
    <h2>log in to aplication</h2>
    <label form="Username">Username:</label>
      <Input
        id= {'Username'}
        type = {'texto'}
        name={'Username'} 
        value={username} 
        onChange={handleLUsernameChange}
      />
      <label form="Password">Password:</label>
      <Input
        id= {'Password'}
        type = {'Password'}
        name={'Password'} 
        value={password} 
        onChange={handlePasswordChange}
      />
      <Button type="submit">login</Button>
    </form>
  )
    
}

export default LoginForm
