import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from 'react-native-community/picker'
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class extends React.Component {
  render() {
    const title = this.props.title || 'No Title';
    const data = this.props.data || 'No Data';
    return (
      <View style={styles.container}>
        <Text>Create Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Username"}
          onChangeText={text => {
            console.log("here")
          }}
        />
        <Text>Create Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Password"}
          onChangeText={text => {
            console.log("here")
          }}
        />

        <Text>Age</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="18" value="18"></Picker.Item>
            <Picker.Item label="19" value="18"></Picker.Item>
            <Picker.Item label="20" value="18"></Picker.Item>
            <Picker.Item label="21" value="18"></Picker.Item>
          </Picker>

          <Text>Allergies</Text>

          <Text>Dietary Restrictions</Text>

          <Text>Starting Diet</Text>

          <Text>Goal Diet</Text>

          <Text>Budget Per Meal</Text>




        
        {/* <Text>Login page 2</Text>
        <Text>Title: {title}</Text>
        <Text>Data: {data}</Text>
        <Button
          onPress={() =>
            Actions.loginModal3({data: 'Custom data3', title: 'Custom title3'})
          }>
          Login 3
        </Button> */}
      </View>
    );
  }
}
