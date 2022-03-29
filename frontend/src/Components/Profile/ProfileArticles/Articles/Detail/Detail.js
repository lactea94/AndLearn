import { useLocation, useParams } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Col } from "react-bootstrap";

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
        { state.currentUser === state.userId &&
        <>
          <Col xs={7}/>
          <Col><MyButton color="red" size="sm">삭제</MyButton></Col>
          <Update />
        </>
        }
      </S.SubHeader>
      <S.Body>{state.body}</S.Body>
      <Comments currentUser={state.currentUser}></Comments>
    </S.Article>
  )
};
