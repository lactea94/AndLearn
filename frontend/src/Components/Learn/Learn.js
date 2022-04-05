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
import axios from 'axios';

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
  width: 100%;
`

const AlluImage = styled(Image)`
  width:200px;
  height:200px;

`
const Text1 = styled.div`
  margin-bottom:15px;
  font-weight:bold;
`

const Text2 = styled.div`
  margin-bottom:15px;
  margin-top:30px;
  font-weight:bold;
`

const Text3 = styled.div`
  margin-top: 30px;
  font-weight: bold;
`

const AIBox = styled.div`
  margin-top: 1rem;
  text-align: center;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
`

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)

  const [isStart, setIsStart] = useState(false);
  const [isFirstRecord, setIsFirstRecord] = useState(false);
  const [isSecondRecord, setIsSecondRecord] = useState(false);

  const [keyDjango, setKeyDjango] = useState(2)
  const [words, setWords] = useState([])

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')

  const [recommendWord, setRecommendWord] = useState();

  const navigate = useNavigate();
  // const recommendWord = words.map((word) => <div key={word.id}>{word}</div>)

  useEffect(() => {
    const wordList = words.map((word) => <div key={word.id}>{word}</div>)
    setRecommendWord(wordList)
  }, [words])

  function next() {
    setStage(stage + 1)
  }

  function onCheck1(e) {
    console.log(e.target.value)
    setScript1(e.target.value)
  }

  function onCheck2(e) {
    console.log(e.target.value)
    setScript2(e.target.value)
  }

  function onSubmit() {
    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        return(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    const audioToString = getBase64(aud2)

    const scoreData = {
      'access_key': '83178bba-2ea7-46a2-b88f-47e9d6915d3b',
      'argument': {
          'language_code': 'english',
          'audio': `${audioToString}`
      }
    }

    const scoreBody = JSON.stringify(scoreData)

    axios
      .post('http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation', scoreBody, {
      headers: {
        'Content-Type':'application/json; charset=UTF-8'
      },
    })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
    
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
              <MyImage src={fileImage} alt="추가한 사진" />
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
            <Col xs={12}>
              <MyImage2 src={fileImage} alt="추가한 사진" />
            </Col>
            {/* Record 부분 */}
            <Col>
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
                      <Text1>1차 녹음</Text1>
                      <audio controls src={audioUrl1} controlsList='nodownload'></audio>
                      {aud1 && (
                        <textarea value={script1} style={{ width: '100%' }} onChange={onCheck1}>
                          {script1}
                        </textarea>
                      )}
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
                      <Text2>2차 녹음</Text2>
                      <audio controls src={audioUrl2} controlsList="nodownload"></audio>
                      {aud2 && (
                        <textarea value={script2} style={{ width: '100%' }} onChange={onCheck2}>
                          {script2}
                        </textarea>
                      )}
                    </>
                  )}
                </span>
              }
              { (audioUrl1 && words.length > 0) &&
                <AIBox> 
                  {recommendWord}
                </AIBox>
              }
            </Col>
            {/* Answer Box 부분 */}
            <Col className="justify-content-center">
              <AlluImage src={allu} alt="추가한 사진" />
            </Col>
          </Row>
        )}

      {isSecondRecord && <MyButton onClick={onSubmit}>완료</MyButton>}
    </Container>
  )
}
