import { useLocation, useParams } from "react-router-dom"

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  return (
    <div>
      <div>
        게시글 아이디: {articleId}
      </div>
      <div>
        제목: {state.article.title}
      </div>
      <div>
        유저 아이디: {state.article.userId}
      </div>
      <div>
        내용: {state.article.body}
      </div>
    </div>
  )
}
