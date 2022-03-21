import { Col } from "react-bootstrap";
import * as S from "./style"

export function Create() {
  return (
    <S.CreateForm>
      <Col xs={10}>
        <S.Control type="text" placeholder="댓글"></S.Control>
      </Col>
      <Col>
        <S.Create size="sm">작성</S.Create>
      </Col>
    </S.CreateForm>
  )
}
