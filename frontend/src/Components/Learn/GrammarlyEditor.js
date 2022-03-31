import React, { useCallback } from 'react'
import { GrammarlyEditorPlugin, Grammarly } from '@grammarly/editor-sdk-react'

export function GrammarlyEditor({ script, next }) {
  const onNext = useCallback(() => {
    next()
  },[script])
  return (
    <Grammarly
      clientId="leesk3732"
      config={{
        oauth: { redirectUri: 'example://grammarly-auth/' },
      }}
    >
      <GrammarlyEditorPlugin>
        <textarea defaultValue={script} rows={3} cols={50}></textarea>
        <grammarly-button></grammarly-button>
      </GrammarlyEditorPlugin>
      <button onClick={onNext}>다음</button>
    </Grammarly>
  )
}
