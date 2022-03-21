import React from 'react'
import { Link } from 'react-router-dom';
import { DateFormat } from '../module/module';
import * as S from './Style'

const nowTime = new Date();

export default function Articles({ notices, articles, offset, limit }) {

  return (
    <S.Table>
      <S.TableHead>
        <S.ColumnName xs={1}>#</S.ColumnName>
        <S.ColumnName xs={7}>제목</S.ColumnName>
        <S.ColumnName xs={2}>작성자</S.ColumnName>
        <S.ColumnName xs={2}>날짜</S.ColumnName>
      </S.TableHead>
      {notices.map((notice) => (
        <S.TableNoticeRow key={notice.id}>
          <S.Column xs={1}>공지</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`${notice.id}`}
              state={{
                userId: notice.userId,
                title: notice.title,
                body: notice.body
            }}>
              {notice.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{notice.userId}</S.Column>
          <S.Column xs={2}>
            {DateFormat(nowTime, notice.created_at)}
          </S.Column>
        </S.TableNoticeRow>
      ))}
      {articles.slice(offset, offset + limit).map((article) => (
        <S.TableRow key={article.id}>
          <S.Column xs={1}>{article.id}</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`${article.id}`}
              state={{
                userId: article.userId,
                title: article.title,
                body: article.body
            }}>
              {article.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{article.userId}</S.Column>
          <S.Column xs={2}>임시</S.Column>
        </S.TableRow>
      ))}
    </S.Table>
  )
};
