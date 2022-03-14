import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Navigation() {
  // 임시로 사용하는 프로필 접근 닉네임? 아이디?
  const userId = 'kimcookie'

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to={`profile/${userId}/content`}>Profile</Nav.Link>
            <Nav.Link as={NavLink} to="learn">Learn</Nav.Link>
            <Nav.Link as={NavLink} to="community">Community</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};