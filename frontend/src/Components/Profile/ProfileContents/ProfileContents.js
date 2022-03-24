import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProfileContent } from './ProfileContent';
import styled from "styled-components";

const Remote = styled.div`
  display: block; 
  position: fixed; 
  top: 300px; 
  left: 1300px; 
  z-index: 1000; 
  cursor: move;
  background-color: black;
  width: 10rem;
  height: 20rem;
  color: white;
`

export function ProfileContents() {
  const { userId } = useParams();

  const contentsImgUrl = []
  for (let i = 0; i < 10; i++) {
    contentsImgUrl.push("http://placeimg.com/400/400/nature")
  }

  let posX = 0;
  let posY = 0;  
  const dragStartHandler = e => {
    posX = e.clientX;
    posY = e.clientY;
  };
  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  }
  const dragEndHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
  }

  return (
    <div>
      {userId} Profile contents
      <Row>
        {contentsImgUrl.map((imgUrl, index) => {
          return (
            <Col xs={4} key={index}>
              <ProfileContent imgUrl={imgUrl} contentId={index}/>
            </Col>
          )
        })}
      </Row>
      <Remote draggable onDragStart={dragStartHandler} onDrag={dragHandler} onDragEnd={dragEndHandler}>
        filter remote
      </Remote>
    </div>
  )
}