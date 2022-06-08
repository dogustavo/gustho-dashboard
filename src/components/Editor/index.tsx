import { useRef } from 'react'
import JoditEditor from 'jodit-react'

import './styles.css'

const config = {
  readonly: false,
  placeholder: 'Start typings...',
  buttons: ['bold', 'italic', 'underline', 'ul', 'fontsize'],
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false
}

interface IEditor {
  content: string
  setContent: (evt: string) => void
}

export default function MyEditor({ content, setContent }: IEditor) {
  const editor = useRef(null)

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
    />
  )
}
