import { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import * as S from './Style';
import { MyButton } from "styles/Button";
import { Input } from "styles/Input";
import { apiInstance } from 'api';
import { API_BASE_URL } from 'constants';

export default function Create() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    apiInstance()
    .post(API_BASE_URL + '/community',
      {
        title: title,
        content: content,
        isNotice: false,
    })
      .then(setShow(false))
      .then(window.location.reload())
    };

  return (
    <Col xs={2}
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <MyButton onClick={handleShow}>
        새 글
      </MyButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>새 글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Input
              type="text"
              style={{width: "70%"}}
              onChange={e => {
                setTitle(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <S.TextArea
              type="textarea"
              rows={10}
              onChange={e => {
                setContent(e.target.value)
              }}
            />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <MyButton color="gray" onClick={handleClose}>
            취소
          </MyButton>
          <MyButton onClick={handleSubmit}>
            작성
          </MyButton>
        </Modal.Footer>
      </Modal>
    </Col>
  )
};
