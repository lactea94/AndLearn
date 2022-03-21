import React from 'react'
import { Link } from 'react-router-dom';
import { DateFormat } from '../module/module';
import * as S from './Style'

const nowTime = new Date();

export default function Articles({ notices, articles, offset, limit }) {

  return (
    <S.Table>
      <S.THead>
        <S.TR>
          <S.TH>#</S.TH>
          <S.TH style={{width:'60%'}}>제목</S.TH>
          <S.TH>작성자</S.TH>
          <S.TH>날짜</S.TH>
        </S.TR>
      </S.THead>
      <S.TBody>
        {notices.map((notice) => (
          <S.TR key={notice.id} style={{backgroundColor:"#ACC981"}}>
            <S.TD>공지</S.TD>
            <S.TD>
              <Link
                to={`${notice.id}`}
                state={{
                  userId: notice.userId,
                  title: notice.title,
                  body: notice.body
              }}>
                {notice.title}
              </Link>
            </S.TD>
            <S.TD>{notice.userId}</S.TD>
            <S.TD>
              {DateFormat(nowTime, notice.created_at)}
            </S.TD>
          </S.TR>
        ))}
        {articles.slice(offset, offset + limit).map((article) => (
          <S.TR key={article.id}>
            <S.TD>{article.id}</S.TD>
            <S.TD>
              <S.DetailLink
                to={`${article.id}`}
                state={{
                  userId: article.userId,
                  title: article.title,
                  body: article.body
              }}>
                {article.title}
              </S.DetailLink>
            </S.TD>
            <S.TD>{article.userId}</S.TD>
            <S.TD>임시</S.TD>
          </S.TR>
        ))}
      </S.TBody>
    </S.Table>
  )
};
