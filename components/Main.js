import React from 'react'
import { playerFromMIDIBuffer } from 'hackmidi'
import { Divider, Grid, Segment } from 'semantic-ui-react'

import Player from './Player'
import Editor from './Editor'
import Library from './Library'
import Loader from './Loader'

export default class Main extends React.Component {
  constructor () {
    super()
    // localStorage.clear()
    this.state = Object.assign(JSON.parse(localStorage.getItem('state')) || {
      library: {}
    }, {
      selected: null,
      track: null,
      activity: {
        track: null,
        playing: false,
        duration: 0,
        position: 0
      }
    })
    this.player = null
  }
  saveState () {
    localStorage.setItem('state', JSON.stringify({
      library: this.state.library
    }))
  }
  resetActivity () {
    this.setState({
      activity: {
        track: null,
        playing: false,
        duration: 0,
        position: 0
      }
    })
  }
  playerListener (position, playing) {
    const activity = this.state.activity
    activity.position = position
    activity.playing = playing
    this.setState({ activity })
    if (position === activity.duration) this.playOffset(1)
    console.log(activity)
  }
  componentDidUpdate () {
    // console.log(this.state.activity)
  }
  prepareTrack (track, play) {
    if (this.player) {
      this.player._node.context.close()
      this.player.destroy()
      this.player = null
    }
    fetch(track.data)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        return playerFromMIDIBuffer(buffer, 'samples/')
      })
      .then(player => {
        this.player = player
        player.addChangeListener((position, playing) => this.playerListener(position, playing))
        this.setState({
          activity: {
            track: track,
            playing: false,
            position: 0,
            duration: player.getDuration()
          }
        })
        if (play) player.play()
      })
  }
  selectTrack (track) {
    if (track !== this.state.selected) {
      this.setState({
        selected: track
      })
    }
  }
  updateSelected (data) {
    Object.assign(this.state.selected, data)
    this.setState({ library: this.state.library })
    this.saveState()
  }
  addTrack (track) {
    const library = this.state.library
    library[track.id] = track
    this.setState({ library })
    this.saveState()
  }
  deleteTrack (track) {
    const library = this.state.library
    delete library[track.id]
    if (track === this.state.selected) {
      this.setState({ selected: null })
    }
    if (track === this.state.activity.track) {
      this.player._node.context.close()
      this.player.destroy()
      this.player = null
      this.resetActivity()
    }
    this.setState({ library })
    this.saveState()
  }
  play () {
    if (this.player) {
      this.player.play()
    } else {
      this.playOffset(0)
    }
  }
  seek (position) {
    if (this.player) {
      this.player.seek(position)
    }
  }
  playOffset (offset) {
    const tracks = Object.values(this.state.library)
    if (this.state.activity.track) {
      const i = Object.keys(this.state.library).indexOf(this.state.activity.track.id)
      if (tracks[i + offset]) this.prepareTrack(tracks[i + offset], true)
    } else {
      if (tracks.length) this.prepareTrack(tracks[0], true)
    }
  }
  render () {
    const style = {
      background: '#1B1C1D',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    return (
      <div style={style}>
        <Segment inverted>
          <Grid columns='two' stackable>
            <Grid.Row>
              <Grid.Column>
                <Player
                  activity={this.state.activity}
                  onPlay={() => this.play()}
                  onPause={() => this.player && this.player.pause()}
                  onPrevious={() => this.playOffset(-1)}
                  onNext={() => this.playOffset(1)}
                  onSeek={position => this.seek(position)}
                />
              </Grid.Column>
              <Grid.Column verticalAlign='bottom' textAlign='right'>
                <Loader onTrackLoaded={track => this.addTrack(track)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Grid columns='two' stackable>
            <Grid.Row>
              <Grid.Column>
                <Library
                  list={this.state.library}
                  playing={this.state.activity.track}
                  onClickTrack={track => this.selectTrack(track)}
                  onDoubleClickTrack={track => this.prepareTrack(track, true)}
                  onDeleteTrack={track => this.deleteTrack(track)}
                />
              </Grid.Column>
              <Grid.Column>
                {this.state.selected &&
                  <Editor track={this.state.selected} onFieldChange={data => this.updateSelected(data)} />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}
