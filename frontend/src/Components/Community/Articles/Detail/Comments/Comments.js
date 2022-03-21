import * as S from "./Style"

const comments = [
  {userId: "김철수", body: "안녕하세요", created_at: "2022. 03. 14 11:10"},
  {userId: "박싸피", body: "반갑습니다", created_at: "2022. 03. 15 11:10"},
  {userId: "김영희", body: "안녕히 계세요", created_at: "2022. 03. 16 11:10"},
  {userId: "이싸피", body: "수고하세요", created_at: "2022. 03. 21 11:10"},
]


export function Comments() {
  return (
    <S.Comments>
      {comments.map((comment) => (
        <S.Comment>
          <S.User>{comment.userId}</S.User>
          <S.Body>{comment.body}</S.Body>
          <S.Created>{comment.created_at}</S.Created>
        </S.Comment>
      ))}
    </S.Comments>
  )
}