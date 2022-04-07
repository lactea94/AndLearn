import { Navbar } from "react-bootstrap"
import styled from "styled-components"

export const navLinkStyle = ({ isActive }) => (
  {
    textDecoration: "none",
    color: isActive ? "#FEFF74" : "black",
    fontSize: "1.5rem",
    fontFamily: "Maru Buri",
    padding: "1rem",
  }
)

export const MyNavbar = styled(Navbar)`
  position: sticky;
  z-index: 9;
  top: 0;
  background-color: #58C063;
`

export const Toggle = styled.img`
  width: 3rem;

  &:hover {
    cursor: pointer;
  }
`

export const LogoImg = styled.img`
  width: 3rem;
`

export const Logout = styled.button`
  border: none;
  background-color: inherit;
  font-size: 1.5rem;
  font-family: Maru Buri;
  text-align: start;
  padding: 1rem;
`

export const Offcanvas = styled(Navbar.Offcanvas)`
  background-color: #58C063;
  border: none;
  width: 20rem;
`