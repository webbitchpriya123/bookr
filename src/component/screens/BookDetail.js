import React, {
    useState, useEffect
} from "react";
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
    FlatList,
    TextInput,
    ActivityIndicator,
    Dimensions,
    Alert,
    PermissionsAndroid
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { bookDetail, downLoadInvoice, invoiceShow } from "../config/getAllApi";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';
import HeaderComp from "../header/headerComp";
// import RNFS from 'react-native-fs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

// import RNFetchBlob from 'rn-fetch-blob'; // Import rn-fetch-blob for file handling

export default function BookDetail(props) {
    const windowHeight = Dimensions.get('window').height

    const isFocused = useIsFocused();
    const [bookData, setBookData] = useState([]);
    const [load, setLoad] = useState(false);
    const [shows, setShow] = useState(false);

    useEffect(() => {
        bookHistory();
        setLoad(true);
        requestStoragePermission();
    }, [isFocused]);

    // console.log("propsss", props.route.params.id)

    const bookHistory = async () => {
        const allBook = await bookDetail(207);
        const show = await invoiceShow(207);
        setShow(show);
        setBookData(allBook);
        setLoad(false);
    }

    async function requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'This app needs access to your storage to download files.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted');
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }


    const downLoad = async () => {
        const { fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir; // this is the pictures directory. You can check the available directories in the wiki.
        let date = new Date();

        console.log("nafdasdfasf111111",PictureDir)
        const filePath = `${PictureDir}/me_${Math.floor(date.getTime() + date.getSeconds() / 2)}.pdf`; // Define the file path
        console.log("nafdasdfasf2222222",filePath)

        const options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // Setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: filePath, // This is the path where your downloaded file will live in
                description: 'Downloading PDF file.'
            }
        };

        // Prepare your request body
        const requestBody = {
            product_id: 207
        };

        // Stringify the request body
        const requestBodyString = JSON.stringify(requestBody);
        // Construct the fetch options object
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/pdf',
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: requestBodyString // Pass the stringified body
        };
        // Perform the fetch request
        fetch("https://webbitech.co.in/usedbookr/api/download-invoice", fetchOptions)
            .then((res) => {
                console.log("responseeeeee", res._bodyInit.data.blobId);

                const responseBlobId = res._bodyInit.data.blobId;
                const responseOffset = res._bodyInit.data.offset;
                const responseSize = res._bodyInit.data.size;

                // Construct the Blob object using the response data
                const blob = [
                    responseBlobId,
                    '\n',
                    responseOffset,
                    '\n',
                    responseSize
                ];

                // Save the Blob object to the specified path
                fs.writeFile(filePath, blob, 'ascii')
                    .then(() => {
                        console.log('PDF file downloaded successfully.');
                    })
                    .catch((error) => {
                        console.error('Error downloading PDF file:', error);
                    });

            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });

    }


    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //

    console.log("bookData", bookData)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            {/* <HeaderComp name={'Book Details'} props={props} /> */}
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()} >
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Book details</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <Text style={styles.title}>Your book details</Text>
                    <View>
                        <Text style={styles.name}>ISBN</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder={bookData && bookData.isbn_no}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Upload Date</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={bookData && moment(bookData.created_at).format('DD/MM/YYYY')}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Approved Date</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={bookData && bookData.approved_date ? moment(bookData.approved_date).format('DD/MM/YYYY') : '-'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Approved amount</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder={bookData && bookData.amount ? bookData.amount : '-'}
                            placeholderTextColor={'#7F8192'}
                        />

                        {shows && !load ?
                            <View>
                                <Text style={styles.name}>Invoice</Text>
                                <TouchableOpacity style={styles.downLoad} onPress={() => downLoad()}>
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: color.green }}>Download your invoice</Text>
                                    <AntDesign name="download" size={20} color={color.green} />
                                </TouchableOpacity>
                            </View> : null}


                        {/* <Text style={styles.name}>Book printed price</Text>

                        <View style={styles.printedView}>

                            <TextInput
                                style={{ width: '88%', marginLeft: 5 }}
                                onChangeText={(text) => setIsbn(text)}
                                value={isbn}
                                editable={false}
                                placeholder="1300"
                                placeholderTextColor={'#7F8192'}
                            />
                            <TouchableOpacity>
                                <Tooltip title="1300">
                                    <AntDesign name="questioncircleo" size={20} style={{ marginLeft: 10 }} color={color.black} />

                                </Tooltip>

                            </TouchableOpacity>

                        </View> */}

                        {/* <Text style={styles.name}>Condition</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            editable={false}
                            placeholder="Good"
                            placeholderTextColor={'#7F8192'}
                        /> */}

                        {/* <Text style={styles.name}>Offered price</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            editable={false}
                            placeholder="750"
                            placeholderTextColor={'#7F8192'}
                        /> */}

                    </View>
                    <Text style={[styles.title, { marginTop: 15, marginBottom: 10 }]}>Add your book images</Text>

                    <FlatList
                        data={bookData && bookData.images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={{ padding: 6 }} key={index}>
                                <Image source={{ uri: item.path }} style={{ height: 140, width: 100 }} />
                            </View>

                        }
                        keyExtractor={item => item}
                    />
                </View>


            </ScrollView>

            {load ?
                <View style={[styles.loader, { top: windowHeight / 2 }]}>
                    <ActivityIndicator size={'large'} color={color.green} />
                </View> : null}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 90,
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
    downLoad: { height: 60, backgroundColor: color.white, flexDirection: 'row', alignItems: "center", elevation: 10, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, marginTop: 10 },
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    container: { padding: 15, flex: 0.86 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 45 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    name: { color: '#151940', fontWeight: '600', fontSize: 14, lineHeight: 15, marginTop: 15 },
    printedView: { height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' }




})