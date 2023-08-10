import NavBar from "../components/Nav";
import BlogPostItem from "../components/BlogPost";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogPage = () => {
  const [post, setPost] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const getPostItems = async () => {
      const response = await axios.get("/api/post");
      setPost(response.data);
    };
    getPostItems();
  }, [refresh]);

  const deletePost = async (postId) => {
    try {
      const { data } = await axios.delete(`/api/post/delete/${postId}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>BlogPage</h1>
        <section>
          {post?.map((element) => (
            <BlogPostItem
              key={element._id}
              id={element._id}
              imageUrl={element.image.url}
              title={element.title}
              author={element.room}
              description={element.description}
              onDelete={() => deletePost(element._id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
