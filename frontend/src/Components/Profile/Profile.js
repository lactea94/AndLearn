import React, { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProfileContents } from './ProfileContents/ProfileContents';
import { ProfileContentDetail } from './ProfileContents/ProfileContentDetail';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileArticles } from './ProfileArticles';
import axios from 'axios';

export function Profile() {
  const { userId } = useParams();
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'JWT'
  }, [])

  return (
    <div>
      <Container className='mt-3'>
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={2}>
            <Image src="http://placeimg.com/240/240/animals" alt="profile_image" roundedCircle fluid></Image>
          </Col>
          <Col xs={6}>
            <div className='d-flex flex-column align-items-start ps-5'>
              <div className='mt-1 mb-3'>
                <h1 className='m-0'>{userId}</h1>
              </div>
              <div>
                <h4>이메일 : </h4>
              </div>           
            </div>
          </Col>
          <Col xs={2}>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Link to={`content`}>공부내용</Link>
          </Col>
          <Col>
            <Link to={`stats`}>개인통계</Link>
          </Col>
          <Col>
            <Link to={`articles`}>게시글</Link>
          </Col>
        </Row>
        <div className="mt-5">
          <Routes>
            <Route path='/content' element={<ProfileContents/>} />
            <Route path='/content/:contentId' element={<ProfileContentDetail/>} />
            <Route path='/stats' element={<ProfileStats/>} />
            <Route path='/articles' element={<ProfileArticles />} />
          </Routes>
        </div>
      </Container>
    </div>
  )
};
