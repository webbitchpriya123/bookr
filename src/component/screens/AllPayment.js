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
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import axios from 'axios';
import { RadioButton, Snackbar } from 'react-native-paper';
import HeaderComp from '../header/headerComp';
import { ApiUrl, api, getAllBank, deleteBankAcc, upDateBank } from '../constant/constant';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function AllPayment(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height
    const [load, setLoad] = useState(false);
    const [bank, setBank] = useState([]);
    const [checked, setChecked] = useState(0);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');



    useEffect(() => {
        setLoad(true);
        getApi();
    }, []);




    const getApi = async () => {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        if (value) {
            axios({
                method: 'post',
                url: ApiUrl + api + getAllBank,
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


    const onRemove = async (id,index) => {
        setLoad(true);
        setChecked(index)
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        if (value) {
            console.log("valllll", id)
            axios({
                method: 'post',
                url: ApiUrl + api + deleteBankAcc,
                headers: {
                    Authorization: "Bearer " + JSON.parse(token),
                },
                data: {
                    user_id: value,
                    bank_id: id
                }
            }).then((response) => {
                console.log("response", response.data)
                if (response.data.status === 'success') {
                    getApi();
                    setLoad(false);
                    setVisible(true);
                    setMessage(response.data.message)

                }
            }).catch((error) => {
                console.log("error", error)
            })
        }
    }

    const setAsDefault = async (id,index) => {
        setLoad(true);
        setChecked(index)
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        if (value) {
            axios({
                method: 'post',
                url: ApiUrl + api + upDateBank,
                headers: {
                    Authorization: "Bearer " + JSON.parse(token),
                },
                data: {
                    user_id: value,
                    bank_id: id
                }
            }).then((response) => {
                console.log("response", response.data)
                if (response.data.status === 'success') {
                    getApi();
                    setLoad(false);
                    setVisible(true);
                    setMessage(response.data.message)
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
                <ScrollView>
                    <Text style={styles.title}>Choose account Details</Text>
                    <FlatList
                        data={bank}
                        contentContainerStyle={{ width: windowWidth - 30 }}
                        vertical
                        // numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => setChecked(index)} style={[styles.mainContainer, { backgroundColor: checked === index ? '#F1FFF1' : color.white, }]} key={index}>
                                <View style={{ padding: 15 }}>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.name}>{item.account_holder_name}</Text>
                                        <RadioButton
                                            value="second"
                                            color={color.yellow}
                                            status={checked === index ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked(index)}
                                        />
                                    </View>
                                    <Text style={styles.textStyle}>{item.bank_name}</Text>
                                    <Text style={styles.textStyle}>IFSC - {item.ifsc}</Text>
                                    <Text style={styles.textStyle}>A/C No - {item.account_number}</Text>

                                    <View style={styles.views}>
                                        <TouchableOpacity onPress={() => setAsDefault(item.id,index)} style={styles.defaultView}><Text style={styles.defaultText}>Set as default</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => onRemove(item.id,index)} style={[styles.defaultView,{ marginLeft: 10}]}><Text style={[styles.defaultText,{color: color.red }]}>Remove</Text></TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item}
                    />

                    <TouchableOpacity onPress={() => props.navigation.navigate('AccountDetails')} style={[[styles.flexContainer], [styles.addAccount]]}>
                        <Text style={[styles.textStyle, { marginLeft: 20 }]}>Add a new account</Text>
                        <AntDesign name="right" size={20} color={color.darkGrey} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </ScrollView>
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
            <Snackbar
                style={{ width: windowWidth - 20 }}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={1100}
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
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    name: { fontWeight: '500', color: color.black, fontSize: 14, lineHeight: 25 },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    textStyle: { fontWeight: '500', color: color.darkGrey, fontSize: 14, lineHeight: 25 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    submit: { flex: 0.13, marginLeft: 15, marginRight: 15 },
    views:{ flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    flexContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    mainContainer: { height: 180, marginTop: 20, borderWidth: 0.2, borderRadius: 5, borderColor: 'border: Mixed solid #00000017' },
    addAccount: { height: 60, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017', borderRadius: 5, marginTop: 20 },
    defaultView: { backgroundColor: 'white', borderRadius: 3, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017' },
    defaultText: { fontSize: 12, fontWeight: '500', lineHeight: 17, padding: 8, color: color.green }
})