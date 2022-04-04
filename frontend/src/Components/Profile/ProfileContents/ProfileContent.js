import { Image } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom"
import styled from "styled-components";

const MyImage = styled(Image)`
  @media screen and (min-width: 576px) {
    width: 240px;
    height: 240px;
  }
  width: 120px;
  height: 120px;
`

export function ProfileContent({content}) {
  const { userId } = useParams();

  return (
    <div className="mb-4">
      <NavLink 
        to={`/profile/content/${content.id}`}
      >
        <MyImage 
          src={`https://d3qljd3xvkb8gz.cloudfront.net/${content.pictureUrl}`} 
          alt="content_image" 
          fluid 
          />
      </NavLink>
    </div>
  )
}