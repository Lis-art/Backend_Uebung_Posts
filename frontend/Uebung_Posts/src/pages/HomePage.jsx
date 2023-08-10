import { NavLink } from "react-router-dom";
import NavBar from "../components/Nav";

const HomePage = () => {
  return (
    <>
      <div>
        <NavBar />
        <h1>HomePage</h1>
        <NavLink to="/blogPage">
          <h3>to BlogPage</h3>
        </NavLink>
      </div>
    </>
  );
};

export default HomePage;
