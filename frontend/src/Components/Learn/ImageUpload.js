import React, { useState } from 'react'
import { djangoInstance } from 'api/index'
import { MyButton } from 'styles/Button'
//import Dropzone from 'react-dropzone'

export function ImageUpload({ setFileImage, next, setKeyDjango, setWords, setIsStart }) {
  const [image, setImage] = useState('')
  const api = djangoInstance()

  function onLoad(e) {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function onImageUpload(e) {
    next()
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
        console.log(res)
        setImage(res.data)
        setKeyDjango(res.data.id)
        setWords(res.data.words)
        console.log(res.data.words)

        next()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {image ? 
        <MyButton onClick={onImageUpload}>시작!</MyButton>
      : 
        <>
          <MyButton style={{ width: '7rem', marginRight: '6rem' }}>
            {/* <Dropzone onDrop={onLoad}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone> */}
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
          <MyButton style={{ width: '7rem' }}>랜덤사진</MyButton>
        </>
      }
    </div>
  )
}
