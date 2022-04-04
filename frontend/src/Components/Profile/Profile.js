import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProfileContents } from './ProfileContents/ProfileContents';
import { ProfileContentDetail } from './ProfileContents/ProfileContentDetail';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileArticles } from './ProfileArticles/ProfileArticles';
import { UserInfoEdit } from './ProfileEdit/UserInfoEdit';
import { PasswordEdit } from './ProfileEdit/PasswordEdit';
import { MyButton } from 'styles/Button';
import { ACCESS_TOKEN } from 'constants';
import { apiInstance } from 'api';
import styled from 'styled-components';
import * as S from './Style';

const EditButton = styled(Link)`
  color: black;

  &:hover {
    color: #FFDD74;
  }
`

export function Profile() {
  const [profileImgUrl, setProfileImgUrl] = useState("http://placeimg.com/240/240/animals");
  const [user, setUser] = useState();
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
          setUser(res.data)
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
        <Row className='justify-content-center align-items-center' style={{ marginBottom: '3rem' }}>
          <Col xs={12} md={4} lg={3}>
            <S.UserImg
              src={`${profileImgUrl}`}
              alt="profile_image"
            />
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Row className='mt-2 mb-3'>
              <h1 className='m-0'>{userNickname}</h1>
            </Row>
            <Row className='justify-content-center'>
              <Col xs={7}>
                {userId}
              </Col>
              <Col xs={1}>
                <EditButton to={`edit`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </EditButton>
              </Col>
            </Row>
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
            <Link to="articles" state={{ user:user }}>
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
            <Route path='content' element={<ProfileContents/>} />
            <Route path='content/:contentId' element={<ProfileContentDetail/>} />
            <Route path='stats' element={<ProfileStats/>} />
            <Route path='articles' element={<ProfileArticles />} />
            <Route path='edit' element={<UserInfoEdit />} />
            <Route path='edit/password' element={<PasswordEdit />} />
          </Routes>
        </div>
      </Container>
    </div>
  )
};
