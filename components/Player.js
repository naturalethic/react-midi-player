import 'react-rangeslider/lib/index.css'
import React from 'react'
import { Button } from 'semantic-ui-react'
import Slider from 'react-rangeslider'

import { secondsToMinutes } from '../lib/time'

export default ({ activity, onPlay, onPause, onPrevious, onNext, onSeek }) => (
  <div>
    <div style={{ textAlign: 'center', paddingBottom: '.2em' }}>
      {activity.track
        ? <span>
          {activity.track.artist ? activity.track.artist + ' - ' : ''}
          {activity.track.title}
          {activity.track.album ? ' - ' + activity.track.album : ''}
        </span> : <span>&nbsp;</span>}
    </div>
    <div>
      <div style={{ float: 'left', marginTop: '1.15em', marginRight: '1.5em' }}>
        {secondsToMinutes(activity.position)}
      </div>
      <Slider
        min={0}
        max={activity.duration}
        value={activity.position}
        format={secondsToMinutes}
        onChange={onSeek}
      />
      <div style={{ float: 'left', marginTop: '1.15em', marginLeft: '1.4em' }}>
        {secondsToMinutes(activity.duration - activity.position)}
      </div>
    </div>
    <div style={{ clear: 'both' }}></div>
    <div>
      <div style={{ float: 'left', marginRight: '3.5em' }}>
          &nbsp;
      </div>
      <div style={{ textAlign: 'center', width: '70%', float: 'left' }}>
        <Button icon='backward' onClick={onPrevious} />
        {!activity.playing &&
          <Button icon='play' onClick={onPlay} />
        }
        {activity.playing &&
          <Button icon='pause' onClick={onPause} />
        }
        <Button icon='forward' onClick={onNext} />
      </div>
    </div>
  </div>
)
