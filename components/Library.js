import React from 'react'
import { Icon, List } from 'semantic-ui-react'

export default ({ inverted, list, playing, onClickTrack, onDoubleClickTrack, onDeleteTrack }) => (
  <List divided inverted={inverted} selection>
    {Object.values(list).map(track => (
      <List.Item
        key={track.id}
        onClick={event => onClickTrack(track)}
        onDoubleClick={event => onDoubleClickTrack(track)}
      >
        <List.Content>
          <List.Header>
            <Icon name='play' style={{
              visibility: track === playing ? 'visible' : 'hidden'
            }} />
            {track.artist ? track.artist + ' - ' : ''}
            {track.title}
            {track.album ? ' - ' + track.album : ''}
            <Icon style={{float: 'right'}} name='delete'
              onClick={event => {
                event.stopPropagation()
                onDeleteTrack(track)
              }}
            />
          </List.Header>
        </List.Content>
      </List.Item>
    ))}
  </List>
)
