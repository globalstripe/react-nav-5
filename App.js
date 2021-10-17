import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { AppRegistry, Platform, Image, StyleSheet, 
  Button, Text, View, TouchableHighlight,TouchableOpacity, 
  SafeAreaView, ScrollView,Linking 
} 
from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator, TransitionSpecs,TransitionPresets} 
from '@react-navigation/stack';

import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';

import {WebView} from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';

// import Video from 'react-native-video';

import { Audio, Video } from 'expo-av';
import { BlurView } from 'expo-blur';

import { NetworkUtils, NetworkError } from './networkUtils';

import axios from './axios';

const base_url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Spinal%20Tap&type=trailer&key=AIzaSyBOb-HeB2dOb3CadR3N9dOlNzuNp3VMlu4"
const query_urlZZ = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Spinal%20Tap&type=trailer&key=AIzaSyBOb-HeB2dOb3CadR3N9dOlNzuNp3VMlu4"
const APIKEY = 'AIzaSyBOb-HeB2dOb3CadR3N9dOlNzuNp3VMlu4'
const query_url = 'https://content.guardianapis.com/search?api-key=04509637-9231-418c-b242-e4fb6912afd1&show-fields=thumbnail&page-size=20'
const guardian_APIKEY = '04509637-9231-418c-b242-e4fb6912afd1'

// import NativeAdView, {
//   CallToActionView,
//   IconView,
//   HeadlineView,
//   TaglineView,
//   AdvertiserView,
//   AdBadge,
// } from "react-native-admob-native-ads";

//import Banner from './Banner'
//import Row from './Row'
//import requests from './requests'

// Transition/Anomation Config

const config = {
  animation: 'spring',
  config: {
    stiffness: 150,
    damping: 100,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>

<Header 

backgroundColor='#aab'
leftComponent={<Icon name="menu" onPress={() => navigation.navigate('Tears')}/>}
// onPress={() => this.props.navigation.openDrawer()}
placement="center"
centerComponent={{ text: 'Home', style: { color: '#fff' } }}
rightComponent={<Icon name="home" onPress={() => navigation.navigate('Home')}/>}
/>
    <ScrollView >

  <View style={styles.container}>

{/*     <Text style={[styles.setFontSize,styles.setColorWhite]}>Home Screen</Text>
    <Text style={[styles.setFontSize,styles.setColorWhite]}>Hello there!</Text>  */}

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
    <Button title="News Listing!" onPress={() => navigation.navigate('NewsListing')}/>  
    <Button title="Webflow Listing!" onPress={() => navigation.navigate('WebflowListing')}/>  

 {/*    <Text style={styles.text}>
          Axios Demo - Guardian + Webflow + APIGW
  
    </Text> */}

    <StatusBar style='auto' />


  </View>
  </ScrollView>
  </SafeAreaView>
  );
}


function NewsListing({ navigation })  {

  const [apiResponse, setResponseData] = useState([]);

  console.log("Entered Guardian Data API Function:")
  
  // A snippet of code that runs under a specific conditional variable
  useEffect(() => {
      // if we leave [] blank ... run once when the row loads and do not run again
      // it is a dependancy on  movies changing or not.

      async function fetchData() {
          //console.log(fetchUrl)


          console.log("Async Function - Fetch Data Running: " + Date())
          const netResult = await NetworkUtils.checkNetwork(false, false);

          console.log("Network Status: ", netResult)

          console.log("Did Pass: " + netResult.didPass)
          console.log("Connected: " + netResult.netState.isConnected)
          console.log("Wifi Enabled: " + netResult.netState.isWifiEnabled)
          console.log("Type: " + netResult.netState.type)
          console.log("Internet Reachable: " + netResult.netState.isInternetReachable)

          const request = await axios.get(query_url);
          console.log("Axios Query RAN")
          setResponseData(request.data.response.results)
          //setVideos(request.data.items);
          //console.log('***************************************************')
          //console.log('Request', request.data.response.results)
          //console.log('***************************************************')
          //console.log(new Date())
          //console.log('***************************************************')
          //console.log("PageInfo: ", request.data.pageInfo)
          //console.log("Item: ", request.data.items[1].kind)
          console.log("Status:", request.status)
          //console.log("Request:", request)
          //console.log("Headers:", request.headers)
          console.log("Status:", request.data.response.status)
          ///console.log("Example Data Item:", request.data.response.results[1].webTitle)
          //console.log("Thumbnail:", request.data.response.results[1].fields.thumbnail)
          // return request;
      }

      fetchData();

  }, [query_url]);

  return (
    
    <SafeAreaView>

<Header 
style={styles.HeaderStyles}
backgroundColor='#aab'
leftComponent={<Icon name="menu" onPress={() => navigation.navigate('Tears')}/>}
// onPress={() => this.props.navigation.openDrawer()}
placement="center"
centerComponent={{ text: 'Home', style: { color: '#fff' } }}
rightComponent={<Icon name="home" onPress={() => navigation.navigate('Home')}/>}
/>

    { /* <Text style={styles.setColorWhite}>Here is our news Listing</Text>  */}

      <ScrollView vertical={true} showsVerticalScrollIndicator={false} > 

            { /* Map over the array returned by the API call */}

                {apiResponse.map( (apiData, index) => (
            
                <View key={index} >

                  { /* <Text style={styles.setColorWhite}>News Item {index}</Text>  */ }
                  { /* <Text style={styles.setColorWhite}>{apiData.webUrl}</Text>  */ }
        
                  <TouchableHighlight
                        style={styles.setColorWhite}
                        activeOpacity={0.6}
                        underlayColor="#111000"
                        onPress={ ()=>{Linking.openURL(apiData.webUrl)}} >  
                    
                        <Image style={styles.image} source={{
                        // Use ternary operator to check for undefined!
                        // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                        uri: apiData.fields === undefined ? 'https://logos-download.com/wp-content/uploads/2016/05/The_Guardian_logo_blue-700x123.jpg' : apiData.fields.thumbnail,
                        cache: 'force-cache'
                        }}
                        />

                  </TouchableHighlight>

                  <Text style={styles.title}> 
                      Category: {apiData.sectionName}{"\n"}                
                                 {apiData.webTitle}{"\n"} 
                                 {apiData.webPublicationDate}
                  </Text>

                        {/* <Text>{JSON.stringify(apiData.fields)}</Text> */}
                        {/* <Text>{apiData.fields === undefined ? "****Undefined*****" : "OK"}</Text> */}
                       
                  </View>
              
                )) 
                } 

            </ScrollView>
 
            </SafeAreaView>
  
    
  );
}


