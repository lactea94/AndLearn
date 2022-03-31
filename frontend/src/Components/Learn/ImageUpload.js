import React, { useState } from 'react'
import { djangoInstance } from 'api/index'
import { API_BASE_URL } from 'constants/index'
import { useNavigate } from 'react-router-dom'
//import Dropzone from 'react-dropzone'

export function ImageUpload({ setFileImage, setImageId, next }) {
  const [image, setImage] = useState('')
  const api = djangoInstance()

  function onLoad(e) {
    setImage(URL.createObjectURL(e.target.files[0]))
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function onImageUpload(e) {
    next()
    const formData = new FormData()
    formData.append('file', image[0])
    api
      .post('image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setImage(res.data)
        setImageId(res.data.id)
        next()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <img width={180} height={160} src={image} alt="" />
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
        >
          프로필 사진 등록
        </label>
      </div>
      <button>랜덤사진</button>
      <button onClick={onImageUpload}>시작!</button>
    </div>
  )
}
