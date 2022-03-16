import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export function Profile() {
  const { userId } = useParams();

  return (
    <div>
      <Container>
        {userId} Profile
        <Row>
          <Col xs={2} bg-black>
            Blank
          </Col>
          <Col xs={2}>
            Image
          </Col>
          <Col xs={6}>
            Profile
          </Col>
          <Col xs={2}>
            Blank
          </Col>
        </Row>
        <hr/>
        <Row>
          bye
        </Row>
      </Container>
    </div>
  )
};
