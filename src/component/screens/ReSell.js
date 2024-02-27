import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    Dimensions,
    AsyncStorage
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComp from "../header/headerComp";


export default function ReSell(props) {
    const [isbn, setIsbn] = useState('');
    const [isbnErr, setIsbnErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [images, setImages] = useState([
        {
            name: 'Cover',

        },
        {
            name: 'Spine'

        },
        {
            name: 'Edge Side'

        },
        {
            name: 'Middle'

        },
    ]);

    console.log("imagess",images)
    const validation = images.every(item => item.name && item.path);

    const removeItem = (data, index) => {
        data.map((item) => {
            if (item.name === index) {
                item['path'] = '';
            }
            setImages([...data])
        })
    }

    useEffect(() => {
        if (validation) {
            setImageErr(false)
        }
    }, [validation]);

    const onSubmit = () => {
        if (!isbn) {
            setIsbnErr('ISBN Number Required.');
        } else if (!validation) {
            setImageErr('Please upload all images.');
        } else {
            props.navigation.navigate('PaymentDetails')
        }
    }

    const openImagePicker = (name) => {
        ImagePicker.openPicker({
            width: 100,
            height: 120,
            cropping: true
        }).then(image => {
            console.log("imageeee", image)
            images.map((dataItem) => {
                if (dataItem.name === name) {
                    dataItem['path'] = image.path;
                }
                setImages([...images])
            })
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Add your book'} props={props} />
            <View style={styles.container}>
                <Text style={styles.title}>Enter your book details</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: '#F5F6FA' }]}
                    onChangeText={(text) => {
                        setIsbn(text);
                        setIsbnErr(false)
                    }}
                    value={isbn}
                    placeholder="ISBN (optional)"
                    placeholderTextColor={'#7F8192'}
                />
                {isbnErr ?
                    <View>
                        <Text style={[styles.errorMsg, { marginTop: 10 }]}>{isbnErr}</Text>
                    </View> : null}
                <Text style={[styles.title, { marginTop: 15 }]}>Add your book images</Text>

                {imageErr ?
                    <View>
                        <Text style={[styles.errorMsg, { marginBottom: 10 }]}>{imageErr}</Text>
                    </View> : null}
                {/* <View style={styles.wrap}> */}
                <FlatList
                    data={images}
                    contentContainerStyle={{ justifyContent: 'space-between', width: windowWidth - 30, flexWrap: 'wrap' }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={{ padding: 6 }} key={item}>
                            {item.path ?
                                <View>
                                    <Image source={{ uri: item.path }} style={styles.imageUpload} />
                                    <TouchableOpacity onPress={() => removeItem(images, item.name)} style={styles.remove}>
                                        <AntDesign name="close" size={20} color={'red'} />
                                    </TouchableOpacity>
                                </View> : null}


                            {!item.path ?
                                <TouchableOpacity onPress={() => openImagePicker(item.name)} style={styles.imageContainer}>
                                    <AntDesign name="pluscircleo" size={35} color={color.darkBlue} style={{ alignSelf: 'center' }} />
                                    <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center', color: color.coverImage, marginTop: 5 }}>{item.name}</Text>
                                </TouchableOpacity> : null}
                        </View>
                    }
                    keyExtractor={item => item}
                />
                {/* </View> */}

            </View>
            <View style={styles.submitFlex}>
                <TouchableOpacity style={styles.submitView} onPress={() => onSubmit()}>
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
    submitView: { backgroundColor: color.yellow, marginTop: 20, height: 55, justifyContent: 'center', borderRadius: 10 },
    remove: { borderWidth: 1, backgroundColor: color.white, borderColor: 'red', position: 'absolute', borderRadius: 30, right: -5 },
    submitFlex: { flex: 0.13, paddingLeft: 15, paddingRight: 15 },
    imageUpload: { height: 120, width: 100, marginTop: 8 },
    errorMsg: { fontSize: 14, color: color.red, fontWeight: '500' }


})