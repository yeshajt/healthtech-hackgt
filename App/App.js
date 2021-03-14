/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 /*

import React from 'react';  
import { View, Text, Button } from 'react-native';  
import { createStackNavigator, createAppContainer } from 'react-navigation';  
  
class HomeScreen extends React.Component {  
    render() {  
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>Home Screen</Text>  
                <Button  
                    title="Go to Profile"  
                    onPress={() => this.props.navigation.navigate('Profile')}  
                />  
            </View>  
        );
    }  
}  
class ProfileScreen extends React.Component {  
    render() {  
        return (  
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>  
                <Text>Profile Screen</Text>  
            </View>  
    );  
    }  
}  
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: ProfileScreen  
    },  
    {  
        initialRouteName: "Home"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        // return <AppContainer />;  
    }  
}  
*/
 
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
  ViewPager
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Divider } from '@material-ui/core';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  const [text, onChangeText] = React.useState('Some text')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <ViewPager initialPage={0}>
            
            <View key="0">
              <Text>Username:</Text>
              <TextInput
                      style={styles.textInput}
                      onChangeText={onChangeText}
                      placeholder={"Username"}
                    />
              <Text>Password:</Text> 
              <TextInput
                      style={styles.textInput}
                      onChangeText={onChangeText}
                      placeholder={"Password"}
                    />
              <Button
                title="Login"
                onPress={() => Alert.alert("Button pressed")}
                />

              <Button
                title="Sign up"
                onPress={() => handlePageChange(1)}
              />
            </View>

            <View key="1">
              <Text>yay!!</Text>
            </View>

          </ViewPager>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    height: 40,
    width: '50%',
    borderWidth: 1,
    margin: 5
  }
});

export default App;
