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
    RefreshControl
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { getAllNotifications } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";


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

    const allNotificcations = async () => {
        const notify = await getAllNotifications();
        console.log('notiffyy', notify)
        setNotification(notify)
        setLoad(false);
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
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()} >
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
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.Text1}>{item.type.replace(/_/g, ' ')}</Text>
                                        <Text style={styles.text2}>{item.message}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item}
                    />
                </View>


                {/* 
                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>Yesterday</Text>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>New Service Available!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>


                </View>

                <View style={{ padding: 15 }}>
                    <Text style={styles.headerText}>December 22, 2023</Text>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>New Service Available!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.container}>
                        <View style={styles.wholeView}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.iconView}>
                                    <Ionicons name="notifications" size={22} style={styles.iconStyle} color="#FFFFFF" />
                                </View>
                            </View>
                            <View style={{ flex: 0.75 }}>
                                <Text style={styles.Text1}>Credit Card Connected!</Text>
                                <Text style={styles.text2}>Lorem ipsum  dolor sit amet,</Text>
                            </View>
                        </View>

                    </View>
            

                </View> */}

                {!notification.length &&!load ?
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
    wholeView: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    container: { height: 110, backgroundColor: '#F5F6FA', marginTop: 5, borderRadius: 10 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari }

})