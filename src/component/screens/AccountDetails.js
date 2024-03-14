import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
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
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import { RadioButton, Snackbar } from 'react-native-paper';
import HeaderComp from '../header/headerComp';
import { ApiUrl, api, addBankDetails } from '../constant/constant';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBank } from "../config/getAllApi";
import messaging from '@react-native-firebase/messaging';
import {PushNotification} from '../config/pushNotification';


export default function AccountDetails(props) {
    const windowWidth = Dimensions.get('window').width;

    const [checked, setChecked] = useState('first');
    const [load, setLoad] = useState(false);
    const [bank, setBank] = useState([]);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState({});
    const [data, setData] = useState({
        name: '',
        ifsc: '',
        value: '',
        acNo: '',
        upi: ''
    })
    const [error, setError] = useState({
        bankErr: '',
        nameErr: '',
        ifscErr: '',
        acErr: '',
        upiErr: ''
    })
    const [isFocus, setIsFocus] = useState(false);
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //
    useEffect(() => {
        getBanks();
    }, []);

    const getBanks = async () =>{
        const bank = await getBank();
        setBank(bank);
    }


    const onTextChange = (name) => (value) => {
        setData({
            ...data,
            [name]: value,
        });
        setError({ error: false })
    };

    const getApi = async () => {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        formData.append('user_id', value);
        formData.append('bank_name', data.value);
        formData.append('account_holder_name', data.name);
        formData.append('ifsc', data.ifsc);
        formData.append('account_number', data.acNo);
        {
            data.upi ?
                formData.append('upi_id', data.upi) : null
        }
        {
            data.image ?
                formData.append('qr_code', image) : null
        }
        if (value) {
            await axios.post(
                ApiUrl + api + addBankDetails,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                        "Content-Type": "multipart/form-data",
                        Accept: 'application/json'
                    },
                }
            ).then((response) => {
                console.log("ressssss",response.data)
                if (response.data.status === 'success') {
                    setLoad(false);
                    setVisible(true)
                    setMessage(response.data.message)
                    setTimeout(() => {
                        props.navigation.navigate('AllPayment',{id :''});
                    }, 1000);
                    setData('')

                } else {
                    setMessage('Please Fill all Fields')
                }
            }).catch((error) => {
                setMessage(error)
                console.log("error", error)
            })
        }
    }

    const openImagePicker = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 120,
            cropping: true
        }).then(image => {
            let fileName = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
            const imageObject = {
                name: fileName,
                type: 'image/jpeg',
                uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
                photoName: image.name
            };
            setImage(imageObject)
        });
    };

    const onSubmit = () => {
        if (checked === 'first') {
            if (!data.value) {
                setError({ bankErr: 'Bank name is required.' });
            } else if (!data.name) {
                setError({ nameErr: 'Enter Account Holders Name.' });
            } else if (!data.ifsc) {
                setError({ ifscErr: 'Enter your IFSC Code.' });
            } else if (!data.acNo) {
                setError({ acErr: 'Enter your Account Number' });
            } else {
                setLoad(true)
                getApi();
            }
        } else if (checked === 'second') {
            if (data.upi === '') {
                setError({ upiErr: 'Enter your UPI ID' });
            } else {
                setLoad(true)
                getApi();
            }
        }
        else if (checked === 'third') {
            setLoad(true)
            getApi();
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Add account details'} props={props} />
            <View style={{ flex: 0.73 }}>
                <View style={styles.radio}>
                    <RadioButton
                        value="first"
                        color={color.yellow}
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <Text style={[styles.title, { fontWeight: checked === 'first' ? '700' : '600' }]}>Bank Account Details</Text>

                </View>
                {checked === 'first' ?
                    <View style={styles.radioContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={bank}
                            containerStyle={styles.containerStyle}
                            // search
                            maxHeight={300}
                            labelField="name"
                            valueField="id"
                            placeholder={!isFocus ? 'Bank' : '...'}
                            searchPlaceholder="Search..."
                            value={data.value}
                            itemTextStyle={{ color: "black" }}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setData({ value: item.id });
                                setIsFocus(false)
                                setError(false)
                            }}
                        />

                        {error.bankErr ? <Text style={styles.errorStyle}>{error.bankErr}</Text> : null}
                        <TextInput
                            style={styles.input}
                            // onChangeText={(text) => setName(text)}
                            value={data.name}
                            placeholder="Account holders name"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("name")}

                        />
                        {error.nameErr ? <Text style={styles.errorStyle}>{error.nameErr}</Text> : null}

                        <View style={styles.ifsc}>
                            <TextInput
                                style={{
                                    width: '88%', marginLeft: 5, color: '#7F8192',
                                }}
                                onChangeText={onTextChange("ifsc")}
                                value={data.ifsc}
                                placeholder="IFSC"
                                placeholderTextColor={'#7F8192'}
                            />
                            <TouchableOpacity>
                                <AntDesign name="questioncircleo" size={20} style={styles.questionCircle} />

                            </TouchableOpacity>

                        </View>

                        {error.ifscErr ? <Text style={styles.errorStyle}>{error.ifscErr}</Text> : null}

                        <View style={styles.ifsc}>
                            <TextInput
                                style={{ width: '88%', marginLeft: 5, color: '#7F8192' }}
                                onChangeText={onTextChange("acNo")}
                                value={data.acNo}
                                placeholder="Account Number"
                                placeholderTextColor={'#7F8192'}
                            />
                            <TouchableOpacity>
                                <AntDesign name="questioncircleo" size={20} style={styles.questionCircle} />

                            </TouchableOpacity>

                        </View>
                        {error.acErr ? <Text style={styles.errorStyle}>{error.acErr}</Text> : null}

                    </View> : null}


                <View style={styles.radio}>
                    <RadioButton
                        value="second"
                        color={color.yellow}
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                    <Text style={[styles.title, { fontWeight: checked === 'second' ? '700' : '600' }]}>UPI Details</Text>
                </View>


                {checked === 'second' ?
                    <View>
                        <View style={styles.viewConatiner}>
                            <TextInput
                                style={styles.input}
                                onChangeText={onTextChange("upi")}
                                value={data.upi}
                                placeholder="Enter Your UPI ID"
                                placeholderTextColor={'#7F8192'}
                            />
                        </View>

                        {error.upiErr ? <Text style={styles.errorStyle}>{error.upiErr}</Text> : null}
                    </View>

                    : null}

                <View style={styles.radio}>
                    <RadioButton
                        value="third"
                        color={color.yellow}
                        status={checked === 'third' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('third')}
                    />
                    <Text style={[styles.title, { fontWeight: checked === 'third' ? '700' : '600' }]}>Upload QR Code</Text>
                </View>

                {checked === 'third' ?
                    <View style={styles.viewConatiner}>
                        <TouchableOpacity style={styles.uploadView} onPress={() => openImagePicker()}>
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </TouchableOpacity>
                        {image.uri ?
                            <Image source={{ uri: image.uri }} style={{ marginTop: 20, height: 120, width: 120 }} /> : null}
                    </View> : null}

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
                {/* <TouchableOpacity style={styles.submitView} onPress={() => props.navigation.navigate('BookHistory')}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity> */}
            </View>

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
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 0.14
    },
    input: {
        height: 57,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192',
        marginTop: 12,
        backgroundColor: '#F5F6FA'
    },
    submitText: { color: color.darkBlack, fontSize: 14, fontFamily: Font.acari, fontWeight: '600', textAlign: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    dropdown: {
        height: 57,
        backgroundColor: '#F5F6FA',
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    submitView: { backgroundColor: color.yellow, marginTop: 20, height: 55, justifyContent: 'center', borderRadius: 10, marginLeft: 15, marginRight: 15 },
    placeholderStyle: {
        fontSize: 16,
        color: '#7F8192',

    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#7F8192',

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    uploadView: { backgroundColor: '#ECEAFF', width: 100, justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderColor: color.darkBlue, marginTop: 10 },
    uploadText: { padding: 18, color: color.darkBlue, fontSize: 12, fontWeight: '400', textAlign: 'center' },
    ifsc: { height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' },
    radio: { flexDirection: 'row', alignItems: 'center', paddingLeft: 7, paddingRight: 7, marginTop: 10 },
    radioContainer: { marginTop: 10, marginBottom: 10, paddingLeft: 15, paddingRight: 15 },
    questionCircle: { marginLeft: 10 },
    viewConatiner: { paddingLeft: 15, paddingRight: 15 },
    containerStyle: { borderRadius: 15, borderWidth: 1, borderColor: 'gray' },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    submit: { flex: 0.13, marginLeft: 15, marginRight: 15 },
    errorStyle: { color: 'red', fontSize: 13, fontWeight: '500', marginTop: 8 },

})