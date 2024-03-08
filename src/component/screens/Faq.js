import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import { List } from 'react-native-paper';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import Header from '../header/header';
import { getFaq } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import {PushNotification} from '../config/pushNotification';


export default function FAQ(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [FAQ, setFAQ] = useState([]);
    const [load, setLoad] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height
    const handlePress = () => setExpanded(!expanded);

    const isFocused = useIsFocused();
  
    useEffect(() => {
        getFAQ();
        setLoad(true)
    }, [isFocused]);


    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            console.log('Foreground Notification:', remoteMessage);
            PushNotification(remoteMessage)
        });
        // Clean up the subscription when the component unmounts
        return () => unsubscribeOnMessage();
    }, []); //
    const getFAQ = async () => {
        const state = await getFaq();
        setLoad(false);
        setFAQ(state);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header props={props} />
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>FAQ's</Text>
                <FlatList
                    data={FAQ}
                    contentContainerStyle={{  }}
                    vertical
                    // numColumns={3}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <List.Section style={{backgroundColor:'white'}} >
                            <View style={styles.listSection}>
                                <List.Accordion
                                    // expanded={expanded}
                                    // onPress={handlePress}
                                    title={item.question}
                                    titleStyle={{ color: color.darkBlack }}
                                    style={{ backgroundColor: color.white, borderRadius: 10,elevation:5}}
                                >
                                    <Text style={styles.accordianList}>{item.answer}</Text>
                                </List.Accordion>
                            </View>
                        </List.Section>
                    }
                    keyExtractor={item => item}
                />



            </View>

            {!FAQ.length &&!load?
                    <View style={{marginTop:windowHeight / 3,alignSelf:'center'}}>
                        <Text style={styles.title}>No Data Found</Text>
                    </View>:null}
            </ScrollView>


            {load ?
                <View style={[styles.loader, { top: windowHeight / 2 }]}>
                    <ActivityIndicator size={'large'} color={color.green} />
                </View> : null}

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontWeight: '700', fontSize: 16, fontFamily: font.acari, color: color.black, paddingBottom: 10 },
    accordian: { backgroundColor: 'white', elevation: 5, marginTop: 15, borderRadius: 10 },
    accordianList: { color: '#A1A1AA', lineHeight: 23, fontSize: 14, fontWeight: '500', backgroundColor: color.white, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    container: { padding: 15 },
    listSection: { backgroundColor: 'white', elevation: 5, borderRadius: 10 },
    safeArea: { flex: 1, backgroundColor: color.white }

})