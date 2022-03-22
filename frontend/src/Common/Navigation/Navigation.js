import { useState } from "react"
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import * as S from "./Style"

export function Navigation() {
  // 임시로 사용하는 프로필 접근 닉네임? 아이디?
  const userId = 'kimcookie'
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <S.MyNavbar expand={false}>
    <Container fluid>
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <S.Offcanvas
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><S.NavItem as={NavLink} to="/">Home</S.NavItem></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            { isAuthenticated ? 
              <>
                <S.NavItem as={NavLink} to="/">Home</S.NavItem>
                <S.NavItem as={NavLink} to={`profile/${userId}/content`}>Profile</S.NavItem>
                <S.NavItem as={NavLink} to="learn">Learn</S.NavItem>
                <S.NavItem as={NavLink} to="community">Community</S.NavItem>
              </>
            :
              <>
                <S.NavItem as={NavLink} to="/">Home</S.NavItem>
                <S.NavItem as={NavLink} to="login">LogIn</S.NavItem>
                <S.NavItem as={NavLink} to="signup">SignUp</S.NavItem>
              </>
            }
          </Nav>
        </Offcanvas.Body>
      </S.Offcanvas>
    </Container>
  </S.MyNavbar>
  )
};