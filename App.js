
import React from 'react';
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
import Login from './src/component/screens/Login';
import Otp from './src/component/screens/Otp.js';
import MyTab from './src/component/screens/MyTab.js';
import Verified from './src/component/screens/Verified.js';
import ForgetPassword from './src/component/screens/ForgetPassword';
import ResetPassword from './src/component/screens/ResetPassword.js';
import Notification from './src/component/screens/Notification.js';
import ReSell from './src/component/screens/ReSell.js';
import PaymentDetails from './src/component/screens/PaymentDetails.js';
import BookHistory from './src/component/screens/BookHistory.js';
import BookDetail from './src/component/screens/BookDetail.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Home" component={MyTab} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Verified" component={Verified} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ReSell" component={ReSell} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="BookHistory" component={BookHistory} />
        <Stack.Screen name="BookDetails" component={BookDetail} />





      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
