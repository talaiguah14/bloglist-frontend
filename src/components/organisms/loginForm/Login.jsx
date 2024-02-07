import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const LoginForm = ({
  handleLogin,
  handleLUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to aplication</h2>
      <Label form='Username'>
        Username:
        <Input
          id={'Username'}
          type={'texto'}
          name={'Username'}
          value={username}
          onChange={handleLUsernameChange}
        />
      </Label>
      <Label form='Password'>
        Password:
        <Input
          id={'Password'}
          type={'Password'}
          name={'Password'}
          value={password}
          onChange={handlePasswordChange}
        />
      </Label>
      <Button type='submit'>login</Button>
    </form>
  );
};

export default LoginForm;
