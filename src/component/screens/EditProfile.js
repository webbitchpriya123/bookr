import React, { useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import Header from "../header/header";
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import { Dropdown } from 'react-native-element-dropdown';
import { useScrollToTop } from '@react-navigation/native';



export default function EditProfile(props) {
    const scrollRef = useRef(null);

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
    const states = [
        { label: 'Andrapradesh', value: '1' },
        { label: 'Arunachal Pradesh', value: '2' },
        { label: 'Assam', value: '3' },
        { label: 'Bihar', value: '4' },
        { label: 'Goa', value: '5' },
        { label: 'Tamil Nadu', value: '6' },
        { label: 'Sikkim', value: '7' },
        { label: 'Uttar Pradesh', value: '8' },
    ]

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
            [name]: value.value,
        });
        setError({ error: false })

    }



    const onSubmit = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        if (!state.Name || !state.Email || !state.Phone) {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true
            });
        } if (!state.Name) {
            setError({ nameError: 'Name is required.' });
        } else if (!state.Email) {
            setError({ emailError: 'Email is required.' });
        }
        else if (!strongRegex.test(state.Email)) {
            setError({ emailError: 'Invalid Email' });
        }
        else if (!state.Phone) {
            setError({ phoneError: 'PhoneNumber is required.' });
        }
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
            setState({ state: '' })
            alert('submitted successfully!!!')
        }

    }



    // console.log("state", state)
    return (
        <SafeAreaView style={styles.containerView}>
            <Header />
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.flexContainer}>
                        <View >
                            <Image source={{ uri: 'https://img.freepik.com/free-vector/portrait-boy-with-brown-hair-brown-eyes_1308-146018.jpg' }} style={styles.imageContainer} />
                            <Text style={styles.userName}>Andrew Ainsley</Text>
                            <Text style={styles.number}>+91 8745946943</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.name}>Name</Text>
                        <TextInput
                            value={state.Name}
                            style={[styles.input, { borderWidth: state.Name || error.nameError ? 1 : 0, borderColor: state.Name || error.nameError ? 'gray' : '', backgroundColor: state.Name || error.nameError ? color.white : '#F5F6FA' }]}
                            placeholder="Andrew Ainsely"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Name")}
                        />

                        {error.nameError ? <View><Text style={styles.errorStyle}>{error.nameError}</Text></View> : null}
                        <Text style={styles.name}>Email</Text>

                        <TextInput
                            value={state.Email}
                            style={[styles.input, { borderWidth: state.Email || error.emailError ? 1 : 0, borderColor: state.Email || error.emailError ? 'gray' : '', backgroundColor: state.Email || error.emailError ? color.white : '#F5F6FA' }]}
                            placeholder="andrew@gmail.com"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Email")}
                        />
                        {error.emailError ? <Text style={styles.errorStyle}>{error.emailError}</Text> : null}
                        <Text style={styles.name}>Phone Number</Text>

                        <TextInput
                            style={[styles.input, { borderWidth: state.Phone || error.phoneError ? 1 : 0, borderColor: state.Phone || error.phoneError ? 'gray' : '', backgroundColor: state.Phone || error.phoneError ? color.white : '#F5F6FA' }]}
                            value={state.Phone}
                            placeholder="+91 9878748978"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Phone")}
                            keyboardType="numeric"
                            maxLength={10}

                        />
                        {error.phoneError ? <Text style={styles.errorStyle}>{error.phoneError}</Text> : null}

                        <Text style={styles.name}>State</Text>
                        <Dropdown
                            style={[styles.dropdown, { borderWidth: state.state || state.stateError ? 1 : 0, borderColor: state.state || state.stateError ? 'gray' : '', backgroundColor: state.state || error.stateError ? color.white : '#F5F6FA' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={states}
                            containerStyle={{ borderRadius: 15,backgroundColor:'red',marginBottom:40}}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'State' : '...'}
                            searchPlaceholder="Search..."
                            value={state.state}
                            itemTextStyle={{ color: color.darkBlack,backgroundColor:'yellow'}}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            // onChange={item => {
                            //     setValue(item.value);
                            //     // setIsFocus(false)
                            // }}
                            onChange={onSelectChange("state")}

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
                                    data={states}
                                    containerStyle={{ borderRadius: 15 }}
                                    // search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
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
                                    onChange={onSelectChange("district")}

                                />
                                {error.districtError ? <Text style={styles.errorStyle}>{error.districtError}</Text> : null}

                            </View>

                            <View style={styles.flex4}>
                                <Text style={styles.name}>City</Text>

                                <Dropdown
                                    style={[styles.dropdown, { borderWidth: state.city || error.cityError ? 1 : 0, borderColor: state.city || error.cityError ? 'gray' : '', backgroundColor: state.city || error.cityError ? color.white : '#F5F6FA' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={states}
                                    containerStyle={{ borderRadius: 15, borderWidth: 1, borderColor: 'gray' }}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'City' : '...'}
                                    searchPlaceholder="Search..."
                                    value={state.city}
                                    itemTextStyle={{ color: color.darkBlack }}
                                    // onFocus={() => setIsFocus(true)}
                                    // onBlur={() => setIsFocus(false)}
                                    // onChange={item => {
                                    //     setValue(item.value);
                                    //     // setIsFocus(false)
                                    // }}
                                    onChange={onSelectChange("city")}

                                />
                                {error.cityError ? <Text style={styles.errorStyle}>{error.cityError}</Text> : null}

                            </View>
                        </View>

                        <Text style={styles.name}>Address</Text>

                        <TextInput
                            style={[styles.input, { borderWidth: state.Address || error.AddressError ? 1 : 0, borderColor: state.Address || error.AddressError ? 'gray' : '', backgroundColor: state.Address || error.AddressError ? color.white : '#F5F6FA' }]}
                            value={state.Address}
                            placeholder="11/24 - AI warsan"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("Address")}

                        />
                        {error.AddressError ? <Text style={styles.errorStyle}>{error.AddressError}</Text> : null}

                        <Text style={styles.name}>Pin code</Text>
                        <TextInput
                            value={state.pinCode}
                            style={[styles.input, { borderWidth: state.pinCode || error.pinError ? 1 : 0, borderColor: state.pinCode || error.pinError ? 'gray' : '', backgroundColor: state.pinCode || error.pinError ? color.white : '#F5F6FA' }]}
                            placeholder="623442"
                            placeholderTextColor={'#7F8192'}
                            onChangeText={onTextChange("pinCode")}
                            maxLength={6}
                            keyboardType="numeric"



                        />
                        {error.pinError ? <Text style={styles.errorStyle}>{error.pinError}</Text> : null}


                        <TouchableOpacity style={styles.submitView} onPress={() => onSubmit()}>
                            <Text style={styles.submitText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>


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
        // backgroundColor: '#F5F6FA'
        // backgroundColor:color.white
    },
    flex7: { flex: 0.67 },
    flex3: { flex: 0.33 },
    flexContainer: { flexDirection: 'row', marginTop: 20, alignSelf: 'center' },
    editProfile: { color: color.red, textAlign: 'right', lineHeight: 21, fontSize: 14, fontWeight: '500', textDecorationLine: 'underline' },
    imageContainer: { height: 120, width: 120, borderRadius: 60, alignSelf: 'center' },
    userName: { fontWeight: '700', fontSize: 20, lineHeight: 24, color: color.black, alignSelf: 'center' },
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
    errorStyle: { color: 'red', fontSize: 13, fontWeight: '500', marginTop: 8 }


})
