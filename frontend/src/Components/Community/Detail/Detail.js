import { useLocation, useParams } from "react-router-dom"

export function Detail() {
  const { articleId } = useParams();
  const { state } = useLocation();
  console.log(state)
  return (
    <div>
      <div>
        게시글 아이디: {articleId}
      </div>
      <div>
        제목: {state.title}
      </div>
      <div>
        유저 아이디: {state.userId}
      </div>
      <div>
        내용: {state.body}
      </div>
    </div>
  )
}
