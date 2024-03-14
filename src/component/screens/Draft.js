import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Alert,BackHandler, ActivityIndicator, SafeAreaView, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import { getAllBook } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';
import LinearGradient from 'react-native-linear-gradient';





const Draft = (props) => {
    const isFocused = useIsFocused();
    const [bookData, setBookData] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        return () => unsubscribeOnMessage();
    }, []); //


    const handleBackButtonClick = useCallback(() => {
        // if (props.route.name === 'Draft') {
            props.navigation.goBack();
            return true;
        // }
    }, [props.navigation]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            backHandler.remove();
        };
    }, [handleBackButtonClick]);

    useEffect(() => {
        bookHistory();
        setLoad(true)
    }, [isFocused]);


    const bookHistory = async () => {
        const allBook = await getAllBook();
        if (allBook) {
            const filteredData = allBook.filter(item => item.draft == 1);
            setBookData(filteredData)
            setLoad(false);
        } else {
            setBookData([]);
        }
    }

    const bookUpdate = (item) => {
        Alert.alert("UsedBookr!", "Are you sure you want to update your draft?", [
            {
                text: "Cancel",
                onPress: () => props.navigation.navigate('BookDetails', { id: item }),
                style: "cancel"
            },
            {
                text: "YES", onPress: () => {
                    props.navigation.navigate('ReSell',{bookId:item})
                }
            }
        ]); 
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height

    // console.log("logss", bookData, windowWidth / 3.5)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            {/* <HeaderComp name={'Drafts'} props={props} /> */}
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={[styles.linearGradient, { flex: 0.14 }]}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()}>
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Draft</Text>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
            <View style={styles.conatiner}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>My Drafts</Text>
                    <View >
                        <FlatList
                            data={bookData}
                            numColumns={2}
                            vertical
                            columnWrapperStyle={{ justifyContent: 'space-between', padding: 5 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() =>
                                    bookUpdate(item.id)}>
                                    <Card outlined contentStyle={{ borderRadius: 3, borderWidth: 0.23, borderColor: 'border: Mixed solid #00000017' }} style={[styles.bookContainer, { width: windowWidth / 2 - 30 }]} >
                                        {item.cover_images[0] ?
                                            <View style={styles.imageContainer}>
                                                <Image source={{ uri: item.cover_images[0] }} style={styles.img} />
                                            </View> : <View style={styles.noImg}>
                                                <Text style={[styles.isbn, { justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }]}>No Images</Text>
                                            </View>}

                                        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                            <Text style={styles.isbn} >ISBN </Text>
                                            <Text style={styles.totalBook}>{item.isbn_no}</Text>
                                            <Text style={styles.draft}>Drafts</Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>

                            }
                            keyExtractor={item => item.id}
                        />

                        {!bookData.length && !load ?
                            <View style={{ marginTop: windowHeight / 3, alignSelf: 'center' }}>
                                <Text style={styles.title}>No Data Found</Text>
                            </View> : null}
                    </View>
                </ScrollView>
            </View>

            {load ?
                <View style={[styles.loader, { top: windowHeight / 2 }]}>
                    <ActivityIndicator size={'large'} color={color.green} />
                </View> : null}
        </SafeAreaView>
    )
}
export default Draft;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    plus: { marginRight: 15, height: 70, width: 70, backgroundColor: color.yellow, marginBottom: 10, alignSelf: 'flex-end', justifyContent: 'center', borderRadius: 50 },
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    conatiner: { padding: 15, flex: 0.86 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontFamily: font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 10, marginTop: 3 },
    bookContainer: { backgroundColor: '#F9F9F9', borderRadius: 8, marginTop: 10, backgroundColor: color.white, elevation: 10 },
    name: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '600' },
    isbn: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    totalBook: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    payView: { flexDirection: 'row', marginTop: 10 },
    imageContainer: { padding: 10 },
    img: { height: 139, width: 100, alignSelf: 'center' },
    draft: { color: color.yellow, fontSize: 14, fontWeight: '500', lineHeight: 25 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: font.acari },
    noImg: { height: 161, width: 100, alignSelf: "center", justifyContent: 'center', alignItems: 'center' }
})