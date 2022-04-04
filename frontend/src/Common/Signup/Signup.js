import React, { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { MyButton } from 'styles/Button';
import { Link, useNavigate } from 'react-router-dom';
import { userInstance } from '../../api/index';
import * as S from './Style';
import { Input } from 'styles/Input';

export function Signup() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const api = userInstance()

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dEmail, setDEmail] = useState('');
  const [dName, setDName] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);

  const navigate = useNavigate();

  function onChangePassword(e) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError(true)

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setPassword(e.target.value)
  };
  function onChangeConfirmPassword(e) {
    if (password === e.target.value) setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setConfirmPassword(e.target.value)
  };
  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  };
  function onChangeEmail(e) {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false)
    else setEmailError(true)
    setEmail(e.target.value)
  };

  function validation(e) {
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);
    if (!checkEmail) setDEmail('중복검사를 눌러주세요.');
    if (!checkName) setDName('중복검사를 눌러주세요.');
    if (
      password &&
      confirmPassword &&
      userName &&
      email &&
      checkEmail &&
      checkName &&
      password === confirmPassword &&
      !passwordError &&
      !emailError
    )
      return true
    else return false
  };

  function onCheckEmail() {
    if (!emailError) {
      api
        .post('/users/duplicate-check-id', { id: email })
        .then((res) => {
          setCheckEmail(true)
          setDEmail('확인 완료')
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setDEmail('이미 존재하는 아이디입니다.')
          }
        })
    }
  };

  function onCheckName() {
    api
      .post('/users/duplicate-check-nickname', {
        nickname: userName,
      })
      .then((res) => {
        setCheckName(true)
        setDName('확인 완료')
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setDName('이미 존재하는 이름입니다.')
        }
      })
  };

  function onSubmit(e) {
    if (!validation(e)) return

    api
      .post('/users', { id: email, nickname: userName, password: password })
      .then((res) => {
        console.log(res.data)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <S.Contents>
      <Row className="justify-content-center align-items-center">
        <Col xs={11} style={{margin: "1rem 0"}}>
          <Input
            maxLength={50}
            style={{width: "100%", margin: "auto"}}
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
            disabled={checkEmail}
          />
        </Col>
        <Col style={{padding: 0}}>
          {checkEmail ? 
            <S.CheckFillButton /> :
            <S.CheckButton onClick={onCheckEmail}/>}
        </Col>
        {(dEmail !== "확인 완료") && <div>{dEmail}</div>}
        {emailError && (
          <Alert variant="warning">
            유효한 이메일 주소를 입력해주세요
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={11} style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            placeholder="닉네임"
            value={userName}
            onChange={onChangeUserName}
            disabled={checkName}
          />
        </Col>
        <Col style={{padding: 0}}>
          {checkName ?
            <S.CheckFillButton /> :
            <S.CheckButton onClick={onCheckName}/>}
        </Col>
        {(dName !== "확인 완료") && <div>{dName}</div>}
        {userNameError && (
          <Alert variant="warning">
            닉네임을 입력해주세요.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
        </Col>
        {passwordError && (
          <Alert variant="warning">
            최소 8자리, 영문, 숫자를 포함해주세요.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        </Col>
        {confirmPasswordError && (
          <Alert variant="warning">
            비밀번호가 일치하지 않습니다.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <MyButton
          onClick={onSubmit}
          style={{width: "50%", marginBottom: "1rem"}}
        >
          회원 가입
        </MyButton>
      </Row>
      <Row className="justify-content-center">
        이미 계정이 있습니까?
      </Row>
      <Row className="justify-content-center">
        <Link to="/login">
          로그인
        </Link>
      </Row>
    </S.Contents>
  )
};
