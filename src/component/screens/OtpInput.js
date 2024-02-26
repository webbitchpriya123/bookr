import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import * as images from '../config/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ApiUrl, api, verifyCode } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




export default function Otp(props) {

    const [code, setCode] = useState('');
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        loadStoredValue();
    }, [code]);

    // Function to load stored value
    const loadStoredValue = async () => {
        try {
            const value = await AsyncStorage.getItem('phone');
            console.log("valueeeeeee", value)
            if (!value) {
                axios.post(ApiUrl + api + verifyCode, {
                    verification_code: code,
                    user_id: 2
                })
                    .then((response) => {
                        console.log("ressponseeee", response.data)
                        if (response.data.status === 'success') {
                            props.navigation.navigate('Verified')
                        }

                    })
                    .catch((error) => {
                        console.log("error", error)
                        // setLoad(false)
                        // // setMessage(error.data.message)
                        // setVisible(true)
                    });
            }
        } catch (error) {
            console.error('Error loading stored value:', error);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds >= 0) {
                console.log("logssss11");
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                console.log("logssss22");
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    console.log("duration")
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(0);
    };


    // console.log('propsspsps', props.route.params.email_or_phoneNumber)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <TouchableOpacity style={styles.arrow} onPress={() => props.navigation.goBack()} >
                    <AntDesign name='arrowleft' size={30} color={color.white} />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Verify Code</Text>
                    <Text style={styles.login}>Check your SMS inbox ,we have sent you the coed at <Text style={[styles.login, { color: color.white, fontWeight: '700' }]}>+91
                        {props.route.params.email_or_phoneNumber}
                    </Text></Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.25 }}>
                    <OTPInputView
                        style={styles.otpContainer}
                        pinCount={4}
                        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => setCode(code)}
                        autoFocusOnLoad
                        // autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            // props.navigation.navigate('Home')
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />

                    <TouchableOpacity>
                        <Text style={styles.timer} >00:
                            {seconds < 10 ? `0${seconds == -1 ? 0 : seconds}` : seconds}</Text>
                    </TouchableOpacity>
                    <View style={styles.resendView}>
                        <Text style={styles.resend}>Didn't receive a code? </Text>
                        <TouchableOpacity disabled={seconds > 0 || minutes > 0} onPress={() => resendOTP()}>
                            <Text style={[styles.resend, { color: seconds > 0 || minutes > 0 ? '#CDCDCDE5' : color.yellow, textDecorationLine: 'underline' }]}>Resend Code</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Divider style={styles.divider} />
                    <Text style={styles.website}>www.usedbookr.com</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    resendView: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 },
    arrow: { flex: 0.14, justifyContent: 'flex-end' },
    bottom: { flex: 0.25, justifyContent: 'flex-end', paddingBottom: 10 },
    divider: { height: 1.2, backgroundColor: color.dividerColor },
    login: { fontSize: 14, color: '#CDCDCDE5', fontWeight: '500', textAlign: 'center', marginTop: 15, fontFamily: font.acari, lineHeight: 22 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    underlineStyleBase: {
        width: 52,
        height: 52,
        borderRadius: 10,
        backgroundColor: 'white',
        color: "black",
        fontSize: 24
    },
    resend: { fontSize: 15, fontWeight: '500', fontFamily: font.acari, color: '#CDCDCDE5' },
    timer: { alignSelf: 'center', color: color.yellow, textDecorationLine: 'underline', marginTop: 10 },
    underlineStyleHighLighted: {
        backgroundColor: color.yellow,
        borderColor: color.yellow
    },

    otpContainer: {
        width: '75%',
        height: 70,
        alignSelf: "center",
    },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 20 },
    imageContainer: { flex: 0.31, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },

})