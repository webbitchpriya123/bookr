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
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComp from "../header/headerComp";
import { ApiUrl, product, api } from '../constant/constant';
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ReSell(props) {
    const [isbn, setIsbn] = useState('');
    const [isbnErr, setIsbnErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [arrays, setArray] = useState([]);
    const [load, setLoad] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    let imgName = [...arrays];
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

    const validation = images.every(item => item.name && item.path);

    const removeItem = (data, index) => {
        const nameVal = arrays.filter(arrayItem => arrayItem !== index);
        setArray(nameVal);
        data.map((item) => {
            if (item.name === index) {
                item['path'] = '';
            }
            setImages([...data]);
        })
    }

    const openImagePicker = (name) => {
        imgName.push(name);
        setArray(imgName);
        ImagePicker.openPicker({
            width: 100,
            height: 120,
            cropping: true
        }).then(image => {
            let filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)
            images.map((dataItem) => {
                if (dataItem.name === name) {
                    dataItem['path'] = image.path;
                    dataItem['fileName'] = filename;
                    dataItem['name'] = dataItem.name
                }
                setImages([...images])
            })
        });
    };

    useEffect(() => {
        if (validation) {
            setImageErr(false)
        }
    }, [validation]);

    const onRequest = async () => {
        const token = await AsyncStorage.getItem('token');
        const value = await AsyncStorage.getItem('user_id');
        const formData = new FormData();
        // images.forEach((image, index) => {
        //     if(image.path != undefined){
        //     // Append images with a unique key (e.g., image1, image2, etc.)
        //     formData.append(`images[]`, { uri: image.path, name: `image${index + 1}.jpg`, type: 'image/jpeg' });
        //     }
        // });
        images.map((image) => {
            let fileName = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
            const imageObject = {
                name: fileName,
                type: 'image/jpeg',
                uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
                photoName: image.name
            };
            formData.append('images[]', imageObject);
            formData.append('isbn_no', isbn);
            formData.append('page_name', arrays);
            formData.append('user_id', value)
        });

        if (token) {
            console.log('arrayy', arrays)
            await axios.post(
                ApiUrl + api + product,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                        "Content-Type": "multipart/form-data",
                        Accept: 'application/json'
                    },
                }
            ).then((response) => {
                if (response.data.status === true) {
                    setLoad(false);
                    setArray([]);
                    // setImages([]);
                    setVisible(true);
                    setMessage(response.data.message)
                    setTimeout(() => {
                        props.navigation.navigate('Home')
                    }, 1000);
                } else {
                    setArray([]);
                    setImages([]);
                    setVisible(true)
                    setMessage('please upload all mandatory fields.')
                }
            }).catch((error) => {
                setArray([]);
                setImages([]);
                setVisible(true)
                console.log("error", error)
            });
        }
        // console.log("imagesssssssss", formData, Platform.OS)
        // props.navigation.navigate('PaymentDetails')

    }




    const onSubmit = () => {
        if (!isbn) {
            setIsbnErr('ISBN Number Required.');
        } else if (!validation) {
            setImageErr('Please upload all images.');
        } else {
            setLoad(true)
            onRequest();
        }
    }




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
                <FlatList
                    data={images}
                    contentContainerStyle={{ width: windowWidth - 30 }}
                    // horizontal
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={{ padding: 6 }} key={item}>
                            {item.path ?
                                <View>
                                    <Image source={{ uri: item.path }} style={styles.imageUpload} />
                                    <TouchableOpacity onPress={() => removeItem(images, item.name, arrays)} style={styles.remove}>
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

            </View>
            <View style={styles.submitFlex}>
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
            </View>

            {/* <View style={styles.submitFlex}>
                <TouchableOpacity style={styles.submitView} onPress={() => onSubmit()}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
            </View> */}
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
    errorMsg: { fontSize: 14, color: color.red, fontWeight: '500' },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 }

})