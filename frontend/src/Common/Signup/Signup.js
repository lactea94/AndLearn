import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { MyButton } from 'styles/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { onCheckingEmail, onCheckingName } from '../../api/index'
import { apiInstance } from '../../api/index'
import { API_BASE_URL } from 'constants'

export function Signup() {
  const baseURL = 'https://j6c201.p.ssafy.io'
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const api = apiInstance()

  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [dEmail, setDEmail] = useState('')
  const [dName, setDName] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkName, setCheckName] = useState(false)

  const navigate = useNavigate()
  function onChangePassword(e) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError(true)

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setPassword(e.target.value)
  }
  function onChangeConfirmPassword(e) {
    if (password === e.target.value) setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setConfirmPassword(e.target.value)
  }
  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  }
  function onChangeEmail(e) {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false)
    else setEmailError(true)
    setEmail(e.target.value)
  }

  function validation() {
    if (!password) setPasswordError(true)
    if (!confirmPassword) setConfirmPasswordError(true)
    if (!userName) setUserNameError(true)
    if (!email) setEmailError(true)
    if (!checkEmail) setDEmail('중복검사를 눌러주세요.')
    if (!checkName) setDName('중복검사를 눌러주세요.')
    if (
      password &&
      confirmPassword &&
      userName &&
      email &&
      checkEmail &&
      checkName &&
      password === confirmPassword
    )
      return true
    else return false
  }
  function onCheckEmail() {
    api
      .post(API_BASE_URL + '/api/v1/users/duplicate-check-id', { id: email })
      .then((res) => {
        setCheckEmail(true)
        setDEmail('확인 완료')
      })
      .catch((error) => setDEmail('이미 존재하는 아이디입니다.'))
  }

  function onCheckName() {
    api
      .post(API_BASE_URL + '/api/v1/users/duplicate-check-nickname', {
        nickname: userName,
      })
      .then((res) => {
        setCheckName(true)
        setDName('확인 완료')
      })
      .catch((error) => setDName('이미 존재하는 이름입니다.'))
  }

  function onSubmit(e) {
    if (!validation()) return
    const url = API_BASE_URL + '/api/v1/users'
    api
      .post(url, { id: email, nickname: userName, password: password })
      .then((res) => {
        console.log(res.data)
        navigate(`/login`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Container className="panel">
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <div className="d-flex">
                <Form.Control
                  maxLength={50}
                  type="input"
                  placeholder="Email Address"
                  value={email}
                  onChange={onChangeEmail}
                  className="flex-grow-1"
                />
                <MyButton className="flex-shrink-1" onClick={onCheckEmail}>
                  중복확인
                </MyButton>
              </div>
              <p>{dEmail}</p>
              {emailError && (
                <div className="invalid-input">
                  유효한 이메일 주소를 입력해주세요
                </div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <div className="d-flex">
                <Form.Control
                  maxLength={20}
                  placeholder="Nickname"
                  value={userName}
                  onChange={onChangeUserName}
                />
                <MyButton className="flex-shrink-1" onClick={onCheckName}>
                  중복확인
                </MyButton>
              </div>
              <p>{dName}</p>
              {userNameError && (
                <div className="invalid-input">닉네임을 입력해주세요.</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                maxLength={20}
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
              {passwordError && (
                <div className="invalid-input">
                  최소 8자리, 영문, 숫자, 특수문자 모두 포함해주세요.
                </div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                maxLength={20}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              {confirmPasswordError && (
                <div className="invalid-input">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </Col>
          </Form.Group>

          <br />
          <div className="d-grid gap-1">
            <MyButton onClick={onSubmit}>회원 가입</MyButton>
          </div>
        </Form>
        <br />
        <span className="text">
          이미 계정이 있습니까?
          <br />
          <Link to="/login" className="link">
            로그인
          </Link>
        </span>
      </Container>
    </div>
  )
}
