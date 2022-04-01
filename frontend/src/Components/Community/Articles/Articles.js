import { DateFormat } from 'Util/DateFormat';
import * as S from './Style';

export default function Articles({ notices, articles, offset, limit, me }) {
  const NoSearchItems = () => {
    return (
      <div style={{margin: "5rem"}}>
        <h3>
          검색결과가 없습니다.
        </h3>
      </div>
    )
  }

  function ArticleComponent(article, notice) {
    return (
      <S.TableRow notice={notice} key={article.id}>
        <S.Column xs={1}>
          {notice ? '공지' : `${article.id}`}
        </S.Column>
        <S.Column xs={7}>
          <S.DetailLink
            to={`${article.id}`}
            state={{
              user: me,
              isNotice: notice,
            }}
          >
            {article.title}
          </S.DetailLink>
        </S.Column>
        <S.Column xs={2}>{article.nickname}</S.Column>
        <S.Column xs={2}>
          {DateFormat(article.createdDate)}
        </S.Column>
      </S.TableRow>
    )
  }

  return (
    <S.Table>
      <S.TableHead>
        <S.ColumnName xs={1}>#</S.ColumnName>
        <S.ColumnName xs={7}>제목</S.ColumnName>
        <S.ColumnName xs={2}>작성자</S.ColumnName>
        <S.ColumnName xs={2}>날짜</S.ColumnName>
      </S.TableHead>
      {notices.map((notice) => (
        ArticleComponent(notice, 1)
      ))}
      {articles.slice(offset, offset + limit).map((article) => (
        ArticleComponent(article, 0)
      ))}
      {(articles.length === 0) && (<NoSearchItems />)}
    </S.Table>
  )
};
