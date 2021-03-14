import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  textInput: {
    borderWidth: 1,
    height: 40,
    width: '50%',
    margin: 10
  },
  label: {
    margin: 10,

  }

});

export default class extends React.Component {
  render() {
    const title = this.props.title || 'No Title';
    const data = this.props.data || 'No Data';
    return (
      <View style={styles.container}>
        <Text 
          style={styles.label}>
            Create Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Username"}
          onChangeText={text => {
            console.log("here")
          }}
        />
        <Text
          style={styles.label}
        >Create Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Password"}
          onChangeText={text => {
            console.log("here")
          }}
        />

        <Text
        style={styles.label}>
          Age</Text>

          <TextInput
          style={styles.textInput}
          placeholder={"Age"}
          onChangeText={text => {
            console.log("here")
          }}
        />
          
      </View>


      /* <View style={styles.container}>
        <Text>Login page 2</Text>
        <Text>Title: {title}</Text>
        <Text>Data: {data}</Text>
        <Button
          onPress={() =>
            Actions.loginModal3({data: 'Custom data3', title: 'Custom title3'})
          }>
          Login 3
        </Button>
      </View> */
    );
  }
}
