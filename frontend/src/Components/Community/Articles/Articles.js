import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { DateFormat } from '../module/module';

const nowTime = new Date();

export default function Articles({ notices, articles, offset, limit }) {

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{width:'60%'}}>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <tr key={notice.id} style={{backgroundColor:"#88B04B"}}>
            <td>공지</td>
            <td>
              <Link
                to={`${notice.id}`}
                state={{
                  userId: notice.userId,
                  title: notice.title,
                  body: notice.body
              }}>
                {notice.title}
              </Link>
            </td>
            <td>{notice.userId}</td>
            <td>
              {DateFormat(nowTime, notice.created_at)}
            </td>
          </tr>
        ))}
        {articles.slice(offset, offset + limit).map((article) => (
          <tr key={article.id}>
            <td>{article.id}</td>
            <td>
              <Link
                to={`${article.id}`}
                state={{
                  userId: article.userId,
                  title: article.title,
                  body: article.body
              }}>
                {article.title}
              </Link>
            </td>
            <td>{article.userId}</td>
            <td>임시</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};