function WebflowListing({ navigation })  {

  const [apiResponse, setResponseData] = useState([]);

  console.log("Entered Webflow Data API Function:")
  
  // A snippet of code that runs under a specific conditional variable
  useEffect(() => {
      // if we leave [] blank ... run once when the row loads and do not run again
      // it is a dependancy on content changing or not.

      async function fetchData() {

          console.log("Async Function - Fetch Data Running: " + Date())
          const netResult = await NetworkUtils.checkNetwork(false, false);

          console.log("Network Status: ", netResult)

          console.log("Did Pass: " + netResult.didPass)
          console.log("Connected: " + netResult.netState.isConnected)
          console.log("Wifi Enabled: " + netResult.netState.isWifiEnabled)
          console.log("Type: " + netResult.netState.type)
          console.log("Internet Reachable: " + netResult.netState.isInternetReachable)

          // Webflow query

          let webflow_query_url = 'https://webflow.ssaisecure.net/prod/collections'
          const request = await axios.get(webflow_query_url);
          console.log("Axios Query RAN")
          //console.log('Data:', request.data)
          console.log('Count:', request.data.count)
          console.log('Items *******************************************')
          console.log('Bio:', request.data.items[1].bio)
          console.log('Summary: ' + request.['data'].items[1].['bio-summary'])
          console.log('Name:', request.data.items[1].name)
          console.log('Image:' + request.['data'].items[1].['profile-picture'].['url'])

          setResponseData(request.data.items)

          console.log("Status:", request.status)

      }

      fetchData();

  }, [query_url]);

  return (
    
    <SafeAreaView>  

    { /* <Text style={styles.setColorWhite}>Here is our news Listing</Text>  */}

      <ScrollView vertical={true} showsVerticalScrollIndicator={false} > 

            { /* Map over the array returned by the API call */}

                {apiResponse.map( (apiData, index) => (
            
                <View key={index} >

                  { /* <Text style={styles.setColorWhite}>News Item {index}</Text>  */ }
                  { /* <Text style={styles.setColorWhite}>{apiData.webUrl}</Text>  */ }
        
                  <Text style={styles.name}> 
                      Name: {apiData.name}               
                  </Text>

                  <TouchableHighlight
                        style={styles.setColorWhite}
                        activeOpacity={0.6}
                        underlayColor="#111000"
                        onPress={ ()=>{Linking.openURL(apiData.webUrl)}} >       
                    
                        <Image style={styles.image} source={{
                        // Use ternary operator to check for undefined!
                        // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                        uri: apiData.['profile-picture'].['url'] === undefined ? 
                        'https://logos-download.com/wp-content/uploads/2016/05/The_Guardian_logo_blue-700x123.jpg' : 
                        apiData.['profile-picture'].['url'],
                        cache: 'force-cache'
                        }}
                        />

                  </TouchableHighlight>

                  <Text style={styles.title}> 
                      Bio: {apiData.['bio-summary']}{"\n"}  
                      Published: {apiData.['published-on']}
                  </Text>

                        {/* <Text>{JSON.stringify(apiData.fields)}</Text> */}
                        {/* <Text>{apiData.fields === undefined ? "****Undefined*****" : "OK"}</Text> */}
                       
                  </View>
              
                )) 
                } 

            </ScrollView>
 
            </SafeAreaView>
  
    
  );
}

