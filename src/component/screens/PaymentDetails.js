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
    Dimensions,
    RefreshControl,
    Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import HeaderComp from '../header/headerComp';
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';
import { RadioButton } from 'react-native-paper';
import { selectBank, getAllBanks, updateBankAcc, removeAcc } from "../config/getAllApi";


export default function PaymentDetails(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [load, setLoad] = useState(false);
    const [bank, setBank] = useState([]);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [checked, setChecked] = useState(null);
    const [idVal, setIdVal] = useState(0);
    const [check, setCheck] = useState(null);
    const [allBank, setAllBank] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');



    useEffect(() => {
        setLoad(true);
        getBank();
        getAllBank();
    }, [isFocused]);

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //


    const getBank = async () => {
        const getPayment = await selectBank();
        if (getPayment && getPayment.data && getPayment.result === true) {
            getAllBank(getPayment.data.id)
            setBank(getPayment.data)
            setLoad(false);
        } else {
            setBank(false);
            setLoad(false);
        }
    }

    const getAllBank = async (id) => {
        const getPayment = await getAllBanks();
        if (getPayment.result === true) {
            if (check === null) {
                const index = await getPayment.data.findIndex(item => { return item.id == id });
                console.log("findindex", getPayment, index)
                setChecked(index)
            }
            setCheck(false)
            setAllBank(getPayment.data)
            setLoad(false);
        } else {
            setAllBank(false);
            setLoad(false);
        }
    }


    const setAsDefault = (id, index) => {
        Alert.alert("UsedBookr!", "Are you sure you want to set your default account?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: async () => {
                    setLoad(true);
                    setChecked(index);
                    const update = await updateBankAcc(id);
                    if (update && update.status === 'success') {
                        getBank();
                        getAllBank();
                        setLoad(false);
                        setVisible(true);
                        setMessage(update.message)
                        // setTimeout(() => {
                        //     props.navigation.navigate('PaymentDetails');
                        // }, 1000);
                    } else {
                        console.log("setas default account error",)
                    }
                }
            }
        ]);
    }


    const onRemove = async (id, index) => {

        Alert.alert("UsedBookr!", "Are you sure you want to Remove Account?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: async () => {
                    setLoad(true);
                    setChecked(index);
                    const remove = await removeAcc(id);
                    if (remove && remove.status === 'success') {
                        getBank();
                        getAllBank(); setLoad(false);
                        setVisible(true);
                        setMessage(remove.message)
                    } else {
                        setLoad(false);
                    }

                }
            }
        ]);


    }

    console.log("idvalll", idVal)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Payment Details'} props={props} />


            <View style={{ flex: 0.85, padding: 15 }}>

                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Text style={styles.title}>Default account</Text>
                    {bank ?
                        <View style={styles.mainContainer}>
                            <View style={{ padding: 15 }}>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.name}>{bank.account_holder_name ? bank.account_holder_name : 'UPI Details'}</Text>
                                    <Text style={[styles.name, { color: color.green, }]}>Default Account</Text>
                                </View>

                                {bank.upi_id ?
                                    <View>
                                        <Text style={styles.textStyle}>{bank.bank_name}</Text>
                                        <Text style={styles.textStyle}>UPI - {bank.upi_id}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.textStyle}>{bank.bank_name}</Text>
                                        <Text style={styles.textStyle}>IFSC - {bank.ifsc}</Text>
                                {/* <TouchableOpacity style={styles.flexContainer} onPress={() => props.navigation.navigate('AllPayment', { id: bank.id })}> */}
                                <Text style={styles.textStyle}>A/C No - {bank.account_number}</Text>
                                </View>}

                                {/* <AntDesign name="right" size={20} color={color.darkGrey} /> */}
                                {/* </TouchableOpacity> */}
                            </View>
                        </View> : <TouchableOpacity onPress={() => props.navigation.navigate('AccountDetails')} style={{ marginTop: 20 }} >
                            <Text style={[styles.textStyle]}>No default account.</Text>
                            {/* <AntDesign name="right" size={20} color={color.darkGrey} style={{ marginRight: 10 }} /> */}
                        </TouchableOpacity>}
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.title}>Choose account Details</Text>
                        <FlatList
                            data={allBank}
                            contentContainerStyle={{ width: windowWidth - 30 }}
                            vertical
                            // numColumns={3}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => {
                                    setChecked(index),
                                        setIdVal(item.id)
                                }} style={[styles.mainContainer2, { backgroundColor: checked === index ? '#F1FFF1' : color.white, height: item.upi_id ? 130 : 190 }]} key={index}>
                                    <View style={{ padding: 15 }}>
                                        <View style={styles.flexContainer}>
                                            <Text style={styles.name}>{item.account_holder_name ? item.account_holder_name : 'UPI Details'}</Text>
                                            <RadioButton
                                                value={checked}
                                                key={index}
                                                color={color.yellow}
                                                status={checked === index ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked(index),
                                                        setIdVal(item.id)
                                                }}
                                            />
                                        </View>

                                        {item && item.upi_id ?
                                            <View>
                                                <Text style={styles.textStyle}>UPI ID - {item.upi_id}</Text>
                                            </View> :
                                            <View>
                                                <Text style={styles.textStyle}>{item.bank_name}</Text>
                                                <Text style={styles.textStyle}>IFSC - {item.ifsc}</Text>
                                                <Text style={styles.textStyle}>A/C No - {item.account_number}</Text>
                                            </View>
                                        }
                                        <View style={styles.views}>
                                            <TouchableOpacity onPress={() => onRemove(item.id, index)} style={styles.defaultView}><Text style={[styles.defaultText, { color: color.red }]}>Remove</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </TouchableOpacity>



                            }
                            keyExtractor={item => item}
                        />


                    </View>

                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('AccountDetails')} style={[[styles.flexContainer], [styles.addAccount]]}>
                <Text style={[styles.textStyle, { marginLeft: 20 }]}>Add a new account</Text>
                <AntDesign name="right" size={20} color={color.darkGrey} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <View style={styles.submit}>


                <TouchableOpacity disabled={load} style={[styles.logView, { opacity: load ? 0.2 : 1.0 }]} onPress={() => {
                    setAsDefault(idVal, checked)
                }}>
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
    addAccount: { height: 60, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017', borderRadius: 5, marginTop: 20, marginLeft: 15, marginRight: 15 },
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    name: { fontWeight: '500', color: color.black, fontSize: 14, lineHeight: 25 },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    textStyle: { fontWeight: '500', color: color.darkGrey, fontSize: 14, lineHeight: 25 },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    submit: { flex: 0.13, marginLeft: 15, marginRight: 15 },
    flexContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    mainContainer: { backgroundColor: '#F1FFF1', height: 130, marginTop: 20, borderWidth: 0.2, borderRadius: 5, borderColor: 'border: Mixed solid #00000017' },
    mainContainer2: { backgroundColor: '#F1FFF1', height: 190, marginTop: 20, borderWidth: 0.2, borderRadius: 5, borderColor: 'border: Mixed solid #00000017' },

    views: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    defaultView: { backgroundColor: 'white', borderRadius: 3, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017' },
    defaultText: { fontSize: 12, fontWeight: '500', lineHeight: 17, padding: 8, color: color.green }
})