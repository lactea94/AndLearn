import React, { useState } from 'react'
import { djangoInstance } from 'api/index'
import { MyButton } from 'styles/Button'
//import Dropzone from 'react-dropzone'

export function ImageUpload({ setFileImage, next, setKeyDjango, setWords }) {
  const [image, setImage] = useState('')
  const api = djangoInstance()

  function onLoad(e) {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function onImageUpload(e) {
    next()
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
    <div>
      <div>
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
          className="btn btn-outline-primary"
          name="ImgBtn"
          htmlFor="imgInput"
          width={180}
          height={160}
        >
          버튼을 눌러 사진을 업로드 해주세요{' '}
        </label>
      </div>
      {/* <button>랜덤사진</button> */}
      <MyButton onClick={onImageUpload}>시작!</MyButton>
    </div>
  )
}
