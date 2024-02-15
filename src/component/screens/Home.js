import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Linking, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import YoutubePlayer from "react-native-youtube-iframe";





const Home = (props) => {
    const books = [{
        number: 130,
        status: 'Sold books'
    },
    {
        number: 118,
        status: 'Approved'
    },
    {
        number: 19,
        status: 'Declined'
    }]

    const windowWidth = Dimensions.get('window').width;
    const [playing, setPlaying] = useState(false);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        <Image source={images.homeBook} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Notification')}>
                        <Ionicons name='notifications-outline' color={color.white} size={25} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.conatiner}>
                    <Text style={styles.title}>Dashboard</Text>
                    <FlatList
                        data={books}
                        contentContainerStyle={{ justifyContent: 'space-between', width: windowWidth - 30 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity>

                                <TouchableOpacity style={{ height: windowWidth / 4, backgroundColor: index === 0 ? '#574AC9' : index === 1 ? '#7E6FFF' : '#585190', width: windowWidth / 4, borderRadius: 10, marginLeft: 8, marginRight: 8, justifyContent: 'center' }}>
                                    <Text style={styles.number}>{item.number}</Text>
                                    <Text style={styles.status}>{item.status}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>

                        }
                        keyExtractor={item => item.id}
                    />

                    <View style={{ marginTop: 20 }}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} source={images.banner} style={{ width: windowWidth - 40, height: 150, alignSelf: 'center' }} >
                            <View style={{ alignSelf: 'flex-end', width: windowWidth / 2.3, margin: 10, paddingTop: 8 }}>
                                <Text style={styles.perchant}>30% EXTRA</Text>
                                <Text style={styles.education}>FOR ALL EDUCATION BOOKS</Text>
                                <TouchableOpacity>
                                    <Text style={styles.sell}>Sell Now</Text>
                                </TouchableOpacity>
                            </View>

                        </ImageBackground>
                    </View>
                    <View style={{ marginTop: 20 }} >
                        <Text style={styles.title}>Sell your Books</Text>

                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('BookHistory')} style={styles.sellContainer}>
                        <Text style={styles.sellBooks}>Sell your book</Text>
                        <View style={styles.arrowBox}>
                            <AntDesign name="arrowright" color={color.darkBlue} size={25} style={{ alignSelf: 'center' }} />
                        </View>

                    </TouchableOpacity>
                    <View style={{ marginTop: 20 }}>
                        <YoutubePlayer
                            height={200}
                            play={playing}
                            volume={100}
                            videoId={"PR34ztnnTjI"}
                            onChangeState={onStateChange}
                            playList={['S9RaNCmgd28', 'KNLZ9H-WCnA']}
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
    flex2:{ flex: 0.2 },
    flex6:{ flex: 0.6 },
    arrowIcon: { alignSelf: 'center', marginTop: 12, color: color.darkBlue },
    arrow: { height: 45, backgroundColor: color.white, width: 45, borderRadius: 10 },
    sellBooks: { color: color.white, fontSize: 18, fontWeight: '500', fontFamily: font.acari, margin: 12 },
    imageBackground: { height: 147, marginTop: 25, marginBottom: 15 },
    education: { color: color.white, fontWeight: '600', fontSize: 12, marginTop: 5, letterSpacing: 2, lineHeight: 17 },
    backgroundContainer: { alignSelf: 'flex-end', padding: 18, },
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