import { useLocation, useParams } from "react-router-dom"
import { Comments } from "./Comments/Comments";
import * as S from "./Style";

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  return (
    <S.Article>
      <S.Header>
        <S.Title xs={10}>{articleId} : {state.title}</S.Title>
        <S.Created>작성 시간</S.Created>
      </S.Header>
      <S.SubHeader>
        <S.User>유저 아이디: {state.userId}</S.User>
        <S.CommentCount>댓글 수</S.CommentCount>
      </S.SubHeader>
      <S.Body>{state.body}</S.Body>
      <Comments></Comments>
    </S.Article>
  )
}
