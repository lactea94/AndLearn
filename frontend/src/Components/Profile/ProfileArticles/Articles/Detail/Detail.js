import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiInstance } from "api";

export function Detail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const api = apiInstance();
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance().get(`/community/${articleId}`)
    .then(resposne => setArticle(resposne.data))
  }, [articleId])

  const deleteArticle = () => {
    apiInstance().delete(`/community/${articleId}`)
  }

  return (
    <S.Article>
      <S.Header>
        <S.Title xs={10}>{article.title}</S.Title>
        <S.Created>{article.createdAt}</S.Created>
      </S.Header>
      <S.SubHeader>
        <S.User>{article.nickname}</S.User>
        <>
          <Col xs={7}/>
          <Col>
            <MyButton onClick={deleteArticle} color="red" size="sm">삭제</MyButton>
          </Col>
          <Update />
        </>
      </S.SubHeader>
      <S.Body>{article.content}</S.Body>
      <Comments></Comments>
    </S.Article>
  )
};
