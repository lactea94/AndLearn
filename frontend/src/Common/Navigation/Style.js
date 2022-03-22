import { Nav, Navbar } from "react-bootstrap"
import styled from "styled-components"

export const MyNavbar = styled(Navbar)`
  background-color: #88B04B;
`

export const NavItem = styled(Nav.Link)`
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  font-family: Maru Buri;
  padding: 1rem;
`

export const Offcanvas = styled(Navbar.Offcanvas)`
  background-color: #88B04B;
  border: none;
`