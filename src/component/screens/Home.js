import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';





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

    console.log("logss", windowWidth / 3.5)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity>
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
                        horizontal
                        renderItem={({ item, index }) => <View style={{ height: windowWidth / 3.7, backgroundColor: index === 0 ? '#574AC9' : index === 1 ? '#7E6FFF' : '#585190', width: windowWidth / 3.7, borderRadius: 10, marginLeft: 8 ,marginRight:8}}>
                            <Text style={styles.number}>{item.number}</Text>
                            <Text style={styles.status}>{item.status}</Text>
                        </View>}
                        keyExtractor={item => item.id}
                    />

                    <View style={{ marginTop: 20 }}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} source={images.banner} style={{ width: windowWidth - 40, height: 150, alignSelf: 'center' }} >
                            <View style={{ alignSelf: 'flex-end', width: windowWidth / 2.3, margin: 10 }}>
                                <Text style={styles.perchant}>30% EXTRA</Text>
                                <Text style={styles.education}>FOR ALL EDUCATION BOOKS</Text>
                                <Text style={styles.sell}>Sell Now</Text>
                            </View>

                        </ImageBackground>
                    </View>

                    <TouchableOpacity style={{marginTop:20}}>
                        <Text style={styles.title}>Sell your Books</Text>

                        <View style={{height:75,backgroundColor:color.darkBlue,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:10}}>
                            <Text style={styles.sellBooks}>Sell your book</Text>
                            <View style={{height:40,backgroundColor:'white',width:40,justifyContent:'center',borderRadius:8,margin:12}}>
                                <AntDesign name="arrowright" color={color.darkBlue} size={25} style={{alignSelf:'center'}} />
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:10}}>
                        <View style={{height:75,backgroundColor:color.darkBlue,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:10}}>
                            <Text style={[styles.sellBooks,{color:'#CDCDCDE5'} ]}>Account Details</Text>
                            <View style={{height:40,backgroundColor:'#CDCDCDE5',width:40,justifyContent:'center',borderRadius:8,margin:12}}>
                                <AntDesign name="arrowright" color={color.darkBlue} size={25} style={{alignSelf:'center'}} />
                            </View>

                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default Home;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    arrowIcon: { alignSelf: 'center', marginTop: 12, color: color.darkBlue },
    arrow: { height: 45, backgroundColor: color.white, width: 45, borderRadius: 10 },
    sellBooks: { color: color.white, fontSize: 18, fontWeight: '500', fontFamily: font.acari,margin:12 },
    imageBackground: { height: 147, marginTop: 25, marginBottom: 15 },
    education: { color: color.white, fontWeight: '600', fontSize: 12, marginTop: 5, letterSpacing: 2, lineHeight: 17 },
    backgroundContainer: { alignSelf: 'flex-end', padding: 18, },
    perchant: { color: color.white, fontWeight: '700', fontSize: 22 },
    status: { fontFamily: font.acari, color: color.white, fontSize: 14, alignSelf: 'center', fontWeight: '500', marginTop: 10 },
    number: { fontFamily: font.acari, color: color.white, fontSize: 28, alignSelf: 'center', fontWeight: '700', marginTop: 23 },
    conatiner: { padding: 15 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontFamily: font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 18, marginTop: 3 },
    bookContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sell: { marginTop: 12, backgroundColor: color.yellow, width: 80, textAlign: 'center', paddingTop: 5, paddingBottom: 5, borderRadius: 30 }

})