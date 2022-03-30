import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Modal } from "react-bootstrap";
import * as S from './Style';
import { MyButton } from "styles/Button";
import { apiInstance } from "api";
import { API_BASE_URL } from "constants";

export function Update(props) {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  const handleClick = () => {
    apiInstance()
    .put(API_BASE_URL + `/community/${articleId}`,
      {
        title: title,
        content: content,
    })
      .then(setShow(false))
      .then(navigate(0))
  }

  return (
    <Col>
      <MyButton size="sm" onClick={handleShow}>
        수정
      </MyButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <S.Control
              type="text"
              defaultValue={title}
              onChange={e => {
                setTitle(e.target.value)
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <S.TextArea
              defaultValue={content}
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
          <MyButton onClick={handleClick}>
            완료
          </MyButton>
        </Modal.Footer>
      </Modal>
    </Col>
  )
};
