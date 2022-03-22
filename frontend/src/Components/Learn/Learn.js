import React, { useState } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'

export function Learn() {
  const [fileImage, setFileImage] = useState('')
  function onLoad(e) {
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      Learn
      <ImageUpload fileImage={fileImage} />
      <AudioRecord />
    </div>
  )
}
