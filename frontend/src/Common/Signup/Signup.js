import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  //   const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  //   const onChangeUserId = (e) => {
  //     const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
  //     if (!e.target.value || userIdRegex.test(e.target.value))
  //       setUserIdError(false);
  //     else setUserIdError(true);
  //     setUserId(e.target.value);
  //   };
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };
  const onChangeUserName = (e) => {
    setUserNameError(false);
    setUserName(e.target.value);
  };
  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const validation = () => {
    // if (!userId) setUserIdError(true);
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

    if (userId && password && confirmPassword && userName && email) return true;
    else return false;
  };

  const onSubmit = (e) => {
    if (validation()) return;
    const url = "";
    axios
      .post(url, {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container className='panel'>
        <Form>
          <Form.Group as={Row} className='mb-3'>
            <Col sm>
              <Form.Control
                maxLength={50}
                type='input'
                placeholder='Email Address'
                value={email}
                onChange={onChangeEmail}
              />
              {emailError && (
                <div class='invalid-input'>
                  유효한 이메일 주소를 입력해주세요
                </div>
              )}
            </Col>
          </Form.Group>
          {/* <Form.Group as={Row} className='mb-3'>
            <Col sm>
              <Form.Control
                maxLength={20}
                placeholder='UserID'
                value={userId}
                onChange={onChangeUserId}
              />
              {userIdError && (
                <div class='invalid-input'>
                  User ID must be at least 5 letter and contain letters or
                                  numbers.
                                  유저 아이디는 
                </div>
              )}
            </Col>
          </Form.Group> */}
          <Form.Group as={Row} className='mb-3'>
            <Col sm>
              <Form.Control
                maxLength={20}
                type='password'
                placeholder='Password'
                value={password}
                onChange={onChangePassword}
              />
              {passwordError && (
                <div class='invalid-input'>
                  최소 8자리, 영문과 숫자 모두 포함해주세요.{" "}
                </div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm>
              <Form.Control
                maxLength={20}
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              {confirmPasswordError && (
                <div class='invalid-input'>비밀번호가 일치하지 않습니다.</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm>
              <Form.Control
                maxLength={20}
                placeholder='Username'
                value={userName}
                onChange={onChangeUserName}
              />
              {userNameError && (
                <div class='invalid-input'>이름을 입력해주세요.</div>
              )}
            </Col>
          </Form.Group>

          <br />
          <div className='d-grid gap-1'>
            <Button variant='secondary' onClick={onSubmit}>
              회원 가입
            </Button>
          </div>
        </Form>
        <br />
        {/* <span className='text'>
          Have an account?{" "}
          <Link to='/login' className='link'>
            Sign In
          </Link>
        </span> */}
      </Container>
    </div>
  );
}
