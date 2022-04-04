import { DateFormat } from "Util/DateFormat";
import * as S from "./Style";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { useNavigate, useParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import { MyButton } from "styles/Button";


export function Comments({ usernickname }) {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance().get(`/community/${articleId}/comment`)
    .then((response) => setComments(response.data))
  }, [articleId]);

  const validation = () => {
    if (content) return true
    else return false
  }
  const handleSubmit = () => {
    if (validation()) {
        apiInstance()
        .post(`/community/${articleId}/comment`,
          {
            content: content,
        }).then(setTimeout(() => {
          navigate(0)
        }, 1000))
    }
  }

  const handleClick = (e) => {
    apiInstance().delete(`/community/${articleId}/comment/${e.target.value}`)
    .then(setTimeout(() => {
      navigate(0)
    }, 500))
  }

  return (
    <S.Comments>
      <S.Header>댓글 {comments.length}개</S.Header>
      {comments.map((comment) => {
        if (usernickname === comment.nickname) {
          return (
            <S.MyComment key={comment.id} >
              <S.MyCommentContent>
                <S.Body>{comment.content}</S.Body>
                <S.Created>{DateFormat(comment.createdDate)}</S.Created>
                <S.DeleteButton onClick={handleClick} value={comment.id}>삭제</S.DeleteButton>
              </S.MyCommentContent>
            </S.MyComment>
          )
        } else {
          return (
            <S.Comment key={comment.id} >
              <S.ImgBox>
                { comment.imgUrl ?
                  <S.UserImg src={`${comment.imgUrl}`} alt={comment.imgUrl}/> :
                  <S.UserImg src="/images/default_user.jpg" alt={comment.imgUrl}/>}
              </S.ImgBox>
              <S.CommentContent>
                <S.User>{comment.nickname}</S.User>
                <S.Body>{comment.content}</S.Body>
                <S.Created>{DateFormat(comment.createdDate)}</S.Created>
              </S.CommentContent>
            </S.Comment>
          )
        }
      })}
      <S.CreateForm>
        <Col xs={12} md={10}>
          <S.TextArea
            rows="3"
            placeholder="댓글"
            onChange={e => {
                setContent(e.target.value)
              }}
          />
        </Col>
        <Col>
          <MyButton size="sm" onClick={handleSubmit}>작성</MyButton>
        </Col>
      </S.CreateForm>
    </S.Comments>
  )
};