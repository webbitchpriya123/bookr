import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';


export default function ReSell(props) {
    const [images, setImages] = useState([]);
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
    const [isbn, setIsbn] = useState('');

    console.log("setstate", images)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
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

            <View style={styles.container}>
                <Text style={styles.title}>Enter your book details</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: '#F5F6FA' }]}
                    onChangeText={(text) => setIsbn(text)}
                    value={isbn}
                    placeholder="ISBN (optional)"
                    placeholderTextColor={'#7F8192'}
                />
                <Text style={[styles.title, { marginTop: 15 }]}>Add your book images</Text>
                {images.slice(0, 3).length ?
                    <FlatList
                        data={images.slice(0, 3)}
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
                    /> : null}
                <TouchableOpacity onPress={openImagePicker} style={styles.imageContainer}>
                    <AntDesign name="pluscircleo" size={35} color={color.darkBlue} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>

            </View>
            <View style={styles.submitFlex}>
                <TouchableOpacity style={styles.submitView} onPress={() => props.navigation.navigate('BookHistory')}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 0.15
    },
    input: {
        height: 57,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192'
    },
    submitText: { color: color.darkBlack, fontSize: 14, fontFamily: Font.acari, fontWeight: '600', textAlign: 'center' },
    container: { padding: 15, flex: 0.72 },
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
    remove: { borderWidth: 1, borderColor: 'red', alignSelf: 'center', borderRadius: 30, marginTop: 5 },
    submitFlex: { flex: 0.13, paddingLeft: 15, paddingRight: 15 }


})