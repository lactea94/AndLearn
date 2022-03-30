import React from 'react'
import { GrammarlyEditorPlugin, Grammarly } from '@grammarly/editor-sdk-react'


export function GrammarlyEditor(script) {

  return (
    <Grammarly
      clientId="leesk3732"
      config={{
        oauth: { redirectUri: 'example://grammarly-auth/' },
      }}
    >
      <GrammarlyEditorPlugin>
        <textarea defaultValue={script.script} rows={10}></textarea>
        <grammarly-button></grammarly-button>
      </GrammarlyEditorPlugin>
    </Grammarly>
  )
}
