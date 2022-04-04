import { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import * as S from './Style'
import { ACCESS_TOKEN } from 'constants/index'
import { apiInstance } from 'api'

export function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [myInfo, setMyInfo] = useState({})
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const token = localStorage.getItem(ACCESS_TOKEN)
  const api = apiInstance()

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      api.get('users/me').then((res) => {
        setMyInfo(res.data)
      })
    } else {
      setIsAuthenticated(false)

    }
  }, [])

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    navigate('/')
    navigate(0)
  }

  return (
    <S.MyNavbar collapseOnSelect expand={false}>
      <Container fluid>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Collapse>
          <S.Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <NavLink to="/" onClick={handleClose}>
                  <S.LogoImg src="/images/favicon.png" />
                </NavLink>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink to="/" onClick={handleClose} style={S.navLinkStyle}>
                  Home
                </NavLink>
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="profile"
                      onClick={handleClose}
                      style={S.navLinkStyle}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="learn"
                      onClick={handleClose}
                      style={S.navLinkStyle}
                    >
                      Learn
                    </NavLink>
                    <NavLink
                      to="community"
                      onClick={handleClose}
                      style={S.navLinkStyle}
                    >
                      Community
                    </NavLink>
                    <S.Logout onClick={logout}>Logout</S.Logout>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="login"
                      onClick={handleClose}
                      style={S.navLinkStyle}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="signup"
                      onClick={handleClose}
                      style={S.navLinkStyle}
                    >
                      Signup
                    </NavLink>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </S.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </S.MyNavbar>
  )
};
