import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { API_BASE_URL } from "constants";
import { DateFormat } from 'Util/DateFormat';

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  
  useEffect(() => {
    apiInstance().get(API_BASE_URL + `/community/${articleId}`)
    .then(resposne => setArticle(resposne.data))
  }, [articleId])

  const handleClick = () => {
    apiInstance().delete(API_BASE_URL + `/community/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
  }

  return (
    <S.Article>
      <S.Header>
        <S.Title xs={9}>{article.title}</S.Title>
        <S.Created>{DateFormat(article.createdAt)}</S.Created>
        <S.Updated>{DateFormat(article.updatedAt)}</S.Updated>
      </S.Header>
      <S.SubHeader>
        <S.User xs={2}>{article.nickname}</S.User>
        <Col xs={2} sm={5} md={6}/>
        {(article.nickname === state.user.nickname || state.user.admin) && 
          <Col>
            <MyButton
              color="red"
              size="sm"
              onClick={handleClick}
            >
              삭제
            </MyButton>
          </Col>}
        {article.nickname === state.user.nickname && 
          <Update
            title={article.title}
            content={article.content}
        />}
      </S.SubHeader>
      <S.Body style={{
        whiteSpace: "pre-wrap"
      }}>
        {article.content}
      </S.Body>
      <Comments />
    </S.Article>
  )
};
