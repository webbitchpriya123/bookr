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
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';


export default function ReSell(props) {

    const [images, setImages] = useState([]);

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
    const condition = [
        { label: 'Item 1 Item 1 Item 1 Item 1 Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]

    const removeItem = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: "photo",
        }).then(images => {
            setImages([...images])
        });
    };



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
                        <Text style={styles.notify}>Add your book</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Enter your book details</Text>
                    <View>
                        <TextInput
                            style={[styles.input, { backgroundColor: '#F5F6FA' }]}
                            onChangeText={(text) => setText(text)}
                            value={text}
                            placeholder="sudha murthy english text book"
                            placeholderTextColor={'#7F8192'}
                        />

                        <TextInput
                            style={[styles.input, { marginTop: 12, backgroundColor: '#F5F6FA' }]}
                            onChangeText={(text) => setName(text)}
                            value={name}
                            placeholder="Author Name"
                            placeholderTextColor={'#7F8192'}
                        />

                        <TextInput
                            style={[styles.input, { marginTop: 12, backgroundColor: '#F5F6FA' }]}
                            onChangeText={(text) => setIsbn(text)}
                            value={isbn}
                            placeholder="ISBN (optional)"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            containerStyle={{ borderRadius: 15, borderWidth: 1, borderColor: 'gray' }}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Category' : '...'}
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
                        <View style={{ height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>

                            <TextInput
                                style={{ width: '88%', marginLeft: 5 }}
                                onChangeText={(text) => setIsbn(text)}
                                value={isbn}
                                placeholder="Book printed price"
                                placeholderTextColor={'#7F8192'}
                            />
                            <TouchableOpacity>
                                <AntDesign name="questioncircleo" size={20} style={{ marginLeft: 10 }} />

                            </TouchableOpacity>

                        </View>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={condition}
                            containerStyle={{ borderRadius: 15, borderWidth: 1, borderColor: 'gray' }}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Condition' : '...'}
                            searchPlaceholder="Search..."
                            value={conValue}
                            itemTextStyle={{ color: "black" }}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setConVal(item.value);
                                setIsFocus(false)
                            }}
                        />
                        <TextInput
                            style={[styles.input, { marginTop: 12, borderColor: offer.length ? 'gray' : '', borderWidth: offer.length ? 0.5 : 0, backgroundColor: offer.length ? color.white : '#F5F6FA' }]}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            placeholder="Offered Price"
                            placeholderTextColor={'#7F8192'}
                        />
                    </View>
                    <Text style={[styles.title, { marginTop: 15 }]}>Add your book images</Text>

                    <FlatList
                        data={images}
                        numColumns={3}
                        renderItem={({ item, index }) =>
                            <View style={{ padding: 6 }} key={index}>
                                <Image source={{ uri: item.path }} style={{ height: 130, width: 100 }} />
                                <TouchableOpacity onPress={() => removeItem(index)} style={styles.remove}>
                                    <AntDesign name="close" size={25} color={'red'} />

                                </TouchableOpacity>

                            </View>

                        }
                        keyExtractor={item => item}
                    />

                    <TouchableOpacity onPress={openImagePicker} style={styles.imageContainer}>
                        <AntDesign name="pluscircleo" size={35} color={color.darkBlue} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.submitView} onPress={() => props.navigation.navigate('BookHistory')}>
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
        color: '#7F8192'
    },
    submitText: { color: color.darkBlue, fontSize: 14, fontFamily: Font.acari, fontWeight: '600', textAlign: 'center' },
    container: { padding: 15 },
    imageContainer: { height: 130, backgroundColor: '#ECEAFF', width: 100, justifyContent: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 18, marginTop: 3 },
    dropdown: {
        height: 57,
        backgroundColor: '#F5F6FA',
        borderRadius: 10,
        paddingHorizontal: 8,
        marginTop: 15
    },
    submitView: { backgroundColor: color.yellow, marginTop: 20, height: 55, justifyContent: 'center', borderRadius: 10 },
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
    remove: { borderWidth: 1, borderColor: 'red', alignSelf: 'center', borderRadius: 30, marginTop: 5 }


})