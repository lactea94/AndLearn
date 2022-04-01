import { Create } from "./Create/Create";
import { DateFormat } from "Util/DateFormat";
import * as S from "./Style";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { API_BASE_URL } from "constants";
import { useParams } from "react-router-dom";
import { Delete } from "./Delete/Delete";


export function Comments({ usernickname }) {
  const { articleId } = useParams();
  const [comments, setcCmments] = useState([]);

  useEffect(() => {
    apiInstance().get(API_BASE_URL + `/community/${articleId}/comment`)
    .then((response) => setcCmments(response.data))
  }, [articleId]);

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
                <Delete commentId={comment.id}/>
              </S.MyCommentContent>
            </S.MyComment>
          )
        } else {
          return (
            <S.Comment key={comment.id} >
              <S.ImgBox>
                <S.UserImg alt={comment.userId} src="/images/default_user.jpg" />
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
      <Create />
    </S.Comments>
  )
};