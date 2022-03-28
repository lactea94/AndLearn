import { Col } from "react-bootstrap";
import * as S from "./style";
import { MyButton } from "styles/Button";

export function Create() {
  return (
    <S.CreateForm>
      <Col>유저이름</Col>
      <Col xs={9}>
        <S.Textarea rows="3" placeholder="댓글"></S.Textarea>
      </Col>
      <Col xs={1}>
        <MyButton size="sm">작성</MyButton>
      </Col>
    </S.CreateForm>
  )
};
