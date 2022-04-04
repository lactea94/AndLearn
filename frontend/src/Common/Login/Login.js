import React, { useState } from 'react'
import { Container, Form, Col, Row } from 'react-bootstrap'
import { MyButton } from 'styles/Button'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../constants/index'
import { userInstance } from '../../api/index'
import { MyForm } from 'styles/UserForm'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const api = userInstance()
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
    api
      .post('/auth/login', data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('accesstoken', response.data.accessToken)
        }
        window.location.replace(`/`)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('비밀번호를 다시 입력해주세요.')
        }
      })
  }

  return (
    <Container className="" style={{ minHeight:'60vh', marginRight: '0px', marginLeft: '0px', width: '100%' }}>
      <MyForm>
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
      </MyForm>
    </Container>
  )
}
