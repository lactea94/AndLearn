import { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import * as S from './Style';
import { MyButton } from "styles/Button";

export function Update() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <S.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <S.TextArea rows={10} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <MyButton color="gray" onClick={handleClose}>
            취소
          </MyButton>
          <MyButton onClick={handleClose}>
            완료
          </MyButton>
        </Modal.Footer>
      </Modal>
    </Col>
  )
};
