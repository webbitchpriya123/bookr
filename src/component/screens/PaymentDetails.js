import React, { useState } from "react";
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
    TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import * as Images from '../config/constants'
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import { RadioButton } from 'react-native-paper';



export default function PaymentDetails(props) {

    const [images, setImages] = useState([]);
    const [checked, setChecked] = React.useState('first');


    const data = [
        { label: 'Item 1 Item 1 Item 1 Item 1 Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]






    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [offer, setOffer] = useState('');
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [conValue, setConVal] = useState('');

    console.log("setstate", images)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()}>
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Payment details</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
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
                                data={data}
                                containerStyle={styles.containerStyle}
                                // search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Bank' : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                itemTextStyle={{ color: "black" }}
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false)
                                }}
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                placeholder="Account holders name"
                                placeholderTextColor={'#7F8192'}
                            />

                            <View style={styles.ifsc}>
                                <TextInput
                                    style={{ width: '88%', marginLeft: 5,color: '#7F8192',
                                }}
                                    onChangeText={(text) => setIsbn(text)}
                                    value={isbn}
                                    placeholder="IFSC"
                                    placeholderTextColor={'#7F8192'}
                                />
                                <TouchableOpacity>
                                    <AntDesign name="questioncircleo" size={20} style={styles.questionCircle} />

                                </TouchableOpacity>

                            </View>
                            <View style={styles.ifsc}>

                                <TextInput
                                    style={{ width: '88%', marginLeft: 5,color: '#7F8192' }}
                                    onChangeText={(text) => setIsbn(text)}
                                    value={isbn}
                                    placeholder="Account Number"
                                    placeholderTextColor={'#7F8192'}
                                />
                                <TouchableOpacity>
                                    <AntDesign name="questioncircleo" size={20} style={styles.questionCircle} />

                                </TouchableOpacity>

                            </View>
                        </View> : null}






                    <View style={styles.radio}>
                        <RadioButton
                            value="second"
                            color={color.yellow}
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={[styles.title,{ fontWeight: checked === 'second' ? '700' : '600' }]}>UPI Details</Text>

                    </View>


                    {checked === 'second' ?
                        <View style={styles.viewConatiner}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                placeholder="Enter Your UPI ID"
                                placeholderTextColor={'#7F8192'}
                            />
                        </View>


                        : null}


                    <View style={styles.radio}>
                        <RadioButton
                            value="third"
                            color={color.yellow}
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        <Text style={[styles.title,{ fontWeight: checked === 'third' ? '700' : '600' }]}>Upload QR Code</Text>
                    </View>

                    {checked === 'third' ?
                        <View style={styles.viewConatiner}>
                            <TouchableOpacity style={styles.uploadView}>
                                <Text style={styles.uploadText}>UPLOAD</Text>
                            </TouchableOpacity>
                            <Image source={Images.QRCode} style={{ marginTop: 20 }} />
                        </View> : null}

                    <TouchableOpacity style={styles.submitView}>
                        <Text style={styles.submitText}>SUBMIT</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        height: 57,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192',
        marginTop: 12,
        backgroundColor: '#F5F6FA'
    },
    submitText: { color: color.darkBlue, fontSize: 14, fontFamily: Font.acari, fontWeight: '600', textAlign: 'center' },
    container: { padding: 15 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    dropdown: {
        height: 57,
        backgroundColor: '#F5F6FA',
        borderRadius: 10,
        paddingHorizontal: 8,
        // color:'red'
    },
    submitView: { backgroundColor: color.yellow, marginTop: 20, height: 55, justifyContent: 'center', borderRadius: 10, marginLeft: 15, marginRight: 15 },
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
    uploadView: { backgroundColor: '#ECEAFF', width: 100, justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderColor: color.darkBlue, marginTop: 10 },
    uploadText: { padding: 18, color: color.darkBlue, fontSize: 12, fontWeight: '400', textAlign: 'center' },
    ifsc: { height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' },
    radio: { flexDirection: 'row', alignItems: 'center', paddingLeft: 7, paddingRight: 7, marginTop: 10 },
    radioContainer:{ marginTop: 10, marginBottom: 10, paddingLeft: 15, paddingRight: 15 },
    questionCircle:{ marginLeft: 10 },
    viewConatiner:{ paddingLeft: 15, paddingRight: 15 },
    containerStyle:{ borderRadius: 15, borderWidth: 1, borderColor: 'gray' }


})