import { useState } from "react"
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";

const BlogForm = ({createBlog}) => {

  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

   const addBlog = (event) =>{
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newTitle,
      url: newUrl
    })
    setTitle('')
    setAuthor('')
    setUrl('')
   }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new Blog</h2>
      <Label form="Title">
        Title:
        <Input
          id={"Title"}
          type={"texto"}
          name={"Title"}
          value={newTitle}
          onChange={handleTitleChange}
        />
      </Label>
      <Label form="Author">
        Author:
        <Input
          id={"Author"}
          type={"texto"}
          name={"Author"}
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </Label>
      <Label form="Url">
        Url:
        <Input
          id={"Url"}
          type={"texto"}
          name={"Url"}
          value={newUrl}
          onChange={handleUrlChange}
        />
      </Label>
      <Button type='submit'>Create Blog</Button>
    </form>
  );
};

export default BlogForm;
