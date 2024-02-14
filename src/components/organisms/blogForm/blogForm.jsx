import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";

const BlogForm = ({
    createBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
}) => {
  return (
    <form onSubmit={createBlog}>
      <h2>Create new Blog</h2>
      <Label form="Title">
        Title:
        <Input
          id={"Title"}
          type={"texto"}
          name={"Title"}
          value={title}
          onChange={handleTitleChange}
        />
      </Label>
      <Label form="Author">
        Author:
        <Input
          id={"Author"}
          type={"texto"}
          name={"Author"}
          value={author}
          onChange={handleAuthorChange}
        />
      </Label>
      <Label form="Url">
        Url:
        <Input
          id={"Url"}
          type={"texto"}
          name={"Url"}
          value={url}
          onChange={handleUrlChange}
        />
      </Label>
      <Button type='submit'>Create Blog</Button>
    </form>
  );
};

export default BlogForm;
