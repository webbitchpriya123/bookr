import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as color from '../../colors/colors';



const Header = (props) => {
    return (
        <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
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

    )
}
export default Header;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },


})