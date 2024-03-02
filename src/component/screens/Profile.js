import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Header from "../header/header";
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrl, api, getProfile } from '../constant/constant';
import axios from 'axios';



export default function Profile(props) {

    const [load, setLoad] = useState(true);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        getProfile();
        setLoad(true);
    }, []);

    // Function to load stored value
    const getProfile = async () => {
        try {
            const value = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('token');
            if (value) {
                axios({
                    method: 'post',
                    url: ApiUrl + api + getProfile,
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    },
                    data: {
                        user_id: value,
                    }
                }).then((response) => {
                    if(response.data.result === true){
                        setProfile(response.data.data);
                        setLoad(false);
                    }else{
                        alert('failed')
                    }
                }).catch((error) => {
                    console.log("error", error)
                });
            }
        }
        catch (error) {
            console.error('Error loading stored value:', error);
        }
    };

    return (
        <SafeAreaView style={styles.containerView}>
            <Header props={props} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.flexContainer}>
                        <View style={styles.flex7}>
                            <View style={styles.flexEnd}>
                                <Image source={{ uri: profile.image }} style={styles.imageContainer} />
                                <Text style={styles.userName}>Andrew Ainsley</Text>
                                <Text style={styles.number}>+91 8745946943</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.flex3} onPress={() => props.navigation.navigate('EditProfile')}>
                            <Text style={styles.editProfile}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.name}>Name</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder={profile.name ? profile.name : 'Name'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Email</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={profile.email ? profile.email : 'Email'}
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>Phone Number</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={profile.phone ? profile.phone : 'Phone Number'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>State</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder= {profile.state ? profile.state : 'State'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <View style={styles.flexEven}>
                            <View style={styles.flex4}>
                                <Text style={styles.name}>District</Text>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                    placeholder= {profile.district ? profile.district : 'District'}
                                    placeholderTextColor={'#7F8192'}
                                />
                            </View>
                            <View style={styles.flex4}>
                                <Text style={styles.name}>City</Text>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                    placeholder={profile.city ? profile.city :'City'}
                                    placeholderTextColor={'#7F8192'}
                                />
                            </View>
                        </View>

                        <Text style={styles.name}>Address</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={profile.address ? profile.address :'Address'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Pin code</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder={profile.pin_code ? profile.pin_code :'Pin Code'}
                            placeholderTextColor={'#7F8192'}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.removeItem('user_id');
                        props.navigation.navigate('Login')
                    }} style={[styles.flexContainer, { alignItems: 'center', marginBottom: 15 }]}>
                        <MaterialCommunityIcons name="logout" size={25} color={color.red} />
                        <Text style={styles.logout} >Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {load ?
                <View style={{ flex: 0.45 }}>
                    <ActivityIndicator size="large" color={color.black} />
                </View> : null}


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
        backgroundColor: '#F5F6FA'
    },
    flex7: { flex: 0.67 },
    flex3: { flex: 0.33 },
    flexContainer: { flexDirection: 'row', marginTop: 20 },
    editProfile: { color: color.red, textAlign: 'right', lineHeight: 21, fontSize: 14, fontWeight: '500', textDecorationLine: 'underline' },
    imageContainer: { height: 120, width: 120, borderRadius: 60, alignSelf: 'center' },
    userName: { fontWeight: '700', fontSize: 20, lineHeight: 24, color: color.black, alignSelf: 'center' },
    number: { color: color.liteBlack, fontWeight: '500', fontSize: 14, lineHeight: 21, alignSelf: 'center' },
    flexEnd: { alignSelf: 'flex-end' },
    name: { color: '#151940', fontWeight: '600', fontSize: 14, lineHeight: 15, marginTop: 15 },
    flex4: { flex: 0.48 },
    flexEven: { flexDirection: 'row', justifyContent: 'space-between' },
    logout: { fontSize: 14, color: color.red, fontWeight: '500', lineHeight: 21, fontFamily: Font.acari }


})
