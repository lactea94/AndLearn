import React, { useEffect, useState, useCallback } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
// import { GrammarlyEditor } from './GrammarlyEditor'
import plusDefault from './plusDefault.png'
import allu from './allu.png'
import { apiInstance } from 'api/index'
import { MyButton } from 'styles/Button.js'
import { Container, Image, Col, Row } from 'react-bootstrap'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

const MyImage = styled(Image)`
  margin-top: 3rem;

  @media screen and (min-width: 900px) {
    width: 850px;
    height: 500px;
  }
  width: 90%;
`

const MyImage2 = styled(Image)`
  ${'' /* @media screen and (min-width: 900px) {
    width: 500px;
    height: 350px;
  } */}
  width: 80%;
`

const AlluImage = styled(Image)`
  width:200px;
  height:200px;

`

export const AIBox = styled.div`
  margin-top: 20px;
  text-align: left;
  border: 1px solid gray;
  width: 100%;
  padding: 5px;
  margin-left: 12px;
  margin-right: 24px;
  margin-bottom: 30px;
  border-radius: 6px;
`

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)

  const [isStart, setIsStart] = useState(false);
  const [isFirstRecord, setIsFirstRecord] = useState(false);
  const [isSecondRecord, setIsSecondRecord] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [keyDjango, setKeyDjango] = useState(2)
  const [words, setWords] = useState([])

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')

  const navigate = useNavigate();
  const recommendWord = words.map((word) => <p key={word.id}>{word}</p>)

  function next() {
    setStage(stage + 1)
  }

  function onCheck(e) {
    console.log(e.target.value)
    setScript1(e.target.value)
  }

  function onSubmit() {
    
    const formData = new FormData()
    formData.append('file', aud1)
    formData.append('file2', aud2)
    const data = {
      score: 5.0,
      words: words,
      sentences: [script1, script2],
    }
    formData.append(
      'learnPostReq',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    )

    api
      .post(`learn/${keyDjango}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setIsSubmit(true)
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onComplete = () => {
    navigate('/profile/content')
  }

  return (
    <Container>
      <div id="before-after-upload-image">
        {!isStart && (
          <>
            <MyImage src={fileImage} alt="추가한 사진" />
            <ImageUpload
              setFileImage={setFileImage}
              setKeyDjango={setKeyDjango}
              setWords={setWords}
              setIsStart={setIsStart}
            />
          </>
        )}
      </div>
      <Row style={{ marginTop: '3rem'}}>
        {isStart && (
          <>
          <Row>
              <Col lg={2} />
              <Col lg={6}>
                <MyImage2 src={fileImage} alt="추가한 사진" />
              </Col>
              
              {/* Record 부분 */}
              <Col lg={4}>
                {isStart &&
                  <span id="first-record">
                    {!isFirstRecord && 
                      <AudioRecord
                        setScript={setScript1}
                        setAudioUrl1={setAudioUrl1}
                        setAud1={setAud1}
                        setIsRecord={setIsFirstRecord}
                      />
                    }
                    {audioUrl1 && 
                      <>
                        <p>1차 녹음</p>
                        <audio controls src={audioUrl1} controlsList='nodownload'></audio>
                      </>
                    }
                  </span>
                }
                {isFirstRecord && 
                  <span id="second-record">
                    {!isSecondRecord &&
                      <AudioRecord
                        setScript={setScript2}
                        setAudioUrl1={setAudioUrl2}
                        setAud1={setAud2}
                        setIsRecord={setIsSecondRecord}
                      />
                    }
                    {audioUrl2 && (
                      <>
                        <p>2차 녹음</p>
                        <audio controls src={audioUrl2} controlsList="nodownload"></audio>
                      </>
                    )}
                  </span>
                }
                 <div>AI가 추천한 단어</div>
                <AIBox> 
                  {recommendWord}
                </AIBox>
              </Col>
            </Row>
            {/* Answer Box 부분 */}
            <Row id="answer-box">
              <Col lg={2} />
              {aud1 && (
                <>
                  <Col lg={6} style={{ marginTop: '2rem'}}>
                    <textarea value={script1} style={{  width: '100%'}} onChange={onCheck}>
                      {script1}
                    </textarea>
                  </Col>
                  <Col lg={4}>
                  <AlluImage src={allu} alt="추가한 사진" />
                  </Col>
                </>
              )}
              <Col lg={2} />
              {aud2 && (
                <>
                  <Col lg={6}>
                    <textarea value={script2} style={{ width: '100%'}} onChange={onCheck}>
                      {script2}
                    </textarea>
                  </Col>
                  <Col lg={4}>
                  </Col>
                </>
              )}
            </Row>
          </>
        )}
      </Row>
      <div>{isSecondRecord && !isSubmit && <MyButton onClick={onSubmit}>전송</MyButton>}</div>
      <div>
        {isSubmit && <MyButton onClick={() => {onComplete()}}>전송완료</MyButton>}
      </div>
    </Container>
  )
}
