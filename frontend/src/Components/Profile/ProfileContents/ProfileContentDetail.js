import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as S from './ProfileContentDetailStyle';
import { apiInstance } from "api";

export function ProfileContentDetail() {
  const { contentId } = useParams();
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [learningInfo, setLearningInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance().get(`/learn/picture/${contentId}`)
      .then(res => {
        setLearningInfo(res.data);
      })
  }, [contentId])

  const onToggleOpen = () => {
    setIsCheckAnswer(!isCheckAnswer)
  }

  return (
    <>
      {learningInfo && 
        <div>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Image 
                src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.pictureUrl}`} 
                alt="profile_image" 
                rounded 
                fluid 
                style={{ width: '100%', marginBottom: '10px', overflow: 'hidden', objectFit: 'cover' }}
              />
            </Col>
            <Col>
              <Col>
                <S.Text>학습 날짜 : {learningInfo.createdDate.substr(0, 19)}</S.Text>
                <S.Text>발음 점수 : {learningInfo.score}</S.Text>
              </Col>
              <S.AudioBox>
                <S.Text1>첫 번째 녹음</S.Text1>
                <audio controls>
                  <source src={`${learningInfo.records[0].recordUrl}`} />
                </audio>
                <S.Text1>{learningInfo.records[0].sentence}</S.Text1>
              </S.AudioBox>
              <Col>
                <S.Button color="#58C063" onClick={() => {onToggleOpen()}}>{isCheckAnswer ? '닫기' : 'AI 단어 보기'}</S.Button>
              </Col>
              <S.AnswerBox style={{ display : isCheckAnswer ? '' : 'none'}}>
                <S.Text1>AI 단어 : {learningInfo.words.map(word => word.content).join(", ")}</S.Text1>
              </S.AnswerBox>          
              <S.AudioBox>
                <S.Text1>두 번째 녹음</S.Text1>
                <audio controls>
                  <source src={`${learningInfo.records[1].recordUrl}`} />
                </audio>
                <S.Text1>{learningInfo.records[1].sentence}</S.Text1>
              </S.AudioBox>
              <Col>
                <S.Button onClick={() => navigate(-1)}>뒤로가기</S.Button>
              </Col>
            </Col>
          </Row>
          <br />
        </div>
      }
    </>
  )
}