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
    Dimensions
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { bookDetail } from "../config/getAllApi";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import {PushNotification} from '../config/pushNotification';

export default function BookDetail(props) {
    const windowHeight = Dimensions.get('window').height

    const isFocused = useIsFocused();
    const [bookData, setBookData] = useState([]);
    const [load , setLoad] = useState(false);

    useEffect(() => {
        bookHistory();
        setLoad(true);
    }, [isFocused]);

    console.log("propsss", props.route.params.id)

    const bookHistory = async () => {
        const allBook = await bookDetail(props.route.params.id);
        setBookData(allBook);
        setLoad(false);
    }
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
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
                            placeholder={bookData.isbn_no}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Upload Date</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={moment(bookData.created_at).format('DD/MM/YYYY')}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Approved Date</Text>

                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={bookData.approved_date ? moment(bookData.approved_date).format('DD/MM/YYYY')  : '-'}
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Approved amount</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            placeholder={bookData.amount ? bookData.amount : '-'}
                            placeholderTextColor={'#7F8192'}
                        />


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
                        data={bookData.images}
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
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    container: { padding: 15 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    name: { color: '#151940', fontWeight: '600', fontSize: 14, lineHeight: 15, marginTop: 15 },
    printedView: { height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' }




})