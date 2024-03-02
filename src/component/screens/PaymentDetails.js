import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import * as Images from '../config/constants';
import axios from 'axios';
import { RadioButton, Snackbar } from 'react-native-paper';
import HeaderComp from '../header/headerComp';
import { ApiUrl, api, banks, selectBankAccount } from '../constant/constant';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function PaymentDetails(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height
    const [load, setLoad] = useState(false);
    const [bank, setBank] = useState([]);



    useEffect(() => {
        setLoad(true);
        getApi();
    }, []);




    const getApi = async () => {

        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        if (value) {
            console.log("valllll", value)
            axios({
                method: 'post',
                url: ApiUrl + api + selectBankAccount,
                headers: {
                    Authorization: "Bearer " + JSON.parse(token),
                },
                data: {
                    user_id: value,
                }
            }).then((response) => {
                console.log("response", response.data)
                if (response.data.result === true) {
                    setBank(response.data.data)
                    setLoad(false);

                }
            }).catch((error) => {
                console.log("error", error)
            })
        }
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Payment Details'} props={props} />
            <View style={{ flex: 0.73, padding: 15 }}>
                <Text style={styles.title}>Default account</Text>
                {!bank ?
                    <View style={styles.mainContainer}>
                        <View style={{ padding: 15 }}>
                            <View style={styles.flexContainer}>
                                <Text style={styles.name}>{bank.account_holder_name}</Text>
                                <Text style={[styles.name, { color: color.green, }]}>Default Account</Text>
                            </View>
                            <Text style={styles.textStyle}>{bank.bank_name}</Text>
                            <Text style={styles.textStyle}>IFSC - {bank.ifsc}</Text>
                            <TouchableOpacity style={styles.flexContainer} onPress={()=>props.navigation.navigate('')}>
                                <Text style={styles.textStyle}>A/C No - {bank.account_number}</Text>
                                <AntDesign name="right" size={20} color={color.darkGrey} />
                            </TouchableOpacity>
                        </View>
                    </View> : <TouchableOpacity onPress={()=>props.navigation.navigate('AllPayment')} style={[[styles.flexContainer],[styles.addAccount]]}>
                        <Text style={[styles.textStyle,{marginLeft:20}]}>Add a new account</Text>
                        <AntDesign name="right" size={20} color={color.darkGrey} style={{marginRight:10}} />

                    </TouchableOpacity>}
            </View>
            <View style={styles.submit}>
                <TouchableOpacity disabled={load} style={[styles.logView, { opacity: load ? 0.2 : 1.0 }]} onPress={() => onSubmit()}>
                    <View style={styles.loaderView}>
                        <View style={{ flex: 0.55 }}>
                            <Text style={styles.loginText}>SUBMIT</Text>
                        </View>
                        {load ?
                            <View style={{ flex: 0.45 }}>
                                <ActivityIndicator size="large" color="#FFFFFF" />
                            </View> : null}
                    </View>
                </TouchableOpacity>
            </View>
            {load ?
                <View style={[styles.loader, { top: windowHeight / 2 }]}>
                    <ActivityIndicator size={'large'} color={color.green} />
                </View> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addAccount:{height:60,borderWidth:0.2, borderColor: 'border: Mixed solid #00000017',borderRadius:5,marginTop:20},
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    name: { fontWeight: '500', color: color.black, fontSize: 14, lineHeight: 25 },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    textStyle: { fontWeight: '500', color: color.darkGrey, fontSize: 14, lineHeight: 25 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    submit: { flex: 0.13, marginLeft: 15, marginRight: 15 },
    flexContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    mainContainer: { backgroundColor: '#F1FFF1', height: 130, marginTop: 20, borderWidth: 0.2, borderRadius: 5, borderColor: 'border: Mixed solid #00000017' }

})