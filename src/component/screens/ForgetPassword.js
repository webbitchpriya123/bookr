import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import book from '../../assets/book.png';
import { Divider, Snackbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import { ApiUrl, forgetPassword, api } from '../constant/constant';
import axios from 'axios';




export default function ForgetPassword(props) {

    const [mobileNumber, setMobileNumber] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);
    const [mobErr, setMobErr] = useState('');

    const windowWidth = Dimensions.get('window').width;


    const send = () => {
        if (mobileNumber === '') {
            setMobErr('Email or Phone Number Required')
        } else {
            setLoad(true)
            axios.post(ApiUrl + api + forgetPassword, {
                phone_or_email: mobileNumber,
            })
                .then((response) => {
                    if (response.data.result === 'success') {
                        setLoad(false)
                        setVisible(true);
                        setMessage(response.data.result)
                        props.navigation.navigate('Otp', { email_or_phoneNumber: mobileNumber })

                    } else {
                        setLoad(false)
                        setVisible(true);
                        setMessage(response.data.result)
                    }

                })
                .catch((error) => {
                    setLoad(false)
                    props.navigation.navigate('Otp', { email_or_phoneNumber: mobileNumber })
                    // setMessage(error.data.message)
                    setVisible(true)

                });
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
                    <Image source={book} />
                    <Text style={styles.welcome}>Forget Password</Text>
                    <Text style={styles.login}>Please enter your <Text style={[styles.login, { color: color.white, fontWeight: '700' }]}>email address or phone number</Text>  to reset you Password </Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.25 }}>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => {
                                setMobErr(false);
                                setMobileNumber(text)
                            }}
                            value={mobileNumber}
                            placeholder="Enter you email / Mobile number"
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    {mobErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{mobErr}</Text>
                        </View> : null}

                    <TouchableOpacity disabled={load} style={styles.logView} onPress={() => send()}>
                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>

                            <View style={{ flex: 0.53 }}>
                                <Text style={styles.loginText}>SEND</Text>
                            </View>
                            {load ?
                                <View style={{ flex: 0.42 }}>
                                    <ActivityIndicator size="large" color="#FFFFFF" />
                                </View> : null}
                        </View>

                    </TouchableOpacity>
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
    bottom: { flex: 0.25, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 50, backgroundColor: color.yellow, borderRadius: 8, marginTop: 25 },
    divider: { height: 1.2, backgroundColor: color.dividerColor },
    login: { fontSize: 14, color: '#CDCDCDE5', fontWeight: '500', textAlign: 'center', marginTop: 15, fontFamily: font.acari, lineHeight: 20, paddingLeft: 20, paddingRight: 20 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    errorCode: { color: 'red', fontSize: 13, fontWeight: '500' },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 20 },
    imageContainer: { flex: 0.31, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
    textInputView: { backgroundColor: "white", height: 55, borderRadius: 8 },

})