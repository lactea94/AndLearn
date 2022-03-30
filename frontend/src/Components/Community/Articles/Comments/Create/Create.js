import { Col } from "react-bootstrap";
import * as S from "./style";
import { MyButton } from "styles/Button";

export function Create() {
  return (
    <S.CreateForm>
      <Col xs={10}>
        <S.TextArea rows="3" placeholder="댓글"></S.TextArea>
      </Col>
      <Col>
        <MyButton size="sm">작성</MyButton>
      </Col>
    </S.CreateForm>
  )
};
