import React, { useState } from 'react'
//import Dropzone from 'react-dropzone'

export function ImageUpload(fileImage) {
  const [image, setImage] = useState('')

  function onLoad(e) {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  function onImageUpload(e) {
    // const formData = new FormData()
    // formData.append('file', files[0])
    // authAxios
    //   .post(`/profile/update/image/${id}`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     setImage(res.data)
    //     setFiles('')
    //     window.location.replace(`/auth/profile/${id}`)
    //   })
    //   .catch((error) => console.log(error))
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
      <button>시작!</button>
    </div>
  )
}
