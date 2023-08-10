import NavBar from "../components/Nav";
import EditPost from "../components/EditPost";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const [refresh, setRefresh] = useState(true);
  const [post, setPost] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getPostItems = async () => {
      const response = await axios.get(`/api/post/${params.id}`);
      setPost(response.data);
    };
    getPostItems();
  }, [refresh]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <EditPost />
      </div>
    </>
  );
};

export default EditPage;
