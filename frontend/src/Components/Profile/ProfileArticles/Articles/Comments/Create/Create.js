import { Col } from "react-bootstrap";
import * as S from "./style";
import { MyButton } from "styles/Button";
import { useState } from "react";
import { apiInstance } from "api";
import { useNavigate, useParams } from "react-router-dom";

export function Create() {
  const { articleId } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const validation = () => {
    if (content) return true
    else return false
  }
  const handleSubmit = () => {
    if (validation()) {
        apiInstance()
        .post(`/community/${articleId}/comment`,
          {
            content: content,
        }).then(navigate(0))
    }
  }

  return (
    <S.CreateForm>
      <Col xs={10}>
        <S.TextArea
          rows="3"
          placeholder="댓글"
          onChange={e => {
              setContent(e.target.value)
            }}
        />
      </Col>
      <Col>
        <MyButton size="sm" onClick={handleSubmit}>작성</MyButton>
      </Col>
    </S.CreateForm>
  )
};
