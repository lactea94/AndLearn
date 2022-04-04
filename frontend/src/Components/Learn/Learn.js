import React, { useEffect, useState, useCallback } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
import plusDefault from './plusDefault.png'
import { apiInstance } from 'api/index'
import { MyButton } from 'styles/Button.js'
import { Container, Image } from 'react-bootstrap'
import styled from "styled-components";

const MyImage = styled(Image)`
  margin-top: 3rem;

  @media screen and (min-width: 900px) {
    width: 850px;
    height: 500px;
  }
  width: 90%;
`

export function Learn() {
  const api = apiInstance()
  const [fileImage, setFileImage] = useState(plusDefault)
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)
  const [keyDjango, setKeyDjango] = useState(2)
  const [words, setWords] = useState([])

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')
  const recommendWord = words.map((word) => <p key={word.id}>{word}</p>)
  function next() {
    setStage(stage + 1)
    console.log(stage)
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
        next()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Container>
      <div>
        <MyImage src={fileImage} alt="추가한 사진" />
        {stage === 0 && (
          <ImageUpload
            setFileImage={setFileImage}
            next={next}
            setKeyDjango={setKeyDjango}
            setWords={setWords}
          />
        )}
      </div>
      <div>{recommendWord}</div>
      <div>
        {stage >= 1 && (
          <>
            <AudioRecord
              setScript={setScript1}
              next={next}
              setAudioUrl1={setAudioUrl1}
              setAud1={setAud1}
            />

            {aud1 && (
              <>
                <textarea value={script1} onChange={onCheck}>
                  {script1}
                </textarea>
                <audio controls src={audioUrl1} controlsList='nodownload'></audio>
              </>
            )}
          </>
        )}
      </div>
      <div>
        {stage >= 2 && (
          <>
            <GrammarlyEditor script={script1} stage={stage} next={next} />
          </>
        )}
      </div>
      <div>
        {stage >= 3 && (
          <>
            <AudioRecord
              setScript={setScript2}
              next={next}
              setAudioUrl1={setAudioUrl2}
              setAud1={setAud2}
            />
            {aud2 && (
              <audio controls src={audioUrl2} controlsList="nodownload"></audio>
            )}
          </>
        )}
      </div>
      <div>{stage >= 4 && <MyButton onClick={onSubmit}>다음</MyButton>}</div>
      <div>
        {stage >= 5 && <MyButton onClick={onSubmit}>전송완료</MyButton>}
      </div>
    </Container>
  )
}
