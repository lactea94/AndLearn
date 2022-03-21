import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProfileContent } from './ProfileContent';
import { ProfileContentDetail } from './ProfileContentDetail';
import { ProfileStats } from './ProfileStats';

export function Profile() {
  const { userId } = useParams();

  return (
    <div>
      <Container>
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
          <Col>
            공부내용
          </Col>
          <Col>
            개인통계
          </Col>
          <Col>
            게시글
          </Col>
        </Row>
        <hr />
        <Routes>
          <Route path='/content' element={<ProfileContent/>}/>
          <Route path='/content/:contentId' element={<ProfileContentDetail/>}/>
          <Route path='/stats' element={<ProfileStats/>}/>
        </Routes>
      </Container>
    </div>
  )
};
