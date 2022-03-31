import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { DateFormat } from 'Util/DateFormat';

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

  useEffect(() => {
    apiInstance().get(`/community/${articleId}`)
    .then(resposne => setArticle(resposne.data))
  }, [articleId])

  const handleClick = () => {
    if (state.isNotice === 1) {
      apiInstance().delete(`/community/notice/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
    } else {
      apiInstance().delete(`/community/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
    }
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
        {(article.nickname === state.user.nickname) && 
          <>
            <Col>
              <MyButton
                color="red"
                size="sm"
                onClick={handleClick}
              >
                삭제
              </MyButton>
            </Col>
            <Update
            title={article.title}
            content={article.content}
            />
          </>}
      </S.SubHeader>
      <S.Body style={{
        whiteSpace: "pre-wrap"
      }}>
        {article.content}
      </S.Body>
      <Comments articleI={articleId} usernickname={state.user.nickname}/>
    </S.Article>
  )
};
