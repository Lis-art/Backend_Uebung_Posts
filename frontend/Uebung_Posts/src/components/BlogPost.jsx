import "./BlogPost.css";
import { NavLink } from "react-router-dom";

const BlogPostItem = ({
  id,
  title,
  author,
  imageUrl,
  description,
  onDelete,
}) => {
  return (
    <article>
      <div>
        <img src={imageUrl} alt={title} />
      </div>
      <div>
        <h2>{title}</h2>
        <h4>{author}</h4>
        <p>{description}</p>
        <NavLink to={`/editPage/${id}`}>EDIT</NavLink>
        <button onClick={() => onDelete(id)}>DELETE</button>
      </div>
    </article>
  );
};

export default BlogPostItem;
