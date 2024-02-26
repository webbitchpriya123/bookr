import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Snackbar } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as color from '../../colors/colors';
import * as images from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiUrl, api, login } from '../constant/constant';

export default function Login(props) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const [mobileErr, setMobileErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);
    const windowWidth = Dimensions.get('window').width;

    const authLogin = () => {
        axios.post(ApiUrl + api + login, {
            phone_or_email: mobileNumber,
            password: Password
        })
            .then((response) => {
                setLoad(false)
                console.log("response", response.data.message);
                if (response.data.data) {
                    AsyncStorage.setItem("phone", JSON.stringify(response.data.data.user.id))
                    AsyncStorage.setItem("token", JSON.stringify(response.data.data.token))
                    // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                    setVisible(true);
                    setMessage(response.data.message)
                    props.navigation.navigate('Home')

                } else {
                    setVisible(true);
                    setMessage(response.data.message)
                }
            })
            .catch((error) => {
                setLoad(false);
                setVisible(true);
                setMessage(error.data.message)
            });
    }


    const Login = async () => {
        if (mobileNumber === '') {
            setMobileErr('Email or Phone Number Required')
        }
        else if (Password === '') {
            setPassErr('Password Required')
        } else {
            setLoad(true);
            authLogin();
        }

    }

    const ForgetPassword = async () => {
        props.navigation.navigate('ForgetPassword')


    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.login}>Login to your account </Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.48 }}>
                    <View style={styles.textInputView}>
                        <EvilIcons name="user" color="#241D60" size={35} style={{ paddingLeft: 5 }} />
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => {

                                setMobileNumber(text)
                                setMobileErr(false)
                            }}
                            value={mobileNumber}
                            placeholder="Enter you email / Phone number"
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    {mobileErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{mobileErr}</Text>
                        </View> : null}

                    <View style={styles.textInputView}>
                        <SimpleLineIcons name="lock-open" color="#241D60" size={25} style={{ paddingLeft: 10 }} />
                        <TextInput
                            style={[styles.input, { width: '77%' }]}
                            onChangeText={(text) => {
                                setPassword(text)
                                setPassErr(false)
                            }}
                            value={Password}
                            maxLength={8}
                            placeholder="Password"
                            secureTextEntry={eye ? false : true}
                            placeholderTextColor="#47436A"
                        />
                        <TouchableOpacity onPress={() => setEye(!eye)}>
                            <Feather
                                name={eye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>

                    {passErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{passErr}</Text>
                        </View> : null}
                    <View style={styles.loginView}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('OtpLogin')}>
                            <Text style={styles.forget}>Login with OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ForgetPassword()}>
                            <Text style={styles.forget}>Forget Password?</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity disabled={load} style={[styles.logView, { opacity: load ? 0.2 : 0.9 }]} onPress={() => Login()}>
                        <View style={styles.loaderView}>
                            <View style={{ flex: 0.55 }}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </View>
                            {load ?
                                <View style={{ flex: 0.45 }}>
                                    <ActivityIndicator size="large" color="#FFFFFF" />
                                </View> : null}
                        </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.OrText}>OR</Text>
                        <View style={styles.registerView}>
                            <Text style={styles.account}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                                <Text style={styles.register}>Register</Text>
                            </TouchableOpacity>
                        </View>
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
                duration={900}
                action={{
                    label: 'UNDO',
                    onPress: () => {
                        setVisible(false)
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
    bottom: { flex: 0.1, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    forget: { marginTop: 15, color: '#FFFFFF', fontSize: 13, textDecorationLine: 'underline' },
    divider: { height: 1.2, backgroundColor: color.dividerColor, marginTop: 20 },
    login: { fontSize: 14, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    errorCode: { color: 'red', fontSize: 13, fontWeight: '500' },
    account: { fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 37 },
    registerView: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center' },
    register: { marginLeft: 5, color: '#FFCB00', textDecorationLine: 'underline' },
    OrText: { textAlign: 'center', fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 17 },
    loginView: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 10 },
    imageContainer: { flex: 0.38, justifyContent: 'flex-end', alignItems: 'center' },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8, marginTop: 15 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 }

})