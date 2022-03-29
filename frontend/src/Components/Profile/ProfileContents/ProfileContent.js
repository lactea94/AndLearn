import { Image } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"

export function ProfileContent({imgUrl, contentId}) {
  const { userId } = useParams();

  return (
    <div className="mb-4">
      <NavLink 
        to={`/profile/${userId}/content/${contentId}`}
        state={{
          imgUrl: imgUrl,
        }}
      >
        <Image src={`${imgUrl}`} alt="content_image" fluid></Image>
      </NavLink>
    </div>
  )
}