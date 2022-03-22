import { Col } from "react-bootstrap";
import * as S from "./style";
import * as T from "../../../Style";

export function Create() {
  return (
    <S.CreateForm>
      <Col xs={10}>
        <S.Control type="text" placeholder="댓글"></S.Control>
      </Col>
      <Col>
        <T.MyButton size="sm">작성</T.MyButton>
      </Col>
    </S.CreateForm>
  )
};
