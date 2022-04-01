import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as S from './ProfileContentDetailStyle';
import { apiInstance } from "api";

export function ProfileContentDetail() {
  const { contentId } = useParams();
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [learningInfo, setLearningInfo] = useState();
  const api = apiInstance();

  useEffect(() => {
    api.get(`/learn/picture/${contentId}`)
      .then(res => {
        setLearningInfo(res.data)
      })
  }, [])

  const onToggleOpen = () => {
    setIsCheckAnswer(!isCheckAnswer)
  }

  return (
    <>
      {learningInfo && 
        <div>
          <Row>
            <Col xs={5}>
              <Image 
                src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.pictureUrl}`} 
                alt="profile_image" 
                rounded 
                fluid 
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={7} className="d-flex flex-column align-items-start row text-start">
              <S.Text>날짜 : {learningInfo.createdDate}</S.Text>
              <S.Text>내 발음 점수 : {learningInfo.score}</S.Text>

              <div className="row mb-2">
                <S.Text className="mb-0 align-self-center">1차 녹음본</S.Text>
                <audio controls>
                  <source src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.records[0].recordUrl}`} />
                </audio>
              </div>

              <div className="row">
                <S.Text className="mb-0 align-self-center">2차 녹음본</S.Text>
                <audio controls>
                  <source src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.records[1].recordUrl}`} />
                </audio>
              </div>

              <S.Text>AI 답변 / 내 답변</S.Text>
              <S.AnswerButton onClick={() => {onToggleOpen()}}>{isCheckAnswer ? 'Close' : 'Open'}</S.AnswerButton>
              <S.AnswerBox style={{ display : isCheckAnswer ? '' : 'none'}}>
                <S.Text>AI 답변 : {learningInfo.words.join(",")}</S.Text>
                <S.Text>내 답변 : {learningInfo.records[0].sentence}</S.Text>
                <S.Text>내 답변 : {learningInfo.records[1].sentence}</S.Text>
              </S.AnswerBox>          
            </Col>
          </Row>
          <br />
        </div>
      }
    </>
  )
}