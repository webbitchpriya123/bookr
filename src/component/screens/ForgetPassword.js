import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import book from '../../assets/book.png';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';





export default function ForgetPassword(props) {

    const [mobileNumber, setMobileNumber] = useState('');
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                    <TouchableOpacity style={styles.arrow} onPress={()=>props.navigation.goBack()} >
                        <AntDesign  name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={book} />
                    <Text style={styles.welcome}>Forget Password</Text>
                    <Text style={styles.login}>Please enter your <Text style={[styles.login,{color:color.white,fontWeight:'700'}]}>email address or phone number</Text>  to reset you Password </Text>
                </View>
                <View style={{ flex: 0.05}}>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ flex: 0.25}}>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={[styles.input, { marginLeft: 6 }]}
                            onChangeText={(text) => setMobileNumber(text)}
                            value={mobileNumber}
                            placeholder="Enter you email / Mobile number"
                            placeholderTextColor="#47436A"
                        />
                    </View>
                    <TouchableOpacity style={styles.logView} onPress={()=>props.navigation.navigate('ResetPassword')}>
                        <Text style={styles.loginText}>SEND</Text>
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
    arrow:{flex:0.14,justifyContent:'flex-end'},
    bottom:{flex:0.25,justifyContent:'flex-end',paddingBottom:10},
    loginText:{alignSelf:'center',marginTop:15,fontSize:14,color:'#241D60',fontWeight:'600'},
    logView:{height:50,backgroundColor:color.yellow,marginTop:25,borderRadius:8},
    divider:{ height: 1.2, backgroundColor: '#6A62AD'},
    login:{ fontSize: 14, color: '#CDCDCDE5', fontWeight: '500',textAlign:'center',marginTop:15 ,fontFamily:font.acari,lineHeight:20,paddingLeft:20,paddingRight:20},
    website:{ fontSize: 12, color: '#FFFFFFE5', fontWeight: '500', lineHeight: 30 ,alignSelf:'center',marginTop:5},
   
    input: {
        borderRadius: 30,
        marginLeft: 10,
        width: '80%',
        color: "#47436A"
    },
    welcome:{ fontSize: 25, color: '#FFFFFFE5', fontWeight: '600', lineHeight: 30 ,marginTop:20},
    imageContainer:{ flex: 0.31,justifyContent: 'flex-end', alignItems: 'center' ,paddingBottom:30},
    textInputView: {backgroundColor: "white", height: 55, borderRadius: 8 },

})