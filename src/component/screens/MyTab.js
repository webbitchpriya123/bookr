import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Home from './Home';
import Profile from './Profile';
import ReSell from './ReSell';
import * as color from '../../colors/colors';






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
                                    </View> : <View><AntDesign name="home" size={25} color={color.darkBlue} /></View>}</View>
                        ),

                    }} />
                <Tab.Screen name="ReSell" component={ReSell}
                    options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <Feather name="book" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>Book</Text>
                                    </View> :
                                    <View>
                                        <Feather name="book" size={23} color={color.darkBlue} />
                                    </View>}
                            </View>


                        ),
                    }} />

                <Tab.Screen name="Faq" component={ReSell}
                    options={{
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused ?
                                    <View style={styles.tabContainer}>
                                        <AntDesign name="questioncircleo" size={23} color={color.darkBlue} />
                                        <Text style={styles.label}>FAQ's</Text>
                                    </View> :
                                    <View>
                                        <AntDesign name="questioncircleo" size={23} color={color.darkBlue} />

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
                                    <View>
                                        <Feather name="user" size={24} color={color.darkBlue} />
                                    </View>}
                            </View>

                        ),
                    }} />

            </Tab.Navigator>


        </>

    );
}

const styles = StyleSheet.create({
    imageStyle: { tintColor: 'white' },
    label: { marginLeft: 7, fontSize: 12, fontWeight: '500', color: color.darkBlue },
    tabContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: color.yellow, paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 23 }

})