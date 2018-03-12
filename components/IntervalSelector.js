import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, Text } from 'react-native'

const IntervalSelector = (props) => {
  return (
    <View style={{ flexDirection: 'row', }}>

      // column 1
      <View style={{
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          marginRight: 10,
        }}>
        <Text style={styles.main_label}>Work Interval :</Text>
        <Text style={styles.main_label}>Break Interval :</Text>
      </View>

      // column 2
      <View style={{flex: 1}}>
        // row 1
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <TextInput
            keyboardType={'numeric'}
            defaultValue={props.default_work_interval_mins}
            style={styles.text_input}
            onChangeText={ (text) => props.update_work_interval_mins(text) }>
          </TextInput>

          <Text> mins </Text>

          <TextInput
            keyboardType={'numeric'}
            defaultValue={props.default_work_interval_secs}
            style={styles.text_input}
            maxLength={2}
            onChangeText={ (text) => props.update_work_interval_secs(text) }>
          </TextInput>

          <Text> secs</Text>
        </View>
        // row 2
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <TextInput
            keyboardType={'numeric'}
            defaultValue={props.default_break_interval_mins}
            style={styles.text_input}
            onChangeText={ (text) => props.update_break_interval_mins(text) }>
          </TextInput>

          <Text> mins </Text>

          <TextInput
            keyboardType={'numeric'}
            defaultValue={props.default_break_interval_secs}
            style={styles.text_input}
            maxLength={2}
            onChangeText={ (text) => props.update_break_interval_secs(text) }>
          </TextInput>

          <Text> secs</Text>
        </View>
      </View>

    </View>
  )
}

IntervalSelector.propTypes = {
  update_work_interval_mins: PropTypes.func.isRequired,
  update_work_interval_secs: PropTypes.func.isRequired,
  update_break_interval_mins: PropTypes.func.isRequired,
  update_break_interval_secs: PropTypes.func.isRequired,
  default_work_interval_mins: PropTypes.string.isRequired,
  default_work_interval_secs: PropTypes.string.isRequired,
  default_break_interval_mins: PropTypes.string.isRequired,
  default_break_interval_secs: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  text_input: {
    height: 30,
    width: 40,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: 'grey',
  },
  main_label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default IntervalSelector
