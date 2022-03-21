import { useLocation, useParams } from "react-router-dom"
import { Comments } from "./Comments/Comments";
import { Body, Article, Header, SubHeader, Title, Created, User, CommentCount } from "./Style";

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  return (
    <Article>
      <Header>
        <Title xs={10}>{articleId} : {state.title}</Title>
        <Created>작성 시간</Created>
      </Header>
      <SubHeader>
        <User>유저 아이디: {state.userId}</User>
        <CommentCount>댓글 수</CommentCount>
      </SubHeader>
      <Body>{state.body}</Body>
      <Comments></Comments>
    </Article>
  )
}
