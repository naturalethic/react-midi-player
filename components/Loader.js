import React from 'react'
import { Button } from 'semantic-ui-react'

function loadFile (file, then) {
  if (file.type !== 'audio/midi') return
  const reader = new FileReader()
  reader.addEventListener('loadend', () => {
    then({
      id: String(Math.random()),
      sourceName: file.name,
      title: file.name,
      album: '',
      artist: '',
      size: file.size,
      data: reader.result
    })
  })
  reader.readAsDataURL(file)
}

export default ({ inverted, onTrackLoaded }) => (
  <div>
    <input multiple
      style={{ display: 'none' }}
      type='file' accept='.mid,.midi'
      onChange={event => {
        for (const file of event.target.files) {
          loadFile(file, onTrackLoaded)
        }
      }}
    />
    <Button inverted={inverted} onClick={event => event.target.previousSibling.click()}>Add Files</Button>
  </div>
)
