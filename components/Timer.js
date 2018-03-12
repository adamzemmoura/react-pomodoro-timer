import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Vibration, StyleSheet, Button, Alert, Text } from 'react-native'

export default class Timer extends Component {

  static propTypes = {
    work_interval: PropTypes.number.isRequired,
    break_interval: PropTypes.number.isRequired,
    changeBackgroundColor: PropTypes.func.isRequired,
  }

  state = {
      countdown_current: this.props.work_interval,
      timer_running: false,
      timer_stopped: true,
      is_work_interval: true,
      timer_label: "WORK TIMER",
      text_color: 'black',
  }

  componentWillReceiveProps(nextProps){
    if (this.state.is_work_interval) {
      if (this.props.work_interval !== nextProps.work_interval) {
        this.setState({countdown_current: nextProps.work_interval})
      }
    } else {
      if (this.props.break_interval !== nextProps.break_interval) {
        this.setState({countdown_current: nextProps.break_interval})
      }
    }
  }

  render() {

    timer_label = this.state.is_work_interval ? "WORK TIMER" : "BREAK TIMER"
    timer_current = this.state.countdown_current
    start_stop_button_title = this.state.timer_running ? "Stop Timer" : "Start Timer"
    enable_reset_button = this.state.timer_running
    reset_button_text_color = 'blue'

    if (this.state.is_work_interval) {
      enable_reset_button = (this.state.countdown_current < this.props.work_interval)
      reset_button_text_color = 'white'
    }
    else {
      enable_reset_button = true
      reset_button_text_color = 'white'
    }

    return (

      <View style={{alignItems: 'center'}}>
        <Text style={{
            fontSize: 50,
            color: this.state.text_color,
          }}>{ timer_label }
        </Text>
        <Text style={{
            fontSize: 80,
            color: this.state.text_color,
          }}>{ this.formatTimeFromSeconds(timer_current) }
        </Text>

        <View style={ [styles.bg_blue, styles.button_wrapper] }>
          <Button
            color="white"
            title={start_stop_button_title}
            onPress={() => { this.toggleTimer()}}>
          </Button>
        </View>

        <Button
          disabled={!enable_reset_button}
          color={reset_button_text_color}
          title="Reset"
          onPress={ this.resetTimer }>
        </Button>
      </View>

    )
  }

  formatTimeFromSeconds = (seconds) => {
    mins = Math.floor(seconds / 60)
    secs = seconds % 60
    return `${mins >= 10 ? '' : 0}${mins}:${secs <= 9 ? 0 : ''}${secs >= 0 ? secs : ''}`
  }

  setTextColor(color) {
    default_color = 'black'
    if (color === 'white') {
      this.setState({text_color: color})
    } else {
      this.setState({text_color: default_color})
    }
  }

  resetTimer = () => {

    this.setState({
      countdown_current: this.props.work_interval,
      is_work_interval: true,
      timer_running: false,
      timer_stopped: true,
      timer_label: "WORK TIMER",
    })

    if (this.state.timer_running) {
      clearInterval(this.interval)
    }

    this.props.changeBackgroundColor('white')
    this.setTextColor('black')
  }

  toggleTimer = () => {

    this.setTextColor('white')

    if (this.state.timer_running){
      // stop timer
      clearInterval(this.interval)
    }
    else {
      // start timer
      this.interval = setInterval(this.decrementTimer, 1000)
    }
    this.setState(prevState => ({
      timer_running: !prevState.timer_running,
      timer_stopped: !prevState.timer_stopped,
      timer_label: prevState.is_work_interval ? "WORK TIMER" : "BREAK TIMER",
    }))

    this.state.is_work_interval ? this.props.changeBackgroundColor('green') : this.props.changeBackgroundColor('red')

  }

  decrementTimer = () => {
    // check if timer reached zero

    if (this.state.countdown_current === 0) {
      // stop timer, alert user & vibrate
      this.toggleTimer()
      this.alertUserTimerDidEnd()
      Vibration.vibrate([500, 500, 500])
      return
    }

    this.setState(prevState => ({
      countdown_current: prevState.countdown_current - 1
    }))
  }

  alertUserTimerDidEnd = () => {
    alert_title = this.state.is_work_interval ? 'Time for a break! 🎉' : 'Let\'s get back to work! 💪'
    button_title = this.state.is_work_interval ? 'Start Break' : 'Start Work'
    next_interval = this.state.is_work_interval ? this.props.break_interval : this.props.work_interval

    Alert.alert(
      alert_title,
      '',
      [
        {text: button_title, onPress: () => {
          this.setState( prevState => ({
            is_work_interval: !prevState.is_work_interval,
            countdown_current: next_interval,
          }))
          // restart timer
          this.toggleTimer()
        }},
      ],
      { cancelable: false }
    )
  }

}

const styles = StyleSheet.create({
  bg_blue: {
    backgroundColor: 'blue',
  },
  button_wrapper: {
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    width: 150,
  },
});
