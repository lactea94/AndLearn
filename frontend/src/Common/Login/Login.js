import React, { useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container class='login'>
      <Form>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextPassword'>
          <Col sm>
            <Form.Control
              name='email'
              type='email'
              placeholder='이메일'
              value={email}
              onChange={onEmailHandler}
              class='loginr__input'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm>
            <Form.Control
              name='password'
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={onPasswordHandler}
              class='login__input'
            />
          </Col>
        </Form.Group>
        <div className='d-grid gap-1'>
          <Button
            variant='secondary'
            type='submit'
            onSubmit={onSubmit}
            class='login__button'
          >
            로그인
          </Button>
        </div>
      </Form>
    </Container>
  );
}
