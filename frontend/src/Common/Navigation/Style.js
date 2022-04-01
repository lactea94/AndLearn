import { Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

export const MyNavbar = styled(Navbar)`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: #58C063;
`

export const NavItem = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  font-family: Maru Buri;
  padding: 1rem;

  &:hover {
    color: #FEFF74;
  }

  &:focus {
    color: #FEFF74;
  }
`

export const Offcanvas = styled(Navbar.Offcanvas)`
  background-color: #58C063;
  border: none;
  width: 20rem;
`