import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { ProfileContents } from './ProfileContents/ProfileContents';
import { ProfileContentDetail } from './ProfileContents/ProfileContentDetail';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileArticles } from './ProfileArticles/ProfileArticles';
import axios from 'axios';
import { UserInfoEdit } from './ProfileEdit/UserInfoEdit';
import { PasswordEdit } from './ProfileEdit/PasswordEdit';
import * as C from './CommonStyle';
import { Detail } from './ProfileArticles/Articles/Detail/Detail';
import { MyButton } from 'styles/Button';

export function Profile() {
  const { userId } = useParams();
  const [profileImgUrl, setProfileImgUrl] = useState();

  const randomProfileImgUrl = "http://placeimg.com/240/240/animals";
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'JWT'
  }, [])

  useEffect(() => {
    const myProfileImgUrl = "http://placeimg.com/240/240/people"
    setProfileImgUrl(myProfileImgUrl);
  }, [])

  return (
    <div>
      <Container className='mt-3'>
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={2}>
            <Image src={`${profileImgUrl ? profileImgUrl : randomProfileImgUrl}`} alt="profile_image" roundedCircle fluid></Image>
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
          <Col xs={2} className="row align-items-end">
            <Link to={`edit`}>
              <MyButton>
                Update
              </MyButton>
            </Link>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Link to={`content`}>
              <MyButton>공부내용</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to={`stats`}>
              <MyButton>개인통계</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to={`articles`}>
              <MyButton>
                게시글
              </MyButton>
            </Link>
          </Col>
        </Row>
        <div className="mt-3">
          <Routes>
            <Route path='/content' element={<ProfileContents/>} />
            <Route path='/content/:contentId' element={<ProfileContentDetail/>} />
            <Route path='/stats' element={<ProfileStats/>} />
            <Route path='/articles' element={<ProfileArticles />} />
            <Route path='/articles/:articleId' element={<Detail />} />
            <Route path='/edit' element={<UserInfoEdit />} />
            <Route path='/edit/password' element={<PasswordEdit />} />
          </Routes>
        </div>
      </Container>
    </div>
  )
};
