import { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import * as S from './Style';
import * as T from '../../Style';

export default function Create() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col>
      <T.MyButton onClick={handleShow}>
        새 글
      </T.MyButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>새 글 작성</Modal.Title>
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
          <T.MyButton color="gray" onClick={handleClose}>
            취소
          </T.MyButton>
          <T.MyButton onClick={handleClose}>
            작성
          </T.MyButton>
        </Modal.Footer>
      </Modal>
    </Col>
  )
};
