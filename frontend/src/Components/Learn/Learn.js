import React, { useState } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
export function Learn() {
  const [fileImage, setFileImage] = useState('')

  const [script, setScript] = useState('')

  return (
    <div>
      Learn
      <ImageUpload fileImage={fileImage} />
      <AudioRecord setScript={setScript} />
      <GrammarlyEditor script={script} />
    </div>
  )
}
