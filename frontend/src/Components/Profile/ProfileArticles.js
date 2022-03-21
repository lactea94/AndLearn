import { useParams } from 'react-router-dom'

export function ProfileArticles() {
  const { userId } = useParams();

  return (
    <div>
      {userId} ProfileArticles
    </div>
  )
}