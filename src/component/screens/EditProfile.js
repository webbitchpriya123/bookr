import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import { Dropdown } from 'react-native-element-dropdown';
import HeaderComp from "../header/headerComp";
import { ApiUrl, api, editProfile } from '../constant/constant';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from 'react-native-paper';
import { getStates, getDistrict } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import {PushNotification} from '../config/pushNotification';


export default function EditProfile(props) {
    const scrollRef = useRef(null);
    const [load, setLoad] = useState(false);
    const [stateVal, setStateVal] = useState([]);
    const [DistVal, setDistVal] = useState([]);
    const [image, setImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const windowWidth = Dimensions.get('window').width;
    const isFocused = useIsFocused();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);
    useEffect(() => {
        stateValue();
    }, [isFocused]);

    const stateValue = async () => {
        const state = await getStates();
        setStateVal(state);
    }
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //
    
    const DistrictValue = async (id) => {
        const district = await getDistrict(id);
        setDistVal(district);
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
            console.log('imageee', image.uri)
            setImage(imageObject)

        });
    };

    const [state, setState] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Address: '',
        pinCode: '',
        state: '',
        district: '',
        city: ''
    });

    const [error, setError] = useState({
        nameError: false,
        emailError: false,
        phoneError: false,
        AddressError: false,
        pinError: false,
        stateError: false,
        districtError: false,
        cityError: false
    })
    const [isFocus, setIsFocus] = useState(false);

    const onTextChange = (name) => (value) => {
        setState({
            ...state,
            [name]: value,
        });
        setError({ error: false })
    };
    const onSelectChange = (name) => (value) => {
        setState({
            ...state,
            [name]: value.name,
        });
        setError({ error: false })
    }
    const onSubmitVal = async () => {

        try {
            const value = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('user_id', value);
            formData.append('name', state.Name);
            // formData.append('email', state.Email);
            // formData.append('phone', state.Phone);
            formData.append('state', state.state);
            formData.append('district', state.district);
            formData.append('city', state.city);
            formData.append('address', state.Address);
            formData.append('pin_code', state.pinCode);
            formData.append('image', image);
            if (value) {
                console.log("state", token, value, state, formData)
                await axios.post(
                    ApiUrl + api + editProfile,
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + JSON.parse(token),
                            "Content-Type": "multipart/form-data",
                            Accept: 'application/json'
                        },
                    }
                ).then((response) => {
                    console.log("response", response.data)
                    if (response.data.status === 'success') {
                        setLoad(false);
                        setVisible(true)
                        setMessage(response.data.message)
                        setTimeout(() => {
                            props.navigation.navigate('Profile')
                        }, 1000);
                        setState('');


                    } else {
                        setMessage('Please Fill all Fields')
                    }
                }).catch((error) => {
                    setMessage(error)

                    console.log("error", error)
                });
            }
        }
        catch (error) {
            console.error('Error loading stored value:', error);
        }
    }

    const onSubmit = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        if (!state.Name ) {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true
            });
        } if (!state.Name) {
            setError({ nameError: 'Name is required.' });
        } 
        // else if (!state.Email) {
        //     setError({ emailError: 'Email is required.' });
        // }
        // else if (!strongRegex.test(state.Email)) {
        //     setError({ emailError: 'Invalid Email' });
        // }
        // else if (!state.Phone) {
        //     setError({ phoneError: 'PhoneNumber is required.' });
        // }
        else if (!state.state) {
            setError({ stateError: 'State is required.' });
        }
        else if (!state.district) {
            setError({ districtError: 'district is required.' });
        }
        else if (!state.city) {
            setError({ cityError: 'city is required.' });
        }
        else if (!state.Address) {
            setError({ AddressError: 'Address is required.' });
        }
        else if (!state.pinCode) {
            setError({ pinError: 'pinCode is required.' });
        }
        else {
            setLoad(true);
            onSubmitVal();
        }
    }

    console.log("state", image.uri, state.state)
    return (
        <SafeAreaView style={styles.containerView}>
            <HeaderComp props={props} name={'Edit Profile'} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.flexContainer}>
                        <View>
                            <TouchableOpacity onPress={() => openImagePicker()}>
                                {image.uri ?
                                    <Image source={{ uri: image.uri }} style={styles.imageContainer} /> :
                                    <View style={styles.camera}>
                                        <AntDesign name="camerao" size={90} style={{alignSelf:'center'}} />
                                    </View>}
                            </TouchableOpacity>
                            <View >
                            <Text style={styles.userName}>Upload Photo</Text>
                            </View>
                            {/* <Text style={styles.number}>Phone Number</Text> */}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.name}>Name</Text>
                        <TextInput
                            value={state.Name}
                            style={[styles.input, { borderWidth: state.Name || error.nameError ? 1 : 0, borderColor: state.Name || error.nameError ? 'gray' : '', backgroundColor: state.Name || error.nameError ? color.white : '#F5F6FA' }]}
                            placeholder="Name"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Name")}
                        />

                        {error.nameError ? <View><Text style={styles.errorStyle}>{error.nameError}</Text></View> : null}
                        <Text style={styles.name}>Email</Text>

                        <TextInput
                            spellCheck={false}
                            autoCorrect={false}
                            // value={state.Email}
                            style={[styles.input]}
                            placeholder="can't update your Email"
                            editable={false} selectTextOnFocus={false} placeholderTextColor={'#bab9b5'}
                        // onChangeText={onTextChange("Email")}
                        />
                     {/* {error.emailError ? <Text style={styles.errorStyle}>{error.emailError}</Text> : null} */}
                     <Text style={styles.name}>Phone Number</Text> 

                        <TextInput
                            style={[styles.input, { borderWidth: state.Phone || error.phoneError ? 1 : 0, borderColor: state.Phone || error.phoneError ? 'gray' : '', backgroundColor: state.Phone || error.phoneError ? color.white : '#F5F6FA' }]}
                            // value={state.Phone}
                            editable={false} selectTextOnFocus={false} placeholder="can't update your Phone Number"
                            placeholderTextColor={'#bab9b5'}
                            // onChangeText={onTextChange("Phone")}
                            keyboardType="numeric"
                            maxLength={10}

                        />
                        {/* {error.phoneError ? <Text style={styles.errorStyle}>{error.phoneError}</Text> : null} */}

                        <Text style={styles.name}>State</Text>
                        <Dropdown
                            style={[styles.dropdown, { borderWidth: state.state || state.stateError ? 1 : 0, borderColor: state.state || state.stateError ? 'gray' : '', backgroundColor: state.state || error.stateError ? color.white : '#F5F6FA' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={stateVal}
                            containerStyle={{ borderRadius: 15 }}
                            maxHeight={300}
                            labelField="name"
                            valueField="id"
                            placeholder={!isFocus ? 'State' : '...'}
                            searchPlaceholder="Search..."
                            value={state.state}
                            itemTextStyle={{ color: color.darkBlack }}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            // onChange={item => {
                            //     setValue(item.value);
                            //     // setIsFocus(false)
                            // }}

                            onChange={item => {
                                onSelectChange("state")
                                setState(prevState => ({
                                    ...prevState,
                                    state: item.id
                                })); DistrictValue(item.id)
                                setError(false)
                            }
                            }

                        />
                        {error.stateError ? <Text style={styles.errorStyle}>{error.stateError}</Text> : null}

                        <View style={styles.flexEven}>
                            <View style={styles.flex4}>
                                <Text style={styles.name}>District</Text>
                                <Dropdown
                                    style={[styles.dropdown, { borderWidth: state.district || error.districtError ? 1 : 0, borderColor: state.district || error.districtError ? 'gray' : '', backgroundColor: state.district || error.districtError ? color.white : '#F5F6FA' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={DistVal}
                                    containerStyle={{ borderRadius: 15 }}
                                    // search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={!isFocus ? 'District' : '...'}
                                    searchPlaceholder="Search..."
                                    value={state.district}
                                    itemTextStyle={{ color: color.darkBlack }}
                                    // onFocus={() => setIsFocus(true)}
                                    // onBlur={() => setIsFocus(false)}
                                    // onChange={item => {
                                    //     setValue(item.value);
                                    //     // setIsFocus(false)
                                    // }}
                                    onChange={item => {
                                        setState(prevState => ({
                                            ...prevState,
                                            district: item.id
                                        }))

                                        onSelectChange("district")
                                    }
                                    }

                                />
                                {error.districtError ? <Text style={styles.errorStyle}>{error.districtError}</Text> : null}

                            </View>

                            <View style={styles.flex4}>
                                <Text style={styles.name}>City</Text>
                                <TextInput
                                    style={[styles.input, { borderWidth: state.Address || error.AddressError ? 1 : 0, borderColor: state.Address || error.AddressError ? 'gray' : '', backgroundColor: state.Address || error.AddressError ? color.white : '#F5F6FA' }]}
                                    value={state.city}
                                    placeholder="City"
                                    placeholderTextColor={'#7F8192'}
                                    onChangeText={onTextChange("city")}

                                />
                                {error.cityError ? <Text style={styles.errorStyle}>{error.cityError}</Text> : null}

                            </View>
                        </View>

                        <Text style={styles.name}>Address</Text>

                        <TextInput
                            style={[styles.input, { borderWidth: state.Address || error.AddressError ? 1 : 0, borderColor: state.Address || error.AddressError ? 'gray' : '', backgroundColor: state.Address || error.AddressError ? color.white : '#F5F6FA' }]}
                            value={state.Address}
                            placeholder="Address"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Address")}

                        />
                        {error.AddressError ? <Text style={styles.errorStyle}>{error.AddressError}</Text> : null}

                        <Text style={styles.name}>Pin code</Text>
                        <TextInput
                            value={state.pinCode}
                            style={[styles.input, { borderWidth: state.pinCode || error.pinError ? 1 : 0, borderColor: state.pinCode || error.pinError ? 'gray' : '', backgroundColor: state.pinCode || error.pinError ? color.white : '#F5F6FA' }]}
                            placeholder="Pin code"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("pinCode")}
                            maxLength={6}
                            keyboardType="numeric"



                        />
                        {error.pinError ? <Text style={styles.errorStyle}>{error.pinError}</Text> : null}


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

                        {/* <TouchableOpacity style={styles.submitView} onPress={() => onSubmit()}>
                            <Text style={styles.submitText}>SUBMIT</Text>
                        </TouchableOpacity> */}
                    </View>

                </View>
            </ScrollView>
            <Snackbar
                style={{ width: windowWidth - 20 }}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={900}
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
    containerView: { backgroundColor: color.white, flex: 1 },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    input: {
        height: 57,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192',
        marginTop: 12,
    },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    flexContainer: { flexDirection: 'row', marginTop: 20, alignSelf: 'center' },
    imageContainer: { height: 120, width: 120, borderRadius: 60, alignSelf: 'center' },
    userName: { fontWeight: '700', fontSize: 20, color: color.black, alignSelf: 'center' },
    number: { color: color.liteBlack, fontWeight: '500', fontSize: 14, lineHeight: 21, alignSelf: 'center' },
    name: { color: '#151940', fontWeight: '600', fontSize: 14, lineHeight: 15, marginTop: 15 },
    flex4: { flex: 0.48 },
    flexEven: { flexDirection: 'row', justifyContent: 'space-between' },
    submitView: { backgroundColor: color.yellow, marginTop: 20, height: 55, justifyContent: 'center', borderRadius: 10 },
    submitText: { color: color.darkBlack, fontSize: 14, fontFamily: Font.acari, fontWeight: '600', textAlign: 'center' },
    dropdown: {
        height: 57,
        backgroundColor: '#F5F6FA',
        borderRadius: 10,
        paddingHorizontal: 8,
        marginTop: 15,
    },
    icon: {
        marginRight: 5,
    },

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
    errorStyle: { color: 'red', fontSize: 13, fontWeight: '500', marginTop: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    camera:{ alignSelf: 'center',height:90,width:120 }


})
