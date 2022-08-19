import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Nav = styled.nav({
  width: "100%",
  minWidth: "320px",
  background:
    "linear-gradient(109.6deg, rgb(20 30 48 / 97%) 11.2%, rgb(36 59 85 / 89%) 91.1%)",
  zIndex: 9,
  position: "absolute",
});
const NavLink = css({
  textAlign: "center",
  padding: "22px",
  lineHeight: "18px",
  cursor: "pointer",
  color: "white",
  textDecoration: "none",
  transition: "color 0.2s ease-out",
  "&:hover": {
    color: "grey",
  },
});
const NavMenu = styled.div({
  display: "flex",
  alignItems: "center",
  "& > a": NavLink,
});

function Navbar() {
  return (
    <Nav>
      <NavMenu>
        <Link to="/anime-browse">Browse</Link>
        <Link to="/anime-browse/collections">My Collections</Link>
      </NavMenu>
    </Nav>
  );
}

export default Navbar;
