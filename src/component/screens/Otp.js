import React, { useState } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import book from '../../assets/book.png';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import * as images  from  '../config/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input'





export default function Otp(props) {

    const [code, setCode] = useState('');


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <TouchableOpacity style={styles.arrow} onPress={() => props.navigation.goBack()} >
                    <AntDesign name='arrowleft' size={30} color={color.white} />

                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={images.MainLogo} />
                    <Text style={styles.welcome}>Verify Code</Text>
                    <Text style={styles.login}>Check your SMS inbox ,we have sent you the coed at <Text style={[styles.login, { color: color.white, fontWeight: '700' }]}>+91 8236820589</Text></Text>
                </View>
                <View style={{ flex: 0.05 }}>
                    <Divider style={styles.divider} />
                </View>

                <View style={{ flex: 0.25}}>
                        <OTPInputView
                            style={styles.otpContainer}
                            pinCount={4}
                            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={code => setCode(code)}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                        />

                    <TouchableOpacity>
                        <Text style={styles.timer} >(00:59)</Text>
                    </TouchableOpacity>
                    <View style={styles.resendView}>
                        <Text style={styles.resend}>Didn't receive a code? </Text>
                        <Text style={[styles.resend,{color:color.yellow,textDecorationLine:'underline'}]}>Resend Code</Text>

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
    resendView:{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:30},
    arrow: { flex: 0.14, justifyContent: 'flex-end' },
    bottom: { flex: 0.25, justifyContent: 'flex-end', paddingBottom: 10 },
    loginText: { alignSelf: 'center', marginTop: 15, fontSize: 14, color: '#241D60', fontWeight: '600' },
    divider: { height: 1.2, backgroundColor: '#6A62AD' },
    login: { fontSize: 14, color: '#CDCDCDE5', fontWeight: '500', textAlign: 'center', marginTop: 15, fontFamily: font.acari, lineHeight: 22 },
    website: { fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30, alignSelf: 'center', marginTop: 5 },
    underlineStyleBase: {
        width: 52,
        height: 52,
        borderRadius:10,
        backgroundColor:'white',
        color: "black",
        fontSize: 24
    },
    resend:{fontSize:15,fontWeight:'500',fontFamily:font.acari,color:'#CDCDCDE5'},
    timer:{alignSelf:'center',color:color.yellow,textDecorationLine:'underline',marginTop:10},
    underlineStyleHighLighted:{
        backgroundColor:color.yellow,
        borderColor:color.yellow
    },

    otpContainer: {
    width: '75%',
    height: 70,
    alignSelf: "center",
    // marginTop: 5,
    // marginBottom: 20
},
    input: {
    borderRadius: 30,
    marginLeft: 10,
    width: '80%',
    color: "#47436A"
},
    welcome: { fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30, marginTop: 20 },
    imageContainer: { flex: 0.31, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
    // textInputView: { backgroundColor: "white", height: 55, borderRadius: 8 },

})