import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const now = new Date();
const nowYear = String(now.getFullYear());
const nowMonth = now.getMonth() + 1 < 10 ? '0' + String(now.getMonth() + 1) : String(now.getMonth() + 1);
const nowDate = now.getDate() < 10 ? '0' + String(now.getDate()) : String(now.getDate());
const today = nowYear + '. ' + nowMonth + '. ' + nowDate;

function DateFormat(date) {
  if ( date.slice(0, 12) === today) {
    return (
      date.slice(13)
    )
  }
  return (
    date.slice(0, 12)
  )
};

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
          <tr key={notice.id} className="table-primary">
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
            <td>{DateFormat(notice.created_at)}</td>
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
