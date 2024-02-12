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
} from 'react-native';
import * as images from '../config/constants';
import * as color from '../config/constants';
import LinearGradient from 'react-native-linear-gradient';



export default function Verified(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageView}>
                    <Image source={images.verified} />
                </View>
                <View style={styles.phonenumber}>
                    <Text style={styles.verify}>Verified</Text>
                    <Text style={styles.verifiedPhone}>Your Password has been reset successfully.</Text>
                    <TouchableOpacity style={styles.logView} onPress={() => props.navigation.navigate('Home')}>
                        <Text style={styles.loginText}>DONE</Text>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
         
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 0.07,
        paddingLeft: 15,
        justifyContent: "flex-end"
    },
    verifiedPhone: { fontSize: 15, fontWeight: '500', color: '#CDCDCDE5', textAlign: "center", lineHeight: 23, marginTop: 10, marginBottom: 10 },
    verify: { fontSize: 25, fontWeight: '600', color: '#FFFFFF', textAlign: "center", lineHeight: 24 },
    phonenumber: { padding: 15, flex: 0.2, justifyContent: "center" },
    imageView: { flex: 0.5, alignSelf: "center", justifyContent: 'flex-end' },
    continueView: { backgroundColor: "#FC6703", borderRadius: 30, width: '90%', alignSelf: "center" },
    continueText: { fontWeight: '700', fontSize: 18, textAlign: "center", color: '#FFFFFF', padding: 15 },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    loginText: { alignSelf: 'center', marginTop: 15, fontSize: 14, color: color.darkBlue, fontWeight: '600' },
    logView: { height: 50, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },


})