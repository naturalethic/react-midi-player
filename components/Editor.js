import React from 'react'
import { Form } from 'semantic-ui-react'

export default ({ track, onFieldChange }) => (
  <Form inverted>
    <Form.Field>
      <label>Title</label>
      <input
        value={track.title}
        onChange={event => onFieldChange({ title: event.target.value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Album</label>
      <input
        value={track.album}
        onChange={event => onFieldChange({ album: event.target.value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Artist</label>
      <input
        value={track.artist}
        onChange={event => onFieldChange({ artist: event.target.value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Source File Name</label>
      {track.sourceName}
    </Form.Field>
    <Form.Field>
      <label>Size</label>
      {track.size}
    </Form.Field>
  </Form>
)
