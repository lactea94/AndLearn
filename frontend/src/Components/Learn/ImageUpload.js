import React, { useState } from 'react'

export function ImageUpload() {
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
      ImageUpload
      {/* <img width={180} height={160} src={image} /> */}
      <button>사진 업로드</button>
      <button>랜덤사진</button>
      <button>시작!</button>
    </div>
  )
}
