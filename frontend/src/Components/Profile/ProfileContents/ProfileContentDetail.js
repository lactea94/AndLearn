import { useParams } from "react-router-dom"
import { Row, Col, Image, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";

const Text = styled.div`
  font-size: 17px;
  margin-bottom: 5px;
`

export function ProfileContentDetail() {
  const { userId, contentId } = useParams();
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);

  // 임시 학습 디테일 정보
  const learningInfo = {
    img_url: 'http://placeimg.com/400/400/animals',
    created_at: '2021-03-23 11:14:00',
    answer_time: '45',
    score: '3.7',
    record_1: 'record_1_url',
    record_2: 'record_2_url',
    AI_answers: ['apple', 'banana', 'cake'],
    my_answer: 'Help me...'
  }

  const onToggleOpen = () => {
    setIsCheckAnswer(!isCheckAnswer)
  }

  return (
    <div>
      <Row>
        <Col xs={5}>
          <Image src={`${learningInfo.img_url}`} alt="profile_image" rounded fluid></Image>
        </Col>
        <Col xs={7} className="d-flex flex-column align-items-start">
          <Text>날짜 : {learningInfo.created_at}</Text>
          <Text>경과시간 : {learningInfo.answer_time}</Text>
          <Text>내 발음 점수 : {learningInfo.score}</Text>
          <Text>1차 녹음본 : </Text>
          <Text>2차 녹음본 : </Text>
          <Text>AI 답변 / 내 답변</Text>
          <Button style={{ display : isCheckAnswer ? 'none' : ''}} onClick={() => {onToggleOpen()}}>Open</Button>
          <span style={{ display : isCheckAnswer ? '' : 'none'}}>
            <Text>AI 답변 : {learningInfo.AI_answers.join(",")}</Text>
            <Text>내 답변 : {learningInfo.my_answer}</Text>
          </span>          
        </Col>
      </Row>
    </div>
  )
}