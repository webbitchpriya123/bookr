import React, { useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';
import * as images from '../config/constants';
import * as color from '../../colors/colors';
import LinearGradient from 'react-native-linear-gradient';




export default function Verified(props) {

    useEffect(() => {
        setTimeout(() => {
            if (props.route.params.type === 'ResetPassword') {
                props.navigation.navigate('ResetPassword', { mobile: props.route.params.mobile })
            } else {
                props.navigation.navigate('Home')

            }
        }, 300);

    }, [props.route.params.type])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#3CB043', '#15681A']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.imageView}>
                    <Image source={images.verified} />
                </View>
                <View style={styles.phonenumber}>
                    <Text style={styles.verify}>Verified</Text>
                    <Text style={styles.verifiedPhone}>Your Password has been reset successfully.</Text>
                    <TouchableOpacity style={styles.logView} onPress={() =>
                        props.navigation.navigate('Home')
                    }>
                        <Text style={styles.loginText}>DONE</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    verifiedPhone: { fontSize: 15, fontWeight: '500', color: '#CDCDCDE5', textAlign: "center", lineHeight: 23, marginTop: 10, marginBottom: 10 },
    verify: { fontSize: 25, fontWeight: '600', color: '#FFFFFF', textAlign: "center", lineHeight: 24 },
    phonenumber: { padding: 15, flex: 0.2, justifyContent: "center" },
    imageView: { flex: 0.5, alignSelf: "center", justifyContent: 'flex-end' },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    loginText: { alignSelf: 'center', marginTop: 15, fontSize: 14, color: color.darkBlack, fontWeight: '600' },
    logView: { height: 50, backgroundColor: '#FFCB00', marginTop: 15, borderRadius: 8 },


})