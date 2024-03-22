
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  ToastAndroid
} from 'react-native';
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/component/screens/Login';
import Otp from './src/component/screens/OtpInput.js';
import MyTab from './src/component/screens/MyTab.js';
import Verified from './src/component/screens/Verified.js';
import ForgetPassword from './src/component/screens/ForgetPassword';
import ResetPassword from './src/component/screens/ResetPassword.js';
import Notification from './src/component/screens/Notification.js';
import ReSell from './src/component/screens/ReSell.js';
import AccountDetails from './src/component/screens/AccountDetails.js';
import BookHistory from './src/component/screens/BookHistory.js';
import BookDetail from './src/component/screens/BookDetail.js';
import Profile from './src/component/screens/Profile.js';
import FAQ from './src/component/screens/Faq.js';
import EditProfile from './src/component/screens/EditProfile.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import OtpLogin from './src/component/screens/OtpLogin.js';
import Register from './src/component/screens/Register.js';
import PaymentDetails from './src/component/screens/PaymentDetails.js';
import AllPayment from './src/component/screens/AllPayments.js';
import messaging from '@react-native-firebase/messaging';
import Terms from './src/component/screens/Terms.js';
import Draft from './src/component/screens/Draft.js';
import notifee from '@notifee/react-native';



const Stack = createNativeStackNavigator();
const App = () => {
  const [localValue, setLocal] = useState(null);
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    loadStoredValue();
    requestUserPermission();
    requestNotificationPermission();
    getToken();
  }, []);


  const requestNotificationPermission = async () => {
    const settings = await notifee.requestPermission();

    if (settings.granted) {
        console.log('Notification permission granted');
    } else {
        console.log('Notification permission denied');
    }
};

  // async function requestNotificationPermission() {
  //   try {
  //     PushNotification.configure({
  //       onRegister: function(token) {
  //         // token contains the device token required for push notifications
  //         console.log('TOKEN:', token);
  //       },
  //       permissions: {
  //         alert: true,
  //         badge: true,
  //         sound: true,
  //       },
  //       popInitialNotification: true,
  //       requestPermissions: Platform.OS === 'android', // Request permissions on Android
  //     });
  
  //     if (Platform.OS === 'android') {
  //       const granted = await PushNotification.requestPermissions();
  //       if (granted === true) {
  //         console.log('Notification permission granted');
  //       } else {
  //         console.log('Notification permission denied');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error requesting notification permission:', error);
  //   }
  // }
  

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  const getToken = async () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('Notification caused app to open from quit state:');
        if (remoteMessage) {
          console.log(remoteMessage.notification);
        }
      });
    const fcmtoken = await messaging().getToken();
    AsyncStorage.setItem("fcm", JSON.stringify(fcmtoken))
    console.log("fcmmmm", fcmtoken)
  }


  // Function to load stored value
  const loadStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      // const token = await AsyncStorage.getItem('token');
      // console.log("tokne", token)
      if (value) {
        setLocal(value);
      } else {
        setLocal(false)
      }
    } catch (error) {
      console.error('Error loading stored value:', error);
    }
  };
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  console.log("local", localValue)
  if (localValue === null) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          cardStyleInterpolator: forFade,
        }}
        initialRouteName={localValue ? "Home" : "Login"}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Home" options={{ animation: 'slide_from_right' }} component={MyTab} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OtpLogin" component={OtpLogin} />
        <Stack.Screen name="Verified" component={Verified} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ReSell" component={ReSell} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="BookHistory" component={BookHistory} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name="BookDetails" component={BookDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AllPayment" component={AllPayment} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Draft" component={Draft} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
