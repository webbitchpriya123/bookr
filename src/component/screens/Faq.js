import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as color from '../../colors/colors';
import * as images from '../config/constants';
import * as font from '../../fonts/fonts';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';








export default function FAQ() {
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);
    // console.log("global",this.props.route.params.bottom)
    return (
        <SafeAreaView style={styles.safeArea}>

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
            <View style={styles.container}>
                <Text style={styles.title}>FAQ's</Text>


                <List.Section >
                    <View style={styles.listSection}
                    >

                        <List.Accordion
                            // expanded={expanded}
                            // onPress={handlePress}
                            title="What is Usedbookr?"
                            titleStyle={{ color: color.darkBlack }}
                            style={{ backgroundColor: color.white ,borderRadius:10 }}
                        >
                            <Text style={styles.accordianList}>Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum mollis nunc a molestic dictum.</Text>
                        </List.Accordion>
                    </View>


                    <View style={styles.accordian}>
                        <List.Accordion
                            expanded={expanded}
                            onPress={handlePress}
                            title="Our Mission?"
                            titleStyle={{ color: color.darkBlack }}
                            style={{ backgroundColor: color.white ,borderRadius:10}}
                        >
                            <Text style={styles.accordianList}>Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum mollis nunc a molestic dictum.</Text>
                        </List.Accordion>
                    </View>

                    <View style={styles.accordian}>
                        <List.Accordion
                            // expanded={expanded}
                            // onPress={handlePress}
                            title="How do i Sign up?"
                            titleStyle={{ color: color.darkBlack }}
                            style={{ backgroundColor: color.white ,borderRadius:10}}
                        >
                            <Text style={styles.accordianList}>Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum mollis nunc a molestic dictum.</Text>
                        </List.Accordion>
                    </View>
                </List.Section>
            </View>





        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontWeight: '700', fontSize: 16, fontFamily: font.acari, color: color.black, paddingBottom: 10 },
    accordian: { backgroundColor: 'white', elevation: 5, marginTop: 15 ,borderRadius:10},
    accordianList: { color: '#A1A1AA', lineHeight: 23, fontSize: 14, fontWeight: '500', backgroundColor: color.white, paddingLeft: 15, paddingRight: 15, paddingBottom: 15 },
    container: { padding: 15 },
    listSection: { backgroundColor: 'white', elevation: 5, borderRadius: 10 },
    safeArea: { flex: 1, backgroundColor: color.white }

})