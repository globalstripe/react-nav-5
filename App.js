import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
// import { AppRegistry, Platform, StyleSheet, Button, StatusBar, Text, View } from 'react-native';
import { 
  AppRegistry, 
  Platform, 
  Image, 
  StyleSheet, 
  Button, 
  Text, 
  View,
  TouchableHighlight,
  TouchableOpacity, 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';

// import Video from 'react-native-video';
import { Audio, Video } from 'expo-av';

//import Banner from './Banner'
//import Row from './Row'
//import requests from './requests'

function HomeScreen({ navigation }) {
  return (
  <View style={styles.container}>
   
    <Text style={[styles.setFontSize,styles.setColorWhite]}>Home Screen</Text>
    <Text style={[styles.setFontSize,styles.setColorWhite]}>Hello there!</Text> 
    <Text style={[styles.setFontSize,styles.setColorWhite]}>...</Text>

    <Button title="30 Day Abs Challenge" onPress={() => { 
      navigation.navigate('Details', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
    }}
    /> 
    <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')}/> 
    <Button title="Videos" onPress={() => navigation.navigate('Video')}/> 
    <Button title="Tears" onPress={() => navigation.navigate('Tears')}/> 
    <Button title="RTE News Now!" onPress={() => navigation.navigate('News')}/> 

    <StatusBar style='auto' />

  </View>
  );
}

function DetailsScreen({route, navigation }) {

  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top' }}>
      <Text>Details Screen</Text>
      
      <TouchableHighlight onPress={() => navigation.navigate('Video')}>
      <Image
        style={styles.ABSImage}
        source={{
          uri: 'https://www.christinacarlyle.com/wp-content/uploads/2025/08/30-day-Ab-Challenge-for-Women-Christina-Carlyle.png',
        }}
       
      />
      </TouchableHighlight>
      
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')}/> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function VideoScreen({ navigation }) {
  return (

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

 <Text>Todays Video</Text>
 <TouchableOpacity onPress={() => navigation.navigate('Tears')}>

 <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={{ width: 440, height: 300 }}
 />
 </TouchableOpacity>
        
     {//   <WebView
      //  originWhitelist={['*']}
      //  source={{ html: '<h1>Hello world</h1>' }}
      //  style={{ marginTop: 20 , color: '#2196f3'}}
      }
      
     
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function TearsVideo({ navigation }) {

  React.useEffect(() => {
    const enableAudio = async () => {
        await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      })
    }
    enableAudio()
  }, [])

  return (

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

 <Text>Apple HLS Video</Text>
 <TouchableOpacity onPress={() => navigation.navigate('Home')}>

 <Video
  source={{ uri: 'http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={{ width: 400, height: 300 }}
 />
 </TouchableOpacity>
        
     {//   <WebView
      //  originWhitelist={['*']}
      //  source={{ html: '<h1>Hello world</h1>' }}
      //  style={{ marginTop: 20 , color: '#2196f3'}}
      }
      
     
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function RTENews({ navigation }) {

  React.useEffect(() => {
    const enableAudio = async () => {
        await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      })
    }
    enableAudio()
  }, [])

  return (

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

 <Text>Apple HLS - Live</Text>

 

 <Video
  source={{ uri: 'https://live.rte.ie/live/b/channel3/news.isml/.m3u8?dvr_window_length=30' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay={true}
  style={{ width: 400, height: 300 }}
  //useNativeControls={true}
  ignoreSilentSwitch="ignore"
 />
        
     {//   <WebView
      //  originWhitelist={['*']}
      //  source={{ html: '<h1>Hello world</h1>' }}
      //  style={{ marginTop: 20 , color: '#2196f3'}}
      }
      
     
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

// http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8


const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: true
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      // this.loadAudio()
    } catch (e) {
      console.log(e)
    }

    try {
      await Video.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

     // this.loadVideo()
    } catch (e) {
      console.log(e)
    }


  }

  render() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Video" component={VideoScreen} />
          <Stack.Screen name="Tears" component={TearsVideo} />
          <Stack.Screen name="News" component={RTENews} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  setFontSize: {
    fontSize: 15,
    fontWeight : 'bold' 
  },
  setColorWhite : {
    color: '#ffffff'
  },
  setColorRed : {
    color: '#f44336'
  },
  setColorPink :{
    color: '#e91e63'
  },
  setColorPurple :{
    color: '#9c27b0'
  },
  setColorBlue :{
    color: '#2196f3'
  },

  tinyLogo: {
    width: 50,
    height: 50,
  },

  ABSImage: {
    width: 400,
    height: 950,
  },

  logo: {
    width: 66,
    height: 58,
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});

