import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { MyButton } from 'styles/Button';
import { userInstance } from 'api/index';
import * as S from './Style';
import { Input } from 'styles/Input';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const api = userInstance();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  };

  const onSubmit = () => {
    const data = {
      id: email,
      password: password,
    };
    api
      .post('/auth/login', data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('accesstoken', response.data.accessToken)
        }
        navigate('/');
        navigate(0);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('비밀번호를 다시 입력해주세요.')
        }
      })
  };

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }

  return (
    <S.Contents>
      <Form onKeyPress={handleKeyPress}>
        <Row className="justify-content-center">
          <Col style={{marginBottom: "1rem"}}>
            <Input
              type="email"
              style={{width: "100%", margin: "auto"}}
              placeholder="이메일"
              value={email}
              onChange={onEmailHandler}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col style={{marginBottom: "1rem"}}>
            <Input
              type="password"
              style={{width: "100%", margin: "auto"}}
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <MyButton
            style={{width: "50%", marginBottom: "1rem"}}
            onClick={onSubmit}
          >
            로그인
          </MyButton>
        </Row>

      </Form>
    </S.Contents>
  )
};
