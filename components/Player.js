import 'react-rangeslider/lib/index.css'
import React from 'react'
import { Button } from 'semantic-ui-react'
import Slider from 'react-rangeslider'

import { secondsToMinutes } from '../lib/time'

export default ({ activity, onPlay, onPause, onPrevious, onNext, onSeek }) => (
  <div>
    <div style={{ textAlign: 'center', paddingBottom: '.2em' }}>
      {activity.track ? <span>{activity.track.title}</span> : <span>&nbsp;</span>}
    </div>
    <div style={{  }}>
      <div style={{ float: 'left', marginTop: '1.15em', marginRight: '2em'}}>
        {secondsToMinutes(activity.position)}
      </div>
      <Slider
        min={0}
        max={activity.duration}
        value={activity.position}
        format={secondsToMinutes}
          // onChangeStart={this.handleChangeStart}
        onChange={onSeek}
          // onChangeComplete={this.handleChangeComplete}
        />
      <div style={{ float: 'left', marginTop: '1.15em', marginLeft: '1em'}}>
        {secondsToMinutes(activity.duration)}
      </div>
    </div>
    <div style={{ clear: 'both', textAlign: 'center' }}>
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
)
