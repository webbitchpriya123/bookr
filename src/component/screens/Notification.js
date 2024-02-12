import React, { Component } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';

import LinearGradient from 'react-native-linear-gradient';


export default function Notification(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }}>
                        <AntDesign name='arrowleft' size={30} color={color.white} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Notification</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}
            >

                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>Today</Text>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>New Service Available!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>Credit Card Connected!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>Yesterday</Text>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>New Service Available!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>


                </View>

                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>December 22, 2023</Text>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>New Service Available!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>Credit Card Connected!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>


                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    headerText: { color: '#212121', fontWeight: '700', fontSize: 16, flex: 0.83 },
    Text1: { fontWeight: '600', fontSize: 14, color: '#212121', lineHeight: 30 },
    text2: { fontWeight: '500', fontSize: 14, color: '#505050' },
    iconStyle: { alignSelf: 'center', marginTop: 10 },
    iconView: {
        backgroundColor: color.darkBlue, height: 45, width: 45, borderRadius: 30
    },
    wholeView: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    container: { height: 90, backgroundColor: '#F5F6FA', marginTop: 10, borderRadius: 10 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari }

})