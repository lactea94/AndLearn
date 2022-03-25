import React, { useState } from 'react'
import { Container, Form, Col, Row } from 'react-bootstrap'
import { MyButton } from 'styles/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    axios
      .post('/api/api/v1/auth/login', { email, password })
      .then((response) => response.json())

      .then((response) => {
        if (response.ACCESS_TOKEN) {
          localStorage.setItem('login-token', response.ACCESS_TOKEN)
        }
        nav('/')

      })
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
            onSubmit={onSubmit}
            className="login__button"
          >
            로그인
          </MyButton>
        </div>
      </Form>
    </Container>
  )
}
