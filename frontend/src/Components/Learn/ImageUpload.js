import React, { useEffect, useState } from 'react'
import { djangoInstance } from 'api/index'
import { MyButton } from 'styles/Button'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import plusDefault from './defaultImage.jpg'

export function ImageUpload({ setFileImage, setKeyDjango, setWords, setIsStart }) {
  const [image, setImage] = useState('')
  const api = djangoInstance()
  const navigate = useNavigate();

  function onLoad(e) {
    setImage(e.target.files[0])
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function onImageUpload(e) {
    setIsStart(true);
    const formData = new FormData()
    formData.append('file', image)
    api
      .post('image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        setImage(res.data)
        setKeyDjango(res.data.id)
        if (res.data.words) {
          setWords(res.data.words)
        } else {
          setWords(['AI 추천 단어를 선별하지 못했습니다.', '다른 사진을 이용해보세요.'])
        }
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onGoToBefore() {
    // window.location.assign('/learn');
    setFileImage(plusDefault)
    setImage('');
  }

  return (
    <Col>
      {image ? 
        <>
          <MyButton style={{margin: "1rem"}} onClick={() => {onGoToBefore()}}>이전</MyButton>
          <MyButton style={{margin: "1rem"}} onClick={() => {onImageUpload()}}>시작!</MyButton>
        </>
      : 
        <>
          <MyButton style={{margin: "1rem"}}>
            <input
              id="imgInput"
              className="image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onLoad}
            ></input>

            <label
              style={{ cursor: 'pointer' }}
              name="ImgBtn"
              htmlFor="imgInput"
            >
              사진 업로드
            </label>
          </MyButton>
          <MyButton style={{margin: "1rem"}}>랜덤사진</MyButton>
        </>
      }
    </Col>
  )
}
