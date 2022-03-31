import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ProfileContents } from './ProfileContents/ProfileContents';
import { ProfileContentDetail } from './ProfileContents/ProfileContentDetail';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileArticles } from './ProfileArticles/ProfileArticles';
import { UserInfoEdit } from './ProfileEdit/UserInfoEdit';
import { PasswordEdit } from './ProfileEdit/PasswordEdit';
import { Detail } from './ProfileArticles/Articles/Detail/Detail';
import { MyButton } from 'styles/Button';
import { ACCESS_TOKEN } from 'constants';
import { apiInstance } from 'api';

export function Profile() {
  const [profileImgUrl, setProfileImgUrl] = useState();
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState();
  const [userImgUrl, setUserImgUrl] = useState();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const api = apiInstance();

  const randomProfileImgUrl = "http://placeimg.com/240/240/animals";
  
  useEffect(() => {
    if (token) {
      api.get('users/me')
        .then(res => {
          console.log(res.data)
          setUserId(res.data.userId);
          setUserNickname(res.data.nickname);
          setUserImgUrl(res.data.imageUrl);
        })
    } else {
      window.location.replace(`/`)
    }
  }, [])

  useEffect(() => {
    
  }, [userId, userNickname, userImgUrl])

  useEffect(() => {
    console.log(userImgUrl)
    setProfileImgUrl(userImgUrl);
  }, [userImgUrl])

  return (
    <div>
      <Container className='mt-3'>
        <Row>
          <Col lg={2}>
          </Col>
          <Col lg={2}>
            <Image src={`${profileImgUrl ? profileImgUrl : randomProfileImgUrl}`} alt="profile_image" roundedCircle fluid></Image>
          </Col>
          <Col lg={6}>
            <div className='d-flex flex-column align-items-start ps-5'>
              <div className='mt-2 mb-3'>
                <h1 className='m-0'>닉네임 : {userNickname}</h1>
              </div>
              <div>
                <h4>이메일 : {userId}</h4>
              </div>           
            </div>
          </Col>
          <Col lg={2} className="row align-items-end">
            <Link to={`edit`}>
              <MyButton color="#58C063">
                Update
              </MyButton>
            </Link>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Link to={`content`}>
              <MyButton color="#58C063">공부내용</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to={`stats`}>
              <MyButton color="#58C063">개인통계</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to={`articles`}>
              <MyButton color="#58C063">
                게시글
              </MyButton>
            </Link>
          </Col>
        </Row>
        <div className="mt-3">
          <Routes>
            <Route path='/content' element={<ProfileContents/>}/>
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
