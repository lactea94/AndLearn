import { useState } from "react"
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap"
import * as S from "./Style"

export function Navigation() {
  // 임시로 사용하는 프로필 접근 닉네임? 아이디?
  const userId = 'kimcookie'
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <S.MyNavbar expand={false}>
    <Container fluid>
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <S.Offcanvas
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <S.NavItem to="/">Home</S.NavItem>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            { isAuthenticated ?
              <>
                <S.NavItem to="/">Home</S.NavItem>
                <S.NavItem to={`profile/${userId}/content`}>Profile</S.NavItem>
                <S.NavItem to="learn">Learn</S.NavItem>
                <S.NavItem to="community">Community</S.NavItem>
              </>
            :
              <>
                <S.NavItem to="/">Home</S.NavItem>
                <S.NavItem to="login">Login</S.NavItem>
                <S.NavItem to="signup">Signup</S.NavItem>
              </>
            }
          </Nav>
        </Offcanvas.Body>
      </S.Offcanvas>
    </Container>
  </S.MyNavbar>
  )
};