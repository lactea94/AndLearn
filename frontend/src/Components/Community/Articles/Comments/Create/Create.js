import { Col } from "react-bootstrap";
import * as S from "./style";
import { MyButton } from "styles/Button";

export function Create() {
  return (
    <S.CreateForm>
      <Col xs={10}>
        <S.Control type="text" placeholder="댓글"></S.Control>
      </Col>
      <Col>
        <MyButton size="sm">작성</MyButton>
      </Col>
    </S.CreateForm>
  )
};
