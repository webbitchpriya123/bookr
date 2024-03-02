
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpLogin from './src/component/screens/OtpLogin.js';
import Register from './src/component/screens/Register.js';
import PaymentDetails from './src/component/screens/PaymentDetails.js';
import AllPayment from './src/component/screens/AllPayment.js';


const Stack = createNativeStackNavigator();
const App = () => {

  const [localValue, setLocal] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    loadStoredValue();
  }, []);

  // Function to load stored value
  const loadStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      if (value) {
        setLocal(value);
      } else {
        setLocal(false)
      }
    } catch (error) {
      console.error('Error loading stored value:', error);
    }
  };

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
        }}
        initialRouteName={localValue ? "AllPayment" : "Login"}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Home" component={MyTab} />
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
        <Stack.Screen name="BookHistory" component={BookHistory} />
        <Stack.Screen name="BookDetails" component={BookDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AllPayment" component={AllPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
