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
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import axios from 'axios';
import { RadioButton, Snackbar } from 'react-native-paper';
import HeaderComp from '../header/headerComp';
import { ApiUrl, api, getAllBank, deleteBankAcc, upDateBank } from '../constant/constant';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';


export default function AllPayment(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height
    const [load, setLoad] = useState(false);
    const [bank, setBank] = useState([]);
    const [checked, setChecked] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [idVal, setIdVal] = useState(0);
    const [check, setCheck] = useState(null);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        setLoad(true);
        getApi();
    }, [isFocused]);

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
            }).then(async (response) => {
                console.log("response", response.data)
                if (response.data.result === true) {
                    if (check === null) {
                        const index = await response.data.data.findIndex(item => item.id === props.route.params.id);
                        setChecked(index)
                    }
                    setCheck(false)
                    setBank(response.data.data)
                    setLoad(false);
                }
            }).catch((error) => {
                console.log("error", error)
            })
        }
    }
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //

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
                    setChecked(index)
                    const value = await AsyncStorage.getItem('user_id');
                    const token = await AsyncStorage.getItem('token');
                    if (value) {
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
            }
        ]);


    }



    console.log("checkkk", checked)

    const setAsDefault = async (id, index) => {
        console.log("default", id, index)
        Alert.alert("UsedBookr!", "Are you sure you want to set your default account?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: async () => {
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
                                bank_id: id ? id : props.route.params.id
                            }
                        }).then((response) => {
                            console.log("defaultresponse", response.data)
                            if (response.data.status === 'success') {
                                getApi();
                                setLoad(false);
                                setVisible(true);
                                setMessage(response.data.message)
                                setTimeout(() => {
                                    props.navigation.navigate('PaymentDetails');
                                }, 1000);
                            }
                        }).catch((error) => {
                            console.log("error", error)
                        })
                    }
                }
            }
        ]);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);
    console.log('finns', props.route.params.id)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Payment Details'} props={props} />
            <View style={{ flex: 0.73, padding: 15 }}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Text style={styles.title}>Choose account Details</Text>
                    <FlatList
                        data={bank}
                        contentContainerStyle={{ width: windowWidth - 30 }}
                        vertical
                        // numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => {
                                setChecked(index),
                                    setIdVal(item.id)
                            }} style={[styles.mainContainer, { backgroundColor: checked === index ? '#F1FFF1' : color.white, }]} key={index}>
                                <View style={{ padding: 15 }}>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.name}>{item.account_holder_name}</Text>
                                        <RadioButton
                                            value="second"
                                            color={color.yellow}
                                            status={checked === index ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked(index),
                                                    setIdVal(item.id)
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.textStyle}>{item.bank_name}</Text>
                                    <Text style={styles.textStyle}>IFSC - {item.ifsc}</Text>
                                    <Text style={styles.textStyle}>A/C No - {item.account_number}</Text>

                                    <View style={styles.views}>
                                        <TouchableOpacity onPress={() => onRemove(item.id, index)} style={styles.defaultView}><Text style={[styles.defaultText, { color: color.red }]}>Remove</Text>
                                        </TouchableOpacity>

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
                <TouchableOpacity disabled={load} style={[styles.logView, { opacity: load ? 0.2 : 1.0 }]}
                    onPress={() => setAsDefault(idVal, checked)}
                >
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
                duration={1500}
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
    views: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    flexContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    mainContainer: { height: 180, marginTop: 20, borderWidth: 0.2, borderRadius: 5, borderColor: 'border: Mixed solid #00000017' },
    addAccount: { height: 60, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017', borderRadius: 5, marginTop: 20 },
    defaultView: { backgroundColor: 'white', borderRadius: 3, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017' },
    defaultText: { fontSize: 12, fontWeight: '500', lineHeight: 17, padding: 8, color: color.green }
})