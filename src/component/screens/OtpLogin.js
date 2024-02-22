import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as color from '../../colors/colors';
import * as images from '../config/constants';


export default function OtpLogin(props) {
    const [mobileNumber, setMobileNumber] = useState('');


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
                            onChangeText={(text) => setMobileNumber(text)}
                            value={mobileNumber}
                            placeholder="Enter you email / Phone number"
                            placeholderTextColor="#47436A"
                        />
                    </View>

                  
                    <View style={styles.loginView}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                            <Text style={styles.forget}>Login with Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPassword')}>
                            <Text style={styles.forget}>Forget Password?</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.logView} onPress={() => props.navigation.navigate('Otp')}>
                        <Text style={styles.loginText}>GET OTP</Text>
                    </TouchableOpacity>

                    
                    <View style={styles.option}>
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
    logView: { height: 50, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    forget: { marginTop: 15, color: '#FFFFFF', fontSize: 13,textDecorationLine:'underline' },
    divider: { height: 1.2, backgroundColor: color.dividerColor, marginTop: 20 },
    login: { fontSize: 14, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    loginView:{ flexDirection: 'row', justifyContent: 'space-between',marginTop:5,marginBottom:5 },
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 10 },
    imageContainer: { flex: 0.38, justifyContent: 'flex-end', alignItems: 'center' },
    textInputView: { flexDirection: 'row', width: "99%", alignSelf: "center", alignItems: "center", backgroundColor: "white", height: 55, borderRadius: 8, marginTop: 15 },
    account:{fontWeight:'500',color:color.white,fontSize:14,lineHeight:37},
    registerView:{flexDirection:'row',alignItems:'center',alignSelf:'center'},
    register:{marginLeft:5,color:'#FFCB00',textDecorationLine:'underline'},
    OrText:{textAlign:'center',fontWeight:'500',color:color.white,fontSize:14,lineHeight:17},
    option:{ marginTop: 15 }

})