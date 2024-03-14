import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    ToastAndroid
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { getAllNotifications, notifyCount, readAtCount } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';



export default function Notification(props) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height
    const isFocused = useIsFocused();
    const [notification, setNotification] = useState([]);
    const [load, setLoad] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        allNotificcations();
        setLoad(true);
    }, [isFocused]);


    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage);
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []);

    const allNotificcations = async () => {
        const notify = await getAllNotifications();
        setNotification(notify)
        setLoad(false);
    }

    const validation = notification ?notification.every(item => item.read_at === null):null



    const goBack = async () => {
        console.log("respons", validation)
        if (!validation) {
            const response = await readAtCount();
            if (response === true) {
                allNotificcations();
            }
        }
        props.navigation.goBack();

    }



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => goBack()} >
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Notification</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } showsVerticalScrollIndicator={false}>

                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>Today</Text>
                    <FlatList
                        data={notification}
                        contentContainerStyle={{ width: windowWidth - 30 }}
                        vertical
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={styles.container}>
                                <View style={styles.wholeView}>
                                    <View style={{ flex: 0.2 }}>
                                        <View style={styles.iconView}>
                                            <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                            {item.read_at === null ?
                                                <View style={styles.alert}></View> : null}
                                        </View>
                                    </View>
                                    {console.log("type",item)}
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.Text1}>{ item.notification_id.type ?item.notification_id.type.replace(/_/g, ' ') :null}</Text>
                                        <Text style={styles.text2}>{item.notification_id.message}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item}
                    />
                </View>


              

                {!notification.length && !load ?
                    <View style={{ marginTop: windowHeight / 3, alignSelf: 'center' }}>
                        <Text style={styles.title}>No Data Found</Text>
                    </View> : null}

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
    title: { fontWeight: '700', fontSize: 16, fontFamily: Font.acari, color: color.black, paddingBottom: 10 },

    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    headerText: { color: '#212121', fontWeight: '700', fontSize: 16, flex: 0.83 },
    Text1: { fontWeight: '600', fontSize: 14, color: '#212121', lineHeight: 30 },
    text2: { fontWeight: '500', fontSize: 14, color: '#505050', lineHeight: 20 },
    iconStyle: { alignSelf: 'center', marginTop: 10 },
    iconView: {
        backgroundColor: color.darkBlue, height: 45, width: 45, borderRadius: 30
    },
    wholeView: { flexDirection: 'row', alignItems: 'center', padding: 10 ,paddingTop:10,marginBottom:10},
    container: {  backgroundColor: '#F5F6FA', marginTop: 15, borderRadius: 10 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    alert:{ height: 10, width: 10, backgroundColor: 'red', position: 'absolute', left: 35, borderRadius: 10 }

})