import { Image } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"

export function ProfileContent({content}) {
  const { userId } = useParams();

  return (
    <div className="mb-4">
      <NavLink 
        to={`/profile/${userId}/content/${content.id}`}
        state={{
          imgUrl: content.pictureUrl,
        }}
      >
        <Image 
          src={`https://d3qljd3xvkb8gz.cloudfront.net/${content.pictureUrl}`} 
          alt="content_image" 
          fluid 
          style={{ width: "240px", height: "240px"}} />
      </NavLink>
    </div>
  )
}