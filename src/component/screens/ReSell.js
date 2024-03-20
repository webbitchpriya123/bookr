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
    ActivityIndicator,
    Alert,
    BackHandler,
    ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import ImagePicker from 'react-native-image-crop-picker';
import { ApiUrl, product, api } from '../constant/constant';
import axios from 'axios';
import { Snackbar, Checkbox } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';
import LinearGradient from 'react-native-linear-gradient';
import { bookDetail, getAllBook, updateDraft } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";


export default function ReSell(props) {
    const [isbn, setIsbn] = useState('');
    const [isbnErr, setIsbnErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [arrays, setArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [checkErr, setCheckErr] = useState('');
    const isFocused = useIsFocused();
    const [imageName, setImgName] = useState('');
    const [camera, setCamera] = useState(false)


    const windowWidth = Dimensions.get('window').width;
    let imgName = [...arrays];
    const [images, setImages] = useState([
        {
            name: 'Cover',
            fileName: '',
        },
        {
            name: 'Spine',
            fileName: '',
        },
        {
            name: 'Edge Side',
            fileName: ''
        },
        {
            name: 'Middle',
            fileName: ''
        },
        {
            name: 'Back Cover',
            fileName: ''
        },
    ]);


    // console.log("imgaeeee", imageName)
    const validation = images.every(item => item.name && item.path);
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage);
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //


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

    const openCamera = () => {
        setCamera(false);
        imgName.push(imageName);
        setArray(imgName);
        ImagePicker.openCamera({
            width: 300,
            height: 450,
            cropping: true
        }).then(image => {
            let filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)
            images.map((dataItem) => {
                if (dataItem.name === imageName) {
                    dataItem['path'] = image.path;
                    dataItem['fileName'] = filename;
                    dataItem['name'] = dataItem.name
                }
                setImages([...images])
            })
        });
    }

    const openImagePicker = () => {
        setCamera(false);
        imgName.push(imageName);
        setArray(imgName);
        ImagePicker.openPicker({
            width: 300,
            height: 450,
            cropping: true
        }).then(image => {
            // if (image.path) {
            let filename = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length)
            images.map((dataItem) => {
                if (dataItem.name === imageName) {
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
    }, [validation, isFocused]);

    const bookData = async () => {
        const allBook = await bookDetail(props.route.params.bookId);
        if (allBook) {
            setIsbn(allBook.isbn_no);
            const newData = images.map((item) => {
                const matchedImage = allBook.images.find(img => item.name === img.name);
                if (matchedImage) {
                    imgName.push(item.name);
                    setArray(imgName);
                    return {
                        ...item,
                        name: matchedImage.name,
                        path: matchedImage.path
                    };
                }
                return item;
            });
            setImages(newData);
        }
    }


    // console.log("imagedata", images)
    useEffect(() => {
        bookData();
    }, [isFocused, props.route.params.bookId])


    const validate = () => {
        setLoad(false);
        setArray([]);
        setIsbn('');
        setChecked(false);
        setVisible(true);
    }
    const onRequest = async (data) => {
        const token = await AsyncStorage.getItem('token');
        const value = await AsyncStorage.getItem('user_id');
        const dataVal = data === 'draft' ? 1 : 0
        const book = await getAllBook();
        const valid = book.filter(item => { return item.id === props.route.params.bookId });
        if (valid.length) {
            // console.log("draftupdate", images, arrays, isbn, props.route.params.bookId)
            const newForm = new FormData();
            images.map((image) => {
                if (image.path) {
                    let fileName = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
                    const imageObject = {
                        name: fileName,
                        type: 'image/jpeg',
                        uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
                        photoName: image.name
                    };
                    newForm.append('images[]', imageObject);
                }
            });
            newForm.append('isbn_no', isbn);
            newForm.append('page_name', arrays);
            newForm.append('user_id', value);
            newForm.append('product_id', props.route.params.bookId)
            const response = await updateDraft(newForm);
            if (response && response.status === true) {
                validate();
                images.forEach((item) => {
                    item['path'] = '';
                });
                setMessage(response.message)
                setTimeout(() => {
                    props.navigation.goBack();
                }, 1000);
            } else {
                validate();
                setMessage('please upload all mandatory fields.')
            }

        } else {
            const formData = new FormData();
            images.map((image) => {
                if (image.path) {
                    let fileName = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
                    const imageObject = {
                        name: fileName,
                        type: 'image/jpeg',
                        uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
                        photoName: image.name
                    };
                    formData.append('images[]', imageObject);
                }
            });

            formData.append('isbn_no', isbn);
            formData.append('page_name', arrays);
            formData.append('user_id', value)
            formData.append('draft', dataVal)
            if (token) {
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
                        validate();
                        images.forEach((item) => {
                            item['path'] = '';
                        });
                        setMessage(response.data.message)
                        setTimeout(() => {
                            props.navigation.goBack();
                        }, 1000);
                    } else {
                        validate();
                        setMessage('please upload all mandatory fields.')
                    }
                }).catch((error) => {
                    // setArray([]);
                    // setImages([]);
                    setVisible(true);
                    setChecked(false);
                    console.log("error", error)
                });
            }
        }
    }

    // console.log("arraysbackkkk", arrays)

    const onSubmit = () => {
        if (!isbn) {
            setIsbnErr('ISBN Number Required.');
        }
        else if (!validation) {
            setImageErr('Please upload all images.');
        }
        else if (!checked) {
            setCheckErr('Please check the terms and condition')
        }
        else {
            setLoad(true);
            onRequest('submit');
        }
    }

    const draft = () => {
        props.navigation.navigate('Draft');
        setIsbn('');
        images.map((item) => {
            item['path'] = ''
        })
    }

    const handleBackButton = async () => {
        const book = await getAllBook();
        const valid = book.filter(item => { return item.id === props.route.params.bookId });
        if (isbn) {
            Alert.alert(
                'UsedBookr',
                'Are you sure you want to save the draft?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => props.navigation.goBack(),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            if (valid.length) {
                                props.navigation.goBack();
                            } else {
                                onRequest('draft');
                            }

                        }
                    },
                ],
                {
                    cancelable: false,
                }
            );
            return true;
        } else {
            props.navigation.goBack();
        }
    };


    useEffect(() => {
        if (props.route.name === "ReSell") {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            };
        } else {
            props.navigation.goBack();
        }
    }, [isbn, arrays]);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            {/* <HeaderComp name={'Add your book'} props={props} /> */}

            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={[styles.linearGradient]}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={handleBackButton}>
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.65 }}>
                        <Text style={styles.notify}>Add your book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.2 }} onPress={() => draft()}>
                        <Text style={styles.draft}>My Drafts</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>


            <View style={styles.container}>
                <ScrollView>

                    <Text style={styles.title}>Enter your book details</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: '#F5F6FA' }]}
                        onChangeText={(text) => {
                            setIsbn(text);
                            setIsbnErr(false);

                        }}
                        // editable={valid ? false:true}
                        value={isbn}
                        placeholder="ISBN"
                        placeholderTextColor={'#7F8192'}
                        maxLength={16}
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
                                    <TouchableOpacity onPress={() => {
                                        setCamera(true)
                                        // openImagePicker(item.name)
                                        setImgName(item.name)
                                    }} style={styles.imageContainer}>
                                        <AntDesign name="pluscircleo" size={35} color={color.darkBlue} style={{ alignSelf: 'center' }} />
                                        <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center', color: color.coverImage, marginTop: 5 }}>{item.name}</Text>
                                    </TouchableOpacity> : null}
                            </View>
                        }
                        keyExtractor={item => item}
                    />
                </ScrollView>

            </View>

            {checkErr ?
                <View>
                    <Text style={[styles.errorMsg, { marginTop: 10, marginLeft: 15 }]}>{checkErr}</Text>
                </View> : null}
            <View style={styles.check}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    color={color.green}
                    onPress={() => {
                        setChecked(!checked);
                        setCheckErr(false);
                    }}
                />
                <Text style={styles.agree}>I agree to the</Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => props.navigation.navigate('Terms')}>
                    <Text style={styles.condition}>terms and conditions</Text>
                </TouchableOpacity>

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
            {camera ?

                <View style={{ height: 90, backgroundColor: 'white', elevation: 10, padding: 15 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }} onPress={() => openCamera()}>
                        <AntDesign name="camerao" size={25} color={color.terms} />
                        <Text style={{ fontWeight: '500', fontSize: 16, color: color.black, marginLeft: 10 }}>Take from camera</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginTop: 7 }} onPress={() => openImagePicker()}>
                        <AntDesign name="picture" size={25} color={color.terms} />
                        <Text style={{ fontWeight: '500', fontSize: 16, color: color.black, marginLeft: 10 }}>Take from gallery</Text>

                    </TouchableOpacity>
                </View> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 95,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 0.15
    },
    input: {
        height: 60,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192'
    },
    container: { padding: 15, flex: 0.72 },
    imageContainer: { height: 130, backgroundColor: '#ECEAFF', width: 100, justifyContent: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 50 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 18, marginTop: 3 },
    remove: { borderWidth: 1, backgroundColor: color.white, borderColor: 'red', position: 'absolute', borderRadius: 30, right: -5 },
    submitFlex: { flex: 0.13, paddingLeft: 15, paddingRight: 15 },
    imageUpload: { height: 120, width: 100, marginTop: 8 },
    errorMsg: { fontSize: 14, color: color.red, fontWeight: '500' },
    loginText: { alignSelf: 'flex-end', fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 55, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },
    loaderView: { flexDirection: 'row', alignItems: 'center', height: 55 },
    check: { marginLeft: 15, marginRight: 15, flexDirection: 'row', alignItems: 'center' },
    agree: { fontWeight: '500', color: color.terms, fontSize: 14 },
    condition: { fontWeight: '500', color: color.black, fontSize: 14, textDecorationLine: 'underline' },
    draft: { fontWeight: '500', fontSize: 14, color: '#FFCB00', fontFamily: Font.acari, textDecorationLine: 'underline' },

})