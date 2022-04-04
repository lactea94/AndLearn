import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Alert, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { DateFormat } from 'Util/DateFormat';

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validation = () => {
    if (title && content) return true
    else return false
  }
  
  useEffect(() => {
    apiInstance().get(`/community/${articleId}`)
    .then(resposne => setArticle(resposne.data))
  }, [articleId])

  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
  }, [article])

  const handleClick = () => {
    if (state.isNotice === 1) {
      apiInstance().delete(`/community/notice/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
    } else {
      apiInstance().delete(`/community/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
    }
  }

  const handleUpdate = () => {
    if (validation()) {
      apiInstance()
      .put(`/community/${articleId}`,
        {
          title: title,
          content: content,
      })
        .then(setShow(false))
        .then(navigate(0))
    }
  }

  return (
    <S.Article>
      <S.Header>
        <S.Title xs={12} md={8}>{article.title}</S.Title>
        <S.Created>{DateFormat(article.createdAt)}</S.Created>
        <S.Updated>{DateFormat(article.updatedAt)}</S.Updated>
      </S.Header>
      <S.SubHeader>
        <S.User xs={5} md={8}>{article.nickname}</S.User>
        {(article.nickname === state.user.nickname) && 
          <>
            <Col>
              <MyButton
                color="red"
                size="sm"
                onClick={handleClick}
              >
                삭제
              </MyButton>
            </Col>
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
                    { !title && <Alert variant="warning">제목을 입력하세요</Alert>}
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
                    { !content && <Alert variant="warning">내용을 입력하세요</Alert>}
                  </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                  <MyButton color="gray" onClick={handleClose}>
                    취소
                  </MyButton>
                  <MyButton onClick={handleUpdate}>
                    완료
                  </MyButton>
                </Modal.Footer>
              </Modal>
            </Col>
          </>}
      </S.SubHeader>
      <S.Body>
        {article.content}
      </S.Body>
      <Comments usernickname={state.user.nickname}/>
    </S.Article>
  )
};
