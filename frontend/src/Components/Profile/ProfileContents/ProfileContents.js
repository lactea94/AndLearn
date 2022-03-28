import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProfileContent } from './ProfileContent';
import styled from "styled-components";
import { useState, useEffect } from "react"

const Remote = styled.div`
  display: block; 
  position: fixed; 
  top: 300px; 
  left: 1300px; 
  z-index: 1000; 
  cursor: move;
  background-color: white;
  width: 10rem;
  height: 20rem;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 15px;
`

export function ProfileContents() {
  const { userId } = useParams();
  const [contents, setContents] = useState([]);
  const [selectedContents, setSelectedContents] = useState([]);

  // 전체 Contents 목록 불러오기 (현재 임시 값)
  useEffect(() => {
    setContents([
      {
        id: 1,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-03-23 11:14:00'
      },
      {
        id: 2,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-09-23 11:14:00'
      },
      {
        id: 3,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-09-24 11:14:00'
      },
      {
        id: 4,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-12-23 11:14:00'
      },
      {
        id: 5,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-01-23 11:14:00'
      },
      {
        id: 6,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-23 11:14:00'
      },
      {
        id: 7,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-24 11:14:00'
      },
      {
        id: 8,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-25 11:14:00'
      },
      {
        id: 9,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-26 11:14:00'
      },
      {
        id: 10,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-27 11:14:00'
      },
    ]);
  }, [])

  // 
  useEffect(() => {
    setSelectedContents(contents);
  }, [contents])

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
        {selectedContents.map((content) => {
          return (
            <Col xs={4} key={content.id}>
              <ProfileContent imgUrl={content.imgUrl} contentId={content.id}/>
            </Col>
          )
        })}
      </Row>
      <Remote
        draggable 
        onDragStart={dragStartHandler} 
        onDrag={dragHandler} 
        onDragEnd={dragEndHandler}
      >
        filter remote
      </Remote>
    </div>
  )
}