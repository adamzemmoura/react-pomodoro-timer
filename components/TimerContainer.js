import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import IntervalSelector from './IntervalSelector.js'
import Timer from './Timer.js'

export default class TimerContainer extends Component {

  state = {
    work_interval_mins: 25,
    work_interval_secs: 0,
    break_interval_mins: 5,
    break_interval_secs: 0,
    show_interval_selector: true,
  }

  updateWorkIntervalMins = (mins) => {
    if (parseInt(mins) >= 0) {
      this.setState({ work_interval_mins: mins })
    }
  }

  updateWorkIntervalSecs = (secs) => {
    if (parseInt(secs) >= 0) {
      this.setState({ work_interval_secs: secs })
    }
  }

  updateBreakIntervalMins = (mins) => {
    if (parseInt(mins) >= 0) {
      this.setState({ break_interval_mins: mins })
    }
  }

  updateBreakIntervalSecs = (secs) => {
    if (parseInt(secs) >= 0) {
      this.setState({ break_interval_secs: secs })
    }
  }

  calculateWorkInterval = () => {

    mins = parseInt(this.state.work_interval_mins)
    secs = parseInt(this.state.work_interval_secs)
    return mins * 60 + secs
  }

  calculateBreakInterval = () => {
    mins = parseInt(this.state.break_interval_mins)
    secs = parseInt(this.state.break_interval_secs)
    return mins * 60 + secs
  }

  render() {
    if (this.state.show_interval_selector) {
      return (
        <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <IntervalSelector style={{flex: 1, alignItems: 'center'}}
            default_work_interval_mins={`${this.state.work_interval_mins}`}
            default_work_interval_secs={`${this.state.work_interval_secs}`}
            default_break_interval_mins={`${this.state.break_interval_mins}`}
            default_break_interval_secs={`${this.state.break_interval_secs}`}
            update_work_interval_mins={this.updateWorkIntervalMins}
            update_work_interval_secs={this.updateWorkIntervalSecs}
            update_break_interval_mins={this.updateBreakIntervalMins}
            update_break_interval_secs={this.updateBreakIntervalSecs}
            text_color={this.props.text_color}
          />
        </View>

          <View style={{flex: 3,}}>
            <Timer
              work_interval={this.calculateWorkInterval()}
              break_interval={this.calculateBreakInterval()}
              changeBackgroundColor={this.props.changeBackgroundColor}
              text_color={this.props.text_color}
            />
          </View>

        </View>
      )
    }
    else {
      return (
        <Timer
          style={{flex: 1, alignItems: 'center'}}
          work_interval={this.calculateWorkInterval()}
          break_interval={this.calculateBreakInterval()}
          changeBackgroundColor={this.props.changeBackgroundColor}
          text_color={this.props.text_color}
        />
      )
    }

  }

}
