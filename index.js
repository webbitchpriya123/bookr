/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
//   const fcmtoken =  await messaging().getToken();
//   console.log("fcmmmm", fcmtoken)
// 
AppRegistry.registerComponent(appName, () => App);
