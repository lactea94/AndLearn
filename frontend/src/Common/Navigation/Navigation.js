import { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as S from './Style'
import { ACCESS_TOKEN } from 'constants/index'
import { apiInstance } from 'api'

export function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [myInfo, setMyInfo] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem(ACCESS_TOKEN)
  const api = apiInstance();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      api.get('users/me')
        .then(res => {
          setMyInfo(res.data)
        })
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(0);
  }

  return (
    <S.MyNavbar collapseOnSelect expand={false}>
      <Container fluid>
        <Navbar.Toggle onClick={handleShow}/>
        <Navbar.Collapse>
          <S.Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <S.NavItem to="/" onClick={handleClose}>
                  <S.LogoImg src="/images/favicon.png" />
                </S.NavItem>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" >
                <S.NavItem
                  to="/"
                  onClick={handleClose}
                >
                  Home
                </S.NavItem>
                {isAuthenticated ? (
                  <>
                    <S.NavItem
                      to={`profile/${myInfo.nickname}/content`}
                      onClick={handleClose}
                    >
                      Profile
                    </S.NavItem>
                    <S.NavItem
                      to="learn"
                      onClick={handleClose}
                    >
                      Learn
                    </S.NavItem>
                    <S.NavItem
                      to="community"
                      onClick={handleClose}
                    >
                      Community
                    </S.NavItem>
                    <S.NavItem to="/" onClick={logout}>
                      logout
                    </S.NavItem>
                  </>
                ) : (
                  <>
                    <S.NavItem
                      to="login"
                      onClick={handleClose}
                    >
                      Login
                    </S.NavItem>
                    <S.NavItem
                      to="signup"
                      onClick={handleClose}
                    >
                      Signup
                    </S.NavItem>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </S.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </S.MyNavbar>
  )
}
