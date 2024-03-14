import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, BackHandler, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Snackbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import * as images from '../config/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ApiUrl, api, verifyCode,register } from '../constant/constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFcm } from '../config/localStorage';




export default function Otp(props) {
    const [code, setCode] = useState('');
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const windowWidth = Dimensions.get('window').width;


    const handleBackButton = async() => {
        if(props.route.params.name === 'Register'){
        Alert.alert(
            'Go Back',
            'To become a registered user, you must first verify the OTP (One-Time Password) provided during the registration process.' ,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => 
                    axios.post(ApiUrl + api + register, {
                        user_response: 0,
                        user_id:props.route.params.user_id,
                    })
                        .then((response) => {
        
                            console.log("responseeee",response.data.status )
                            if(response.data.status === 'success'){
                                props.navigation.goBack()
                            }

                            // if(response.data)
                            console.log("responseeee",response)
                        })
                        .catch((error) => {
                            console.log("error",error)

                        })
                    
                    // props.navigation.goBack()
                    
                    
                    
                },
            ],
            {
                cancelable: false,
            }
        );
        return true;
        } else{
            props.navigation.goBack();
        }
    };


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);



    // Function to load stored value
    const loadStoredValue = async (code) => {
        const fcm = JSON.parse(await getFcm());
        await axios.post(ApiUrl + api + verifyCode, {
            verification_code: `${JSON.stringify(props.route.params.code)}`,
            user_id: props.route.params.user_id,
            device_token: fcm,
        })
            .then((response) => {
                if (response.data.status === 'success' && code == props.route.params.code) {
                    setVisible(true);
                    setMessage('Verfied Successfully');
                    if (props.route.params.type === 'Verified' || props.route.params.type === 'Login') {
                        AsyncStorage.setItem("user_id", JSON.stringify(props.route.params.user_id))
                        AsyncStorage.setItem("token", JSON.stringify(response.data.data.token))
                    }
                    setTimeout(() => {
                        setCode('')
                        // setCode(code);
                        props.navigation.navigate('Verified', { mobile: props.route.params.email_or_phoneNumber, type: props.route.params.type })
                    }, 1000);
                } else {
                    setCode('')
                    setVisible(true);
                    setMessage('invalid otp code');
                    resendOTP();
                }
            })
            .catch((error) => {
                setCode('');
                console.log("error", error)
                setMessage('invalid Otp')
            });
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds >= 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                // console.log("logssss22");
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    // console.log("duration")
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
        setCode('')
        setMinutes(1);
        setSeconds(0);
    };

    const goBack = () => {
        handleBackButton();
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <TouchableOpacity style={styles.arrow} onPress={() => goBack()} >
                    <AntDesign name='arrowleft' size={30} color={color.white} />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} style={{ height: 120, width: 100 }} />
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
                        // autoFocusOnLoad
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            // loadStoredValue()
                            // props.navigation.navigate('Home')
                            loadStoredValue(code);
                            // if (code) {
                            //     props.navigation.navigate('Verified')
                            // }
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

            <Snackbar
                style={{ width: windowWidth - 20 }}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={1500}
                action={{
                    label: 'UNDO',
                    onPress: () => {
                        setVisible(false);
                        setCode('');
                    },
                }}>
                {message}
            </Snackbar>


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