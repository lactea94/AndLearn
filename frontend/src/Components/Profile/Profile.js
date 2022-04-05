import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ProfileContents } from './ProfileContents/ProfileContents';
import { ProfileContentDetail } from './ProfileContents/ProfileContentDetail';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileArticles } from './ProfileArticles/ProfileArticles';
import { UserInfoEdit } from './ProfileEdit/UserInfoEdit';
import { PasswordEdit } from './ProfileEdit/PasswordEdit';
import { ACCESS_TOKEN } from 'constants';
import { apiInstance } from 'api';
import * as S from './Style';

export function Profile() {
  const [profileImgUrl, setProfileImgUrl] = useState("http://placeimg.com/240/240/animals");
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState();
  const [userImgUrl, setUserImgUrl] = useState();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const api = apiInstance();

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
  }, [api, token])

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
            <Row className='justify-content-center align-items-center'>
              <S.UserId xs={8} md={10}>
                {userId}
              </S.UserId>
              <Col xs={2}>
                <S.EditButton to={`edit`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </S.EditButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '2rem' }}>
          <Col>
            <NavLink to="content" style={S.navLinkStyle}>
              공부내용
            </NavLink>
          </Col>
          <Col>
            <NavLink to="stats" style={S.navLinkStyle}>
              개인통계
            </NavLink>
          </Col>
          <Col>
            <NavLink to="articles" state={{ user:user }} style={S.navLinkStyle}>
                게시 글
            </NavLink>
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
