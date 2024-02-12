import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import book from '../../assets/book.png';
import { Divider } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as color from '../../colors/colors';
import * as images  from  '../config/constants';





export default function Login(props) {

    const [mobileNumber, setMobileNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [eye, setEye] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.login}>Login to your account </Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.33 }}>
                    <View style={styles.textInputView}>
                        <EvilIcons name="user" color="#241D60" size={35} style={{ paddingLeft: 5 }} />
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => setMobileNumber(text)}
                            value={mobileNumber}
                            placeholder="Enter you email / Mobile number"
                            placeholderTextColor="#47436A"
                        />
                    </View>

                    <View style={styles.textInputView}>
                        <SimpleLineIcons name="lock-open" color="#241D60" size={25} style={{ paddingLeft: 10 }} />
                        <TextInput
                            style={[styles.input, { width: '77%' }]}
                            onChangeText={(text) => setPassword(text)}
                            value={Password}
                            placeholder="Password"
                            secureTextEntry={eye ? false : true}
                            placeholderTextColor="#47436A"
                        />
                        <TouchableOpacity onPress={() => setEye(!eye)}>
                            <Feather
                                name={eye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPassword')}>
                        <Text style={styles.forget}>Forget Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logView} onPress={() => props.navigation.navigate('Otp')}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
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
    bottom: { flex: 0.25, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'center', marginTop: 15, fontSize: 14, color: color.appColor, fontWeight: '600' },
    logView: { height: 50, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    forget: { marginTop: 15, color: '#FFFFFF', fontSize: 13, alignSelf: 'flex-end', textDecorationLine: 'underline' },
    divider: { height: 1.2, backgroundColor: '#6A62AD', marginTop: 20 },
    login: { fontSize: 14, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 10 },
    imageContainer: { flex: 0.38, justifyContent: 'flex-end', alignItems: 'center' },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8, marginTop: 15 },

})