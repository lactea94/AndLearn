import { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import * as S from './Style'

export function Update() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col>
      <S.ModalButton size="sm" onClick={handleShow}>
        수정
      </S.ModalButton>

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
          <S.ModalButton color="gray" onClick={handleClose}>
            취소
          </S.ModalButton>
          <S.ModalButton onClick={handleClose}>
            완료
          </S.ModalButton>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
