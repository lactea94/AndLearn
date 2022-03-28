import React, { useState } from 'react'
import { Container, Form, Col, Row } from 'react-bootstrap'
import { MyButton } from 'styles/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const baseURL = 'https://j6c201.p.ssafy.io'
  const nav = useNavigate()

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      id: email,
      password: password,
    }
    console.log('onsubmit')

    axios
      .post(baseURL + '/api/v1/auth/login', data)
      .then((response) => {
        console.log(response)
        if (response.data.accessToken) {
          localStorage.setItem('login-token', response.data.accessToken)
        }
        nav('/')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container className="login">
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Col sm>
            <Form.Control
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailHandler}
              className="loginr__input"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm>
            <Form.Control
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
              className="login__input"
            />
          </Col>
        </Form.Group>
        <div className="d-grid gap-1">
          <MyButton
            variant="secondary"
            type="submit"
            onClick={onSubmit}
            className="login__button"
          >
            로그인
          </MyButton>
        </div>
      </Form>
    </Container>
  )
}
