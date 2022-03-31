import React, { useEffect, useState } from 'react'
import { ImageUpload } from './ImageUpload.js'
import { AudioRecord } from './AudioRecord'
import { GrammarlyEditor } from './GrammarlyEditor'
export function Learn() {
  const [fileImage, setFileImage] = useState('')
  const [imageId, setImageId] = useState('')
  const [stage, setStage] = useState(0)

  const [audioUrl1, setAudioUrl1] = useState()
  const [aud1, setAud1] = useState()

  const [audioUrl2, setAudioUrl2] = useState()
  const [aud2, setAud2] = useState()

  const [script1, setScript1] = useState('')
  const [script2, setScript2] = useState('')
  function next() {
    setStage(stage + 1)
    console.log(stage)
  }

  return (
    <div>
      <img src={fileImage} />
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
            setScript={setScript1}
            next={next}
            setAudioUrl1={setAudioUrl1}
            setAud1={setAud1}
          />
          {aud1 && (
            <audio controls src={aud1} controlsList="nodownload"></audio>
          )}
        </>
      )}

      {stage >= 2 && (
        <GrammarlyEditor script={script1} stage={stage} next={next} />
      )}

      {stage >= 3 && (
        <>
          <AudioRecord
            setScript={setScript2}
            next={next}
            setAudioUrl1={setAudioUrl2}
            setAud1={setAud2}
          />
          {aud2 && (
            <audio controls src={aud2} controlsList="nodownload"></audio>
          )}
        </>
      )}
      {stage >= 4 && (
        <GrammarlyEditor script={script2} stage={stage} next={next} />
      )}
    </div>
  )
}
