import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import TimerContainer from './components/TimerContainer.js'

export default class App extends React.Component {

  state = {
    background_color: styles.bg_white,
  }

  changeBackgroundColor = (color) => {
    backgroundStyle = styles.bg_white
    switch (color) {
      case 'green':
        backgroundStyle = styles.bg_green
        textColor = 'white'
        break
      case 'red':
        backgroundStyle = styles.bg_red
        textColor = 'white'
        break;
    }
    this.setState({
      backgroundColor: backgroundStyle
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View style={[styles.app_container, this.state.backgroundColor]}>
          <TimerContainer
            changeBackgroundColor={this.changeBackgroundColor}
            />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  bg_white:{
    backgroundColor: 'white',
  },
  bg_green: {
    backgroundColor: 'green',
  },
  bg_red: {
    backgroundColor: 'red',
  },
});
