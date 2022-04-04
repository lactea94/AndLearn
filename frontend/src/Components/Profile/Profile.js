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
import styled from 'styled-components';

const EditButton = styled(Link)`
  color: black;

  &:hover {
    color: #FFDD74;
  }
`

export function Profile() {
  const [profileImgUrl, setProfileImgUrl] = useState("http://placeimg.com/240/240/animals");
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState();
  const [userImgUrl, setUserImgUrl] = useState();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const api = apiInstance();

  useEffect(() => {
  }, [userId, userNickname, userImgUrl])

  useEffect(() => {
    if (token) {
      api.get('users/me')
        .then(res => {
          setUserId(res.data.userId);
          setUserNickname(res.data.nickname);
          setUserImgUrl(res.data.imageUrl);
        })
    } else {
      window.location.replace(`/`)
    }
  }, [])

  useEffect(() => {
    if (userImgUrl) {
      setProfileImgUrl(userImgUrl);
    }
  }, [userImgUrl])

  return (
    <div>
      <Container style={{ marginTop: '5rem' }}>
        <Row style={{ marginBottom: '3rem' }}>
          <Col lg={2}>
          </Col>
          <Col lg={2}>
            <Image src={`${profileImgUrl}`} alt="profile_image" roundedCircle fluid></Image>
          </Col>
          <Col lg={6}>
            <div className='d-flex flex-column align-items-start ps-5'>
              <div className='mt-2 mb-3'>
                <h1 className='m-0'>{userNickname}</h1>
              </div>
              <div>
                <h4>
                  {userId} {
                    <EditButton to={`edit`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      </EditButton>
                  }
                </h4>
              </div>           
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '2rem' }}>
          <Col>
            <Link to="content">
              <MyButton color="#58C063">공부내용</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to="stats">
              <MyButton color="#58C063">개인통계</MyButton>
            </Link>
          </Col>
          <Col>
            <Link to="articles">
              <MyButton color="#58C063">
                게시글
              </MyButton>
            </Link>
          </Col>
        </Row>
        <hr />
        <div style={{ marginTop: '2rem' }}>
          <Routes>
            <Route index element={<ProfileContents/>} />
            <Route path='content' element={<ProfileContents/>}>
              <Route path=':contentId' element={<ProfileContentDetail/>} />
            </Route>
            <Route path='stats' element={<ProfileStats/>} />
            <Route path='articles' element={<ProfileArticles />}>
              <Route path=':articleId' element={<Detail />} />
            </Route>
            <Route path='edit' element={<UserInfoEdit />}>
              <Route path='password' element={<PasswordEdit />} />
            </Route>
          </Routes>
        </div>
      </Container>
    </div>
  )
};
