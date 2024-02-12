import React, { useState } from "react";
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Profile() {

   
    return (
        <SafeAreaView style={styles.containerView}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.flexContainer}>
                        <View style={styles.flex7}>
                            <View style={styles.flexEnd}>
                                <Image source={{ uri: 'https://img.freepik.com/free-vector/portrait-boy-with-brown-hair-brown-eyes_1308-146018.jpg' }} style={styles.imageContainer} />
                                <Text style={styles.userName}>Andrew Ainsley</Text>
                                <Text style={styles.number}>+91 8745946943</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.flex3}>
                            <Text style={styles.editProfile}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.name}>Name</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder="Andrew Ainsely"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>Email</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder="andrew@gmail.com"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>Phone Number</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder="+91 9878748978"
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>State</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder="TamilNadu"
                            placeholderTextColor={'#7F8192'}
                        />


                        <View style={styles.flexEven}>
                            <View style={styles.flex4}>
                                <Text style={styles.name}>District</Text>
                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                    placeholder="Coimbatore"
                                    placeholderTextColor={'#7F8192'}
                                />

                            </View>
                            <View style={styles.flex4}>
                                <Text style={styles.name}>City</Text>

                                <TextInput
                                    style={styles.input}
                                    editable={false}
                                    placeholder="R.S Puram"
                                    placeholderTextColor={'#7F8192'}
                                />
                            </View>
                        </View>

                        <Text style={styles.name}>Address</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder="11/24 - AI warsan"
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Pin code</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder="623442"
                            placeholderTextColor={'#7F8192'}
                        />
                    </View>
                    <TouchableOpacity style={[styles.flexContainer, { alignItems: 'center', marginBottom: 15 }]}>
                        <MaterialCommunityIcons name="logout" size={25} color={color.red} />
                        <Text style={styles.logout} >Logout</Text>

                    </TouchableOpacity>
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
