import { useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import * as S from './Style';
import { MyButton } from "styles/Button";
import { Input } from "styles/Input";
import { apiInstance } from 'api';
import { Switch } from "styles/Switch";

export default function Create({ me }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onSwitchAction = () => setIsSwitchOn(!isSwitchOn);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validation = () => {
    if (title && content) return true
    else return false
  }
  const handleSubmit = () => {
    if (validation()) {
      return (
        apiInstance()
        .post('/community',
          {
            title: title,
            content: content,
            isNotice: isSwitchOn,
        })
          .then(setShow(false))
          .then(window.location.reload())
      )
    }
  }

  function CreateComponent() {
    return (
      <Modal.Body>
        { me.admin && 
          <Switch
            type="switch"
            label="공지"
            checked={isSwitchOn}
            onChange={onSwitchAction}
            isValid
          />
        }
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Input
            type="text"
            style={{width: "70%"}}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
        </Form.Group>
        { !title && <Alert variant="warning">제목을 입력하세요</Alert>}
        <Form.Group>
          <Form.Label>내용</Form.Label>
          <S.TextArea
            type="textarea"
            rows={10}
            onChange={e => {
              setContent(e.target.value)
            }}
          />
        </Form.Group>
        { !content && <Alert variant="warning">내용을 입력하세요</Alert>}
      </Modal.Body>
    )
  }

  return (
    <S.Contents xs={12} md={2}
    >
      <MyButton onClick={handleShow}>
        새 글
      </MyButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>새 글 작성</Modal.Title>
        </Modal.Header>
        {CreateComponent()}
        <Modal.Footer>
          <MyButton color="gray" onClick={handleClose}>
            취소
          </MyButton>
          <MyButton onClick={handleSubmit}>
            작성
          </MyButton>
        </Modal.Footer>
      </Modal>
    </S.Contents>
  )
};
