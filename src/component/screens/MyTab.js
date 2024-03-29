import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Home from './Home';
import Profile from './Profile';
import BookHistory from './BookHistory';
import * as color from '../../colors/colors';
import FAQ from './Faq';




const Tab = createBottomTabNavigator();

export default function MyTab() {
    // console.log("global",this.props.route.params.bottom)
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: { height: 75, borderTopWidth: 1, backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10 },
                }}
            >
                <Tab.Screen name="Home" component={Home}
                    options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <AntDesign name="home" size={25} color={color.darkBlue} />
                                        <Text style={styles.label}>Home</Text>
                                    </View> : <View style={styles.flexContainer}>
                                        <AntDesign name="home" size={25} color={color.darkBlue} />
                                        <Text style={styles.label}>Home</Text>
                                        </View>}</View>
                        ),

                    }} />
                <Tab.Screen name="BookHistory" component={BookHistory}
                    options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <Feather name="book" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>Book</Text>
                                    </View> :
                                    <View style={styles.flexContainer}>
                                        <Feather name="book" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>Book</Text>
                                    </View>}
                            </View>


                        ),
                    }} />

                <Tab.Screen name="FAQ" component={FAQ}
                    options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <AntDesign name="questioncircleo" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>FAQ's</Text>
                                    </View> :
                                    <View style={styles.flexContainer}>
                                        <AntDesign name="questioncircleo" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>FAQ's</Text>
                                    </View>}
                            </View>

                        ),
                    }} />
                <Tab.Screen name="Profile"
                    component={Profile} options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <Feather name="user" size={24} color={color.darkBlue} />
                                        <Text style={styles.label}>Profile</Text>
                                    </View> :
                                    <View style={styles.flexContainer}>
                                        <Feather name="user" size={24} color={color.darkBlue} />
                                        <Text style={styles.label}>Profile</Text>
                                    </View>}
                            </View>

                        ),
                    }} />

            </Tab.Navigator>


        </>

    );
}

const styles = StyleSheet.create({
    label: { marginLeft: 7, fontSize: 12, fontWeight: '500', color: color.darkBlue },
    tabContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: color.yellow, height:40,width:90,borderRadius: 23,justifyContent:'center'},
    flexContainer:{flexDirection:'row',alignItems:'center'}

})