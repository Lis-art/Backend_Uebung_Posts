import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blogPage">BlogPage</NavLink>
    </>
  );
};

export default NavBar;
