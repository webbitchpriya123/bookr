import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderComp = ({ props, name }) => {
    console.log("headercomp", name, props)
    return (
        <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
            end={{ x: 1.0, y: 1.0 }} style={[styles.linearGradient, { flex: name === 'Edit Profile' ? 0 : 0.14 }]}>
            <View style={styles.header}>
                <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()}>
                    <AntDesign name='arrowleft' size={30} color={color.white} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.85 }}>
                    <Text style={styles.notify}>{name}</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default HeaderComp;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
});