function DetailsScreen({route, navigation }) {

  const { itemId, otherParam } = route.params;

  return (
    <View style={styles.top}>
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
    <View style={styles.container}>
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

    <SafeAreaView>
    <ScrollView style={styles.scrollView}>

  <View style={styles.container}>

 <Text>Todays Video</Text>
 <TouchableOpacity onPress={() => navigation.navigate('Tears')}>

 <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay={false}
  isLooping
  style={{ width: 440, height: 300 }}
 />
 </TouchableOpacity>


 <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 20,
  }}
/>

 <TouchableOpacity onPress={() => navigation.navigate('Tears')}>

<Video
 source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
 rate={1.0}
 volume={1.0}
 isMuted={false}
 resizeMode="cover"
 shouldPlay={false}
 isLooping
 style={{ width: 440, height: 300 }}
/>
</TouchableOpacity>

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 20,
  }}
/>

<TouchableOpacity onPress={() => navigation.navigate('Tears')}>

<Video
 source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
 rate={1.0}
 volume={1.0}
 isMuted={false}
 resizeMode="cover"
 shouldPlay={false}
 isLooping
 style={{ width: 440, height: 300 }}
/>
</TouchableOpacity>

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 20,
  }}
/>

<TouchableOpacity onPress={() => navigation.navigate('Tears')}>

<Video
 source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
 rate={1.0}
 volume={1.0}
 isMuted={false}
 resizeMode="cover"
 shouldPlay={false}
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
    </ScrollView>
    </SafeAreaView>
   
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

<SafeAreaView>  

<Header 

backgroundColor='#aab'
leftComponent={<Icon name="menu" onPress={() => navigation.navigate('Tears')}/>}
// onPress={() => this.props.navigation.openDrawer()}
placement="center"
centerComponent={{ text: 'Home', style: { color: '#fff' } }}
rightComponent={<Icon name="home" onPress={() => navigation.navigate('Home')}/>}
/>

<View style={styles.top}>

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
    </SafeAreaView> 
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

 <View style={styles.top}>

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

          <Stack.Screen name="Home" component={HomeScreen} 
            options={{
              headerTransparent: false,
              headerShown: false,
              headerBackground: () => (
                <BlurView tint="light" intensity={20} style={StyleSheet.absoluteFill} />
              ),
              headerStyle: {height: 80 }, // Specify the height of your custom header
              transitionSpec: {open: config, close: config}
            }}/>

          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} 
               options={{
                title: 'Profile',
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
          />
          <Stack.Screen name="Video" component={VideoScreen}
            options={{
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
            }} />
          <Stack.Screen name="Tears" component={TearsVideo} 
                     options={{
                      title: 'Profile',
                      ...TransitionPresets.ModalSlideFromBottomIOS,
                    }}
          />
          <Stack.Screen name="News" component={RTENews} 
           options={{
            headerTransparent: true,
            headerShown: true,
            headerBackground: () => (
              <BlurView tint="light" intensity={20} style={StyleSheet.absoluteFill} />
            ),
            headerStyle: {height: 80 }, // Specify the height of your custom header
            transitionSpec: {open: config, close: config}
          }}/>

          <Stack.Screen name="NewsListing" component={NewsListing} />

          <Stack.Screen name="WebflowListing" component={WebflowListing} />

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
    // justifyContent: 'center',
    paddingTop: '5%'
  },
  HeaderStyles: {
    backgroundColor: '#000',
    color: '#f44336',
    // justifyContent: 'center',
    paddingTop: '1%'
  },

  WebflowHeaderStyles: {
    backgroundColor: '#000',
    color: '#f44336',
    // justifyContent: 'center',
    paddingTop: '1%'
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    width: 424,
    height: 256,
    alignItems: 'stretch',
    },
logo: {
    marginLeft: 1,
    width: 196,
    height: 98,
  },
  title: {
    fontFamily: 'Verdana',
      fontSize: 18,
      backgroundColor: '#fff',
      width: 400,
      height: 120,
      marginLeft: 10,
      marginRight: 0,
      padding: 0,
      marginTop: 8,
      marginBottom: 1,
      color: '#000',
  },
  name: {
    fontFamily: 'Verdana',
      fontSize: 18,
      backgroundColor: '#fff',
      width: 400,
      height: 40,
      marginLeft: 10,
      marginRight: 0,
      padding: 0,
      marginTop: 8,
      marginBottom: 1,
      color: '#000',
  },

  top: { flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#000',
    color: '#f44336',
    paddingTop: '3%'
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

  scrollView: {
    backgroundColor: 'black',
    marginHorizontal: 20,
  },

  text: {
    fontSize: 32,
    color: '#ffffff'
  }
});

