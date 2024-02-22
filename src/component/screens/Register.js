import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as color from '../../colors/colors';
import * as images from '../config/constants';


export default function Register(props) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const [cnfmPassword, setCnfmPAssword] = useState('');
    const [cnfmEye, setCnfmEye] = useState(false);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.login}>Register to your account </Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.56 }}>
                    <View style={styles.textInputView}>
                        <Fontisto name="email" color="#241D60" size={25} style={{ paddingLeft: 10 }} />
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <Feather name="phone-call" color="#241D60" size={25} style={{ paddingLeft: 10 }} />

                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => setMobileNumber(text)}
                            value={mobileNumber}
                            placeholder="Phone number"
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

                    <View style={styles.textInputView}>
                        <SimpleLineIcons name="lock-open" color="#241D60" size={25} style={{ paddingLeft: 10 }} />
                        <TextInput
                            style={[styles.input, { width: '77%' }]}
                            onChangeText={(text) => setCnfmPAssword(text)}
                            value={cnfmPassword}
                            placeholder="Confirm password"
                            secureTextEntry={cnfmEye ? false : true}
                            placeholderTextColor="#47436A"
                        />
                        <TouchableOpacity onPress={() => setCnfmEye(!cnfmEye)}>
                            <Feather
                                name={cnfmEye ? "eye" : 'eye-off'} size={23} color={'#ABABAB'} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logView} onPress={() => props.navigation.navigate('Home')}>
                        <Text style={styles.loginText}>REGISTER</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.OrText}>OR</Text>
                        <View style={styles.registerView}>
                            <Text style={styles.account}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
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
    divider: { height: 1.2, backgroundColor: color.dividerColor, marginTop: 20 },
    login: { fontSize: 14, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    account: { fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 37 },
    registerView: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center' },
    register: { marginLeft: 5, color: '#FFCB00', textDecorationLine: 'underline' },
    OrText: { textAlign: 'center', fontWeight: '500', color: color.white, fontSize: 14, lineHeight: 17 },
    loginView: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 10 },
    imageContainer: { flex: 0.3, justifyContent: 'flex-end', alignItems: 'center' },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8, marginTop: 15 },

})