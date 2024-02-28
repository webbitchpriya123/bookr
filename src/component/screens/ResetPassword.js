import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator ,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Snackbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import * as images from '../config/constants';
import { ApiUrl, api, resetPassword } from '../constant/constant';
import axios from 'axios';




export default function ResetPassword(props) {

    const [Password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const [ResetPassword, setResetPassword] = useState('');
    const [Eye, reSetEye] = useState(false);
    const [passErr, setPassErr] = useState('');
    const [resetErr, setResetErr] = useState('');
    const [load, setLoad] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const windowWidth = Dimensions.get('window').width;



    const Continue = async () => {
        axios.post(ApiUrl + api + resetPassword, {
            new_password: Password,
            phone_or_email: props.route.params.mobile
        })
            .then((response) => {
                setLoad(false)
                if (response.data.status === 'success') {
                    setVisible(true);
                    setMessage('password updated successfully')
                    setTimeout(() => {
                        props.navigation.navigate('Login');
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("error", error)
                setLoad(false)

            });

    }

    const reset = () => {
        if (Password === '') {
            setPassErr('Password is Required')
        }
        else if (Password.length != 8) {
            setResetErr('Minimum Password length is 8')
        }
        else if (ResetPassword === '') {
            setResetErr('Resetpssword is Required')
        }
        else if (Password != ResetPassword) {
            setResetErr('Mismatch Password and Resetpassword');
        } else {
            setLoad(true)
            Continue()
        }

    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <TouchableOpacity style={styles.arrow} onPress={() => props.navigation.goBack()} >
                    <AntDesign name='arrowleft' size={30} color={color.white} />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Reset Password</Text>
                    <Text style={styles.login}>At least 9 characters, with uppercase and lowercase letters.</Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.35 }}>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            onChangeText={(text) => {
                                setPassword(text)
                                setPassErr(false)
                            }}
                            value={Password}
                            placeholder="Password"
                            secureTextEntry={eye ? false : true}
                            placeholderTextColor="#47436A"
                            maxLength={8}

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


                    <View style={[styles.textInputView, { marginTop: 15 }]}>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            onChangeText={(text) => {
                                setResetPassword(text)
                                setResetErr(false)
                            }}
                            value={ResetPassword}
                            placeholder="Confirm password"
                            secureTextEntry={Eye ? false : true}
                            placeholderTextColor="#47436A"
                            maxLength={8}
                        />
                        <TouchableOpacity onPress={() => reSetEye(!Eye)}>
                            <Feather
                                name={Eye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>

                    {resetErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{resetErr}</Text>
                        </View> : null}

                    <TouchableOpacity disabled={load} style={[styles.logView, { opacity: load ? 0.2 : 0.9 }]} onPress={() => reset()}>
                        <View style={styles.loadView}>

                            <View style={{ flex: 0.53 }}>
                                <Text style={styles.loginText}>SEND</Text>
                            </View>
                            {load ?
                                <View style={{ flex: 0.42 }}>
                                    <ActivityIndicator size="large" color="#FFFFFF" />
                                </View> : null}
                        </View>

                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.logView} onPress={() => reset()}>
                        <Text style={styles.loginText}>CONTINUE</Text>
                    </TouchableOpacity> */}
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
                duration={1000}
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
    arrow: { flex: 0.14, justifyContent: 'flex-end' },
    bottom: { flex: 0.15, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 50, backgroundColor: color.yellow, borderRadius: 8, marginTop: 25 },
    divider: { height: 1.2, backgroundColor: color.dividerColor },
    login: { fontSize: 14, color: '#CDCDCDE5', fontWeight: '500', textAlign: 'center', marginTop: 15, fontFamily: font.acari, lineHeight: 20, paddingLeft: 25, paddingRight: 25 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    errorCode: { color: 'red', fontSize: 13, fontWeight: '500' },
    loadView: { flexDirection: 'row', height: 50, alignItems: 'center' },

    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 20 },
    imageContainer: { flex: 0.31, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8 },

})