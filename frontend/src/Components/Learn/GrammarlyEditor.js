import React, { useCallback } from 'react'
import { GrammarlyEditorPlugin, Grammarly } from '@grammarly/editor-sdk-react'
import { MyButton } from 'styles/Button'

export function GrammarlyEditor({ script, next }) {
  const onNext = useCallback(() => {
    next()
  },[])
  return (
    <Grammarly
      clientId="leesk3732"
      config={{
        oauth: { redirectUri: 'example://grammarly-auth/' },
      }}
    >
      <GrammarlyEditorPlugin>
        <textarea value={script} rows={3} cols={50}></textarea>
        <MyButton onClick={onNext}>다음</MyButton>
        <grammarly-button></grammarly-button>
      </GrammarlyEditorPlugin>
    </Grammarly>
  )
}
