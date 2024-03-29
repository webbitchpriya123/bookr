import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, RefreshControl,Linking, FlatList, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import YoutubePlayer from "react-native-youtube-iframe";
import Header from '../header/header';
import { accountStatus, bookCounts, getYoutube } from "../config/getAllApi";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';
import { useIsFocused } from "@react-navigation/native";
import BannerView from '../header/bannerView';
// import HeaderComp from "../header/headerComp";





const Home = (props) => {
    const isFocused = useIsFocused();
    // const [booksts, setBookSts] = useState({});
    const [acSts, setAcSts] = useState({});
    const [arr, setArr] = useState([]);
    const [link, setLink] = useState();

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage);
            loadStoredValue();
        });

        const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("message", remoteMessage)
        });

        return () => {
            unsubscribeOnMessage();
            unsubscribeOnNotificationOpenedApp();
        }
            ;
    }, []); //

    useEffect(() => {
        loadStoredValue();
    }, [isFocused]);

    const loadStoredValue = async () => {
        var arr = [];
        const account = await accountStatus();
        const uTube = await getYoutube();
        uTube.map((item) => {
            arr.push(item.link);
        })
        setLink(arr);
        setAcSts(account);
        const bookStatus = await bookCounts();
        const array = [];
        if (bookStatus.soldbook) {
            array.push({
                number: bookStatus.soldbook,
                status: 'Sold books'
            });
        } else {
            array.push({
                number: 0,
                status: 'Sold books'
            });
        }
        if (bookStatus.approvedbook) {
            array.push({
                number: bookStatus.approvedbook,
                status: 'Approved'
            });
        } else {
            array.push({
                number: 0,
                status: 'Approved'
            });
        }
        if (bookStatus.declinedbook) {
            array.push({
                number: bookStatus.declinedbook,
                status: 'Declined'
            });
        } else {
            array.push({
                number: 0,
                status: 'Declined'
            });
        }
        setArr(array);
        // setBookSts(bookStatus);
    };


    const windowWidth = Dimensions.get('window').width;
    const [playing, setPlaying] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
    const chatUs = 'CHAT WITH US >'

    const sendWhatsAppMessage = () => {
        const phoneNumber = '+91 8754685595'; // Replace with the recipient's phone number
        const message = 'Hello, this is a test message!'; // Replace with your desired message
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}&phone=${encodeURIComponent(phoneNumber)}`)
            .then(() => console.log('WhatsApp opened'))
            .catch((err) => console.error('An error occurred: ', err));
    };

    console.log("logss", windowWidth / 3.5)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadStoredValue();
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header props={props} />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.conatiner}>
                    <Text style={styles.title}>Dashboard</Text>
                    <FlatList
                        data={arr}
                        contentContainerStyle={{ justifyContent: 'space-between', width: windowWidth - 30 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('BookHistory')} style={{ height: windowWidth / 3.74, backgroundColor: index === 0 ? '#574AC9' : index === 1 ? '#7E6FFF' : '#585190', width: windowWidth / 3.74, borderRadius: 10, marginLeft: 8, marginRight: 8, justifyContent: 'center' }}>
                                    <Text style={styles.number}>{item.number}</Text>
                                    <Text style={styles.status}>{item.status}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.id}
                    />
                    <BannerView />
                    <View style={{ marginTop: 20 }} >
                        <Text style={styles.title}>Sell your Books</Text>

                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ReSell', { bookId: "" })} style={styles.sellContainer}>
                        <Text style={styles.sellBooks}>Sell your book</Text>
                        <View style={styles.arrowBox}>
                            <AntDesign name="arrowright" color={color.darkBlue} size={25} style={{ alignSelf: 'center' }} />
                        </View>

                    </TouchableOpacity>
                    {acSts?.status === true ?
                        <TouchableOpacity onPress={() => props.navigation.navigate('PaymentDetails')} style={[styles.sellContainer, { marginTop: 15, backgroundColor: '#FFCB00' }]}>
                            <Text style={[styles.sellBooks, { color: color.black }]}>AccountDetails</Text>
                            <View style={styles.arrowBox}>
                                <AntDesign name="arrowright" color={color.darkBlue} size={25} style={{ alignSelf: 'center' }} />
                            </View>

                        </TouchableOpacity> : null}
                    <View style={{ marginTop: 20 }}>
                        <YoutubePlayer
                            height={230}
                            play={playing}
                            volume={100}
                            videoId={"PR34ztnnTjI"}
                            onChangeState={onStateChange}
                            playList={link}
                        />
                    </View>
                    <View  >
                        <Text style={styles.chatText}>Chat with us</Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => sendWhatsAppMessage()}>
                        <View style={styles.accountContainer}>
                            <View style={styles.flex2}>
                                <FontAwesome name="whatsapp" color={'#20B038'} size={50} style={{ alignSelf: 'center' }} />
                            </View>
                            <View style={styles.flex6}>
                                <Text style={styles.needHelp}>Need Help?</Text>
                                <Text style={styles.chatUs}>{chatUs}</Text>
                            </View>
                            <TouchableOpacity style={styles.flex2}>
                                <AntDesign size={25} name="arrowright" color={color.darkBlack} style={styles.arrowRight} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </SafeAreaView >

    )
}
export default Home;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    flex2: { flex: 0.2 },
    flex6: { flex: 0.6 },
    sellBooks: { color: color.white, fontSize: 18, fontWeight: '500', fontFamily: font.acari, margin: 12 },
    education: { color: color.white, fontWeight: '600', fontSize: 12, marginTop: 5, letterSpacing: 2, lineHeight: 17 },
    perchant: { color: color.white, fontWeight: '700', fontSize: 22 },
    status: { fontFamily: font.acari, color: color.white, fontSize: 14, alignSelf: 'center', fontWeight: '500', lineHeight: 35 },
    number: { fontFamily: font.acari, color: color.white, fontSize: 28, alignSelf: 'center', fontWeight: '700' },
    conatiner: { padding: 15 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontFamily: font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 18, marginTop: 3 },
    sell: { marginTop: 12, backgroundColor: color.yellow, width: 80, textAlign: 'center', paddingTop: 5, paddingBottom: 5, borderRadius: 30, color: color.darkBlue },
    sellContainer: { height: 75, backgroundColor: color.dividerColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 },
    arrowBox: { height: 40, backgroundColor: 'white', width: 40, justifyContent: 'center', borderRadius: 8, margin: 12 },
    accountContainer: { height: 75, backgroundColor: color.black, flexDirection: 'row', alignItems: 'center', borderRadius: 10 },
    arrowRight: { alignSelf: 'center', padding: 8, backgroundColor: color.white, borderRadius: 10 },
    needHelp: { fontWeight: '500', fontSize: 15, fontFamily: font.acari, lineHeight: 17, color: color.white },
    chatUs: { fontWeight: '500', fontSize: 16, fontFamily: font.acari, lineHeight: 27, color: color.white },
    chatText: { fontWeight: '700', fontSize: 16, color: color.black }

})