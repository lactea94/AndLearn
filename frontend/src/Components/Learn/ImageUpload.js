import { useState } from 'react'
import { djangoInstance } from 'api/index'
import { MyButton } from 'styles/Button'
import { Alert, Col } from 'react-bootstrap'
import plusDefault from './defaultImage.jpg'

export function ImageUpload({ setFileImage, setKeyDjango, setWords, setIsStart }) {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const api = djangoInstance()

  function onLoad(e) {
    if (e.target.files[0].size > 1000000) {
      setError(true)
    } else {
      setImage(e.target.files[0])
      setFileImage(URL.createObjectURL(e.target.files[0]))
    }
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
          { error && <Alert variant="warning">1mb 이하의 사진을 올려주세요.</Alert>}
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
        </>
      }
    </Col>
  )
}
