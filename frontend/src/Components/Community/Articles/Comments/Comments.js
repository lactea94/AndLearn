import { Create } from "./Create/Create";
import { DateFormat } from "../../module/module";
import * as S from "./Style";

const nowTime = new Date();
const comments = [
  {id: 1, userId: 1, body: "안녕하세요", created_at: "2022. 03. 14 11:10"},
  {id: 2, userId: 2, body: "반갑습니다", created_at: "2022. 03. 15 11:10"},
  {id: 3, userId: 3, body: "안녕히 계세요", created_at: "2022. 03. 16 11:10"},
  {id: 4, userId: 4, body: "수고하세요", created_at: "2022. 03. 21 11:10"},
];

export function Comments({ currentUser }) {
  return (
    <S.Comments>
      <S.Header>댓글 {comments.length}개</S.Header>
      {comments.map((comment) => {
        if (currentUser === comment.id) {
          return (
            <S.MyComment key={comment.id} >
              <S.MyCommentContent>
                <S.Body>{comment.body}</S.Body>
                <S.Created>{DateFormat(nowTime, comment.created_at)}</S.Created>
                <S.Button>삭제</S.Button>
              </S.MyCommentContent>
            </S.MyComment>
          )
        } else {
          return (
            <S.Comment key={comment.id} >
              <S.ImgBox>
                <S.UserImg alt={comment.userId} src="/images/default_user.jpg" />
              </S.ImgBox>
              <S.CommentContent>
                <S.User>{comment.userId}</S.User>
                <S.Body>{comment.body}</S.Body>
                <S.Created>{DateFormat(nowTime, comment.created_at)}</S.Created>
              </S.CommentContent>
            </S.Comment>
          )
        }
      })}
      <Create />
    </S.Comments>
  )
};