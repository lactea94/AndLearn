import { useLocation, useParams } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import * as T from "../../Style";
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
        <Col xs={7}/>
        <Col><T.MyButton color="red" size="sm">삭제</T.MyButton></Col>
        <Update />
      </S.SubHeader>
      <S.Body>{state.body}</S.Body>
      <Comments></Comments>
    </S.Article>
  )
};
