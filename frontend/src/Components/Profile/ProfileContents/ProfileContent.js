import { Image } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import styled from "styled-components";

const MyImage = styled(Image)`
  overflow: hidden;
  object-fit: cover;
  @media (max-width: 1200px) and (min-width: 768px) {
    width: 240px;
    height: 240px;
  }  

  @media (max-width: 768px) and (min-width: 480px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (min-width: 1200px) {
    width: 360px;
    height: 360px;
  }
  width: 120px;
  height: 120px;

`

export function ProfileContent({content}) {

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