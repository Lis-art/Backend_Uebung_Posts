import axios from "axios";
import { useState } from "react";

const EditPost = ({ id, title, author, imageUrl, description, setRefresh }) => {
  const [titleInput, setTitleInput] = useState(true);
  const [authorInput, setAuthorInput] = useState(true);
  const [imageInput, setImageInput] = useState(true);
  const [descriptionInput, setDescriptionInput] = useState(true);

  const updatePosts = async (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();

    console.log(formData);
    const response = await axios.put(`/api/updatePost/${id}`, formData);
    console.log(response);

    setTitleInput(true);
    setAuthorInput(true);
    setImageInput(true);
    setDescriptionInput(true);
    setRefresh((prev) => !prev);

    e.target.reset();
  };

  return (
    <>
      {id ? (
        <div>
          <form onSubmit={updatePosts}>
            <div>
              <label htmlFor="image">
                {" "}
                <img src={imageUrl} alt={title} />{" "}
              </label>
              <input
                type="file"
                name="image"
                placeholder={imageUrl}
                id="image"
              />
              <button
                onClick={() => {
                  setImageInput((prev) => !prev);
                }}
              >
                EDIT
              </button>
            </div>
            <div>
              <label htmlFor="title">
                {" "}
                <h2>{title}</h2>{" "}
              </label>
              <input type="text" name="title" placeholder={title} id="title" />
              <button
                onClick={() => {
                  setTitleInput((prev) => !prev);
                }}
              >
                EDIT
              </button>
            </div>
            <div>
              <label htmlFor="author">
                {" "}
                <h4>{author}</h4>{" "}
              </label>
              <input
                type="text"
                name="author"
                placeholder={author}
                id="author"
              />
              <button
                onClick={() => {
                  setAuthorInput((prev) => !prev);
                }}
              >
                EDIT
              </button>
            </div>
            <div>
              <label htmlFor="description">
                {" "}
                <p>{description}</p>{" "}
              </label>
              <input
                type="text"
                name="description"
                placeholder={description}
                id="description"
              />
              <button
                onClick={() => {
                  setDescriptionInput((prev) => !prev);
                }}
                //Classnames important??
              >
                EDIT
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default EditPost;
