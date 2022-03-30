import React, { useEffect, useState } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
export function Learn() {
  const [fileImage, setFileImage] = useState('')
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)
  const [record_1, setRecord_1] = useState('')
  const [record_2, setRecord_2] = useState('')
  const [script, setScript] = useState('')
  function next() {
    setStage(stage+1)
  }
  return (
    <div>
      {fileImage}
      {stage === 0 && (
        <ImageUpload
          setFileImage={setFileImage}
          setImageId={setImageId}
          next={next}
        />
      )}
      {stage >= 1 && (
        <>
          <AudioRecord
            setScript={setScript}
            next={next}
            setRecord={setRecord_1}
          />
          <audio src={record_1}></audio>
        </>
      )}
      {stage >= 2 && (
        <>
          <AudioRecord
            setScript={setScript}
            next={next}
            setRecord={setRecord_2}
          />
          <audio src={record_2}></audio>
        </>
      )}

      {stage >= 3 && <GrammarlyEditor script={script} stage={stage} />}
    </div>
  )
}
