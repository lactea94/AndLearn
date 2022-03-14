import { useParams } from "react-router-dom"

export function ProfileStats() {
  const { userId } = useParams();

  return(
    <div>
      {userId} Stats
    </div>
  )
}