import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as color from '../../colors/colors';
import { notifyCount } from '../config/getAllApi';
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { PushNotification } from '../config/pushNotification';


const Header = (props) => {

    const isFocused = useIsFocused();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            allNotificcations();
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, [isFocused]);

    // useEffect(() => {
    //     setNotification(false);
    // }, [isFocused]);



    const allNotificcations = async () => {
        const notify = await notifyCount();
        if (notify > 0) {
            setNotification(notify)
        }
    }
 

    const onClick = () => {
        props.props.navigation.navigate('Notification');
        setNotification(false);
    }

    console.log("notification",notification)


    return (
        <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
            end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.props.navigation.navigate('Profile')}>
                    <Image source={images.homeBook} style={{ height: 40, width: 200 }} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <TouchableOpacity onPress={() => onClick()}>
                        <Ionicons name='notifications-outline' color={color.white} size={25} />
                    </TouchableOpacity>
                    {notification ?
                        <TouchableOpacity style={styles.notify}>
                        </TouchableOpacity> : null}
                </TouchableOpacity>

            </View>
        </LinearGradient>

    )
}
export default Header;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    notify: { height: 10, width: 10, backgroundColor: '#FFD731', position: 'absolute', bottom: 20, left: 14, borderRadius: 30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },


})