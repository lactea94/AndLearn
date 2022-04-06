import React, { useEffect, useState } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
// import { GrammarlyEditor } from './GrammarlyEditor'
import plusDefault from './plusDefault.png'
import allu from './allu.png'
import { apiInstance } from 'api/index'
import { MyButton } from 'styles/Button.js'
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as S from './LearnStyle';

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)

  const [isStart, setIsStart] = useState(false);
  const [isFirstRecord, setIsFirstRecord] = useState(false);
  const [isSecondRecord, setIsSecondRecord] = useState(false);

  const [keyDjango, setKeyDjango] = useState(2)
  const [words, setWords] = useState([]);

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')

  const [recommendWord, setRecommendWord] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const wordList = words.map((word, index) => 
      <div key={index}>{word}</div>
    )
    setRecommendWord(wordList)
  }, [words])

  function onCheck1(e) {
    console.log(e.target.value)
    setScript1(e.target.value)
  }

  function onCheck2(e) {
    console.log(e.target.value)
    setScript2(e.target.value)
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
        console.log(res)
      })
      .then(setTimeout(() => {
        navigate('/profile')
      }, 500))
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Container>
        {!isStart ? (
          <Row>
            <Col xs={12}>
              <S.MyImage src={fileImage} alt="추가한 사진" />
            </Col>
            <ImageUpload
              setFileImage={setFileImage}
              setKeyDjango={setKeyDjango}
              setWords={setWords}
              setIsStart={setIsStart}
            />
          </Row>
        ) : (
          <Row className='justify-content-center'>
            <Col xs={12} lg={6}>
              <S.MyImage2 src={fileImage} alt="녹음할 때 보일 사진" />
            </Col>
            {/* Record 부분 */}
            <Col>
              { (aud1 && words.length > 0) &&
                <S.AIBox> 
                  {recommendWord}
                </S.AIBox>
              }
              {isStart &&
                <span id="first-record">
                  {audioUrl1 && 
                    <>
                      <Row style={{ marginTop: '1rem' }}>
                        <Col xs={3} lg={12}>
                          <S.Text1>1차 녹음</S.Text1>
                        </Col>
                        <Col xs={9}>
                          <S.smallAudio controls src={audioUrl1} controlsList='nodownload'></S.smallAudio>
                        </Col>
                      </Row>
                      {aud1 && (
                        <textarea value={script1} style={{ width: '100%', marginTop: '1rem' }} onChange={onCheck1}>
                          {script1}
                        </textarea>
                      )}
                    </>
                  }
                  {!isFirstRecord && 
                    <AudioRecord
                      words={words}
                      setScript={setScript1}
                      setAudioUrl1={setAudioUrl1}
                      setAud1={setAud1}
                      setIsRecord={setIsFirstRecord}
                      whatRecord={'first'}
                    />
                  }
                </span>
              }
              {isFirstRecord && 
                <span id="second-record">
                  {audioUrl2 && (
                    <>
                      <S.Text2>2차 녹음</S.Text2>
                      <S.smallAudio controls src={audioUrl2} controlsList="nodownload"></S.smallAudio>
                      {aud2 && (
                        <textarea value={script2} style={{ width: '100%' }} onChange={onCheck2}>
                          {script2}
                        </textarea>
                      )}
                    </>
                  )}
                  {!isSecondRecord &&
                    <AudioRecord
                      setScript={setScript2}
                      setAudioUrl1={setAudioUrl2}
                      setAud1={setAud2}
                      setIsRecord={setIsSecondRecord}
                      whatRecord={'second'}
                    />
                  }
                </span>
              }
              
            </Col>
            {/* Answer Box 부분 */}
            <S.smallAlluCol className="justify-content-center">
              <S.AlluImage src={allu} alt="추가한 사진" />
            </S.smallAlluCol>
          </Row>
        )}

      {isSecondRecord && <MyButton onClick={onSubmit}>완료</MyButton>}
    </Container>
  )
}
