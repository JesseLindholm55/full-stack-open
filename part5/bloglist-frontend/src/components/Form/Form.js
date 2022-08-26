import { useState } from "react";
import blogService from "../../services/blogs";

const Form = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const changeTitle = (event) => {
    setNewTitle(event.target.value);
  };
  const changeAuthor = (event) => {
    setNewAuthor(event.target.value);
  };
  const changeUrl = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    if (newTitle === "" || newAuthor === "" || newUrl === "")
      props.updateMessage({ content: "Fill all fields.", error: true });
    else {
      let body = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };
      blogService.create(body).then(
        props.updateMessage({
          content: "Created blog " + body.title + " by " + body.author,
        }),
        blogService.getAll(localStorage.getItem("token")).then((newBlogs) => {
          props.updateBlogs(newBlogs);
          props.closeTogglable();
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <label>
          Title:
          <input
            style={{ marginLeft: "16px" }}
            type="text"
            value={newTitle}
            onChange={changeTitle}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            style={{ marginBottom: "5px", marginTop: "5px" }}
            type="text"
            value={newAuthor}
            onChange={changeAuthor}
          />
        </label>
        <br />
        <label>
          Url:
          <input
            style={{ marginLeft: "23px" }}
            type="text"
            value={newUrl}
            onChange={changeUrl}
          />
        </label>
        <br />
        <input style={{ marginTop: "5px" }} type="submit" value="Save" />
      </form>
    </div>
  );
};
export default Form;
