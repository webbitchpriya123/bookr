import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as color from '../../colors/colors';
import * as images from '../config/constants';


export default function Register(props) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const [cnfmPassword, setCnfmPAssword] = useState('');
    const [cnfmEye, setCnfmEye] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [numberErr, setNumberErr] = useState(false);
    const [passwordErr, setPassErr] = useState(false);
    const [cnfmPassErr, setCnfmPassErr] = useState(false);
    const [Name , setName] = useState('');
    const [nameErr , setNameErr] = useState(false)




    const Register = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        const phoneNumberRegex = /^\d{10}$/;
        if (Name === ''){
            setNameErr('Name is Required')
        }
        else if (email === '') {
            setEmailErr('Email is Required')
        }
        else if (!strongRegex.test(email)) {
            setEmailErr('Invalid Email');
        }
        else if (mobileNumber === '') {
            setNumberErr('Phone Number is Required')
        } else if (!phoneNumberRegex.test(mobileNumber)) {
            setNumberErr('Invalid Phone Number')
        }
        else if (Password === '') {
            setPassErr('Password is Required')
        } else if (cnfmPassword === '') {
            setCnfmPassErr('Confirm Password is Required')
        } else if (Password !== cnfmPassword) {
            setCnfmPassErr('Mismatch password and confirm password')
        }
        else {
            ToastAndroid.show('Register successfully !', ToastAndroid.SHORT);
            props.navigation.navigate('Login')
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.login}>Register to your account </Text>
                </View>
                <View style={{ flex: 0.03 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.64}}>
                <View style={styles.textInputView}>
                        <EvilIcons name="user" color="#241D60" size={35}  />
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => {
                                setName(text)
                                setNameErr(false)
                            }}
                            value={Name}
                            placeholder="Name"
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    {nameErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{nameErr}</Text>
                        </View> : null}
                    <View style={styles.textInputView}>
                        <Fontisto name="email" color="#241D60" size={25} style={{ paddingLeft: 10 }} />
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => {
                                setEmail(text)
                                setEmailErr(false)
                            }}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="#47436A"
                        />
                    </View>

                    {emailErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{emailErr}</Text>
                        </View> : null}
                    <View style={styles.textInputView}>
                        <Feather name="phone-call" color="#241D60" size={25} style={{ paddingLeft: 10 }} />

                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => {
                                setMobileNumber(text)
                                setNumberErr(false)
                            }}
                            value={mobileNumber}
                            placeholder="Phone number"
                            maxLength={10}
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    {numberErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{numberErr}</Text>
                        </View> : null}

                    <View style={styles.textInputView}>
                        <SimpleLineIcons name="lock-open" color="#241D60" size={25} style={{ paddingLeft: 5 }} />
                        <TextInput
                            style={[styles.input, { width: '77%' }]}
                            onChangeText={(text) => {
                                setPassword(text)
                                setPassErr(false)
                                setCnfmPassErr(false)
                            }}
                            value={Password}
                            placeholder="Password"
                            maxLength={8}
                            secureTextEntry={eye ? false : true}
                            placeholderTextColor="#47436A"
                        />
                        <TouchableOpacity onPress={() => setEye(!eye)}>
                            <Feather
                                name={eye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>

                    {passwordErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{passwordErr}</Text>
                        </View> : null}

                    <View style={styles.textInputView}>
                        <SimpleLineIcons name="lock-open" color="#241D60" size={25} style={{ paddingLeft: 5 }} />
                        <TextInput
                            style={[styles.input, { width: '77%' }]}
                            onChangeText={(text) => {
                                setCnfmPAssword(text)
                                setCnfmPassErr(false)
                            }}
                            value={cnfmPassword}
                            maxLength={8}
                            placeholder="Confirm password"
                            secureTextEntry={cnfmEye ? false : true}
                            placeholderTextColor="#47436A"
                        />
                        <TouchableOpacity onPress={() => setCnfmEye(!cnfmEye)}>
                            <Feather
                                name={cnfmEye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>
                    {cnfmPassErr ?
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.errorCode}>{cnfmPassErr}</Text>
                        </View> : null}

                    <TouchableOpacity style={styles.logView} onPress={() => Register()}>
                        <Text style={styles.loginText}>REGISTER</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.OrText}>OR</Text>
                        <View style={styles.registerView}>
                            <Text style={styles.account}>Already have an account?</Text>
                            <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
                                <Text style={styles.register}>Login</Text>
                            </TouchableOpacity>
                        </View>
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
    bottom: { flex: 0.1, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'center', marginTop: 15, fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 50, backgroundColor: '#FFCB00', marginTop: 35, borderRadius: 8 },
    forget: { marginTop: 15, color: '#FFFFFF', fontSize: 13, textDecorationLine: 'underline' },
    divider: { height: 1.2, backgroundColor: color.dividerColor, marginTop:10 },
    login: { fontSize: 14, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    errorCode:{ color: 'red', fontSize: 13, fontWeight: '500' },
    account: { fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 37 },
    registerView: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center' },
    register: { marginLeft: 5, color: '#FFCB00', textDecorationLine: 'underline' },
    OrText: { textAlign: 'center', fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 17 },
    loginView: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 10 },
    imageContainer: { flex: 0.24, justifyContent: 'flex-end', alignItems: 'center' },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8, marginTop: 15 },

})