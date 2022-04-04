import { DateFormat } from 'Util/DateFormat';
import * as S from './Style';

export default function Articles({ articles, offset, limit }) {
  return (
    <S.Table>
      <S.TableHead>
        <S.ColumnName xs={1}>#</S.ColumnName>
        <S.ColumnName xs={7}>제목</S.ColumnName>
        <S.ColumnName xs={2}>작성자</S.ColumnName>
        <S.ColumnName xs={2}>날짜</S.ColumnName>
      </S.TableHead>
      
      {articles.slice(offset, offset + limit).map((article, index) => (
        <S.TableRow key={article.id}>
          <S.Column xs={1}>{index + 1}</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`/community/${article.id}`}
            >
              {article.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{article.nickname}</S.Column>
          <S.Column xs={2}>{DateFormat(article.createdDate)}</S.Column>
        </S.TableRow>
      ))}
    </S.Table>
  )
};
