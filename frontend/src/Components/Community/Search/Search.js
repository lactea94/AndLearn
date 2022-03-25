import { Col } from "react-bootstrap";
import * as S from "./Style"

export function Search({ setSearchTerm }) {
  return (
    <Col xs={10}>
      <S.Control
        placeholder="제목을 검색하세요"
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        />
    </Col>
  )
}
