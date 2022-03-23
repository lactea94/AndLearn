import { useParams } from "react-router-dom"

export function ProfileContentDetail() {
  const { userId, contentId } = useParams();

  return (
    <div>
      <p>userId : {userId}</p>
      <p>contentId : {contentId}</p>
      ContentDetail
    </div>
  )
}