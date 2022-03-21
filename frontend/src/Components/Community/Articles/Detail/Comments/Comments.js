import * as S from "./Style"

const comments = [
  {userId: 1, body: "안녕하세요", created_at: "2022. 03. 14 11:10"}
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