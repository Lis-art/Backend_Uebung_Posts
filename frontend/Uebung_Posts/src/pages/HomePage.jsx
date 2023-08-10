import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <h1>HomePage</h1>
        <NavLink to="/blogPage">
          <h3>to BlogPage</h3>
        </NavLink>
      </div>
    </>
  );
};

export default HomePage;
