import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';





const BookHistory = (props) => {
    const allData = [
        {
            name: "Sudha Murthy English text Guide - A",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Approved',
            payment: 'paid',
            image: images.Book1
        },
        {
            name: "Biology XI - XII",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Approved',
            payment: 'Payment Pending',
            image: images.Book2

        },
        {
            name: "My first 1000 word",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Approved Pending',
            payment: 'paid',
            image: images.Book3

        },
        {
            name: "The power of your subconsicious mind",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Declined',
            payment: 'paid',
            image: images.Book4
        },
        {
            name: "Sudha Murthy English text Guide - A",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Approved',
            payment: 'paid',
            image: images.Book1
        },
        {
            name: "Biology XI - XII",
            isbn: '8623345552245',
            books: '10 nos',
            status: 'Approved',
            payment: 'Payment Pending',
            image: images.Book2

        },
    ]

    const windowWidth = Dimensions.get('window').width;

    console.log("logss", windowWidth / 3.5)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
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
                    <Text style={styles.title}>My Book History</Text>
                    <View>
                        <FlatList
                            data={allData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>

                                <TouchableOpacity style={styles.bookContainer} onPress={()=>props.navigation.navigate('BookDetails')}>
                                    <View style={styles.imageContainer}>
                                        <Image source={item.image} />
                                    </View>
                                    <View style={styles.detailView}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.isbn} >ISBN No : {item.isbn}</Text>
                                        <Text style={styles.totalBook}>Total books - {item.books}</Text>
                                        <View style={styles.payView}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: item.status === 'Approved' ? '#20B52633' : item.status === 'Approved Pending' ? '#FFD12F33' : '#FF2F2F33', borderRadius: 5 }}>
                                                <Text style={{ color: item.status === 'Approved' ? '#056839' : item.status === 'Approved Pending' ? '#AB8912' : '#FF0000' }}>{item.status}</Text>
                                            </TouchableOpacity>
                                            {item.status === 'Approved' ?
                                                <TouchableOpacity style={{ padding: 10, backgroundColor: item.payment === 'paid' ? '#20B52633' : item.payment === 'Payment Pending' ? '#FFD12F33' : '#FF2F2F33', marginLeft: 15, borderRadius: 5 }}>
                                                    <Text style={{ color:item.payment === 'paid' ? '#056839' : item.payment === 'Payment Pending' ? '#AB8912' : '#FF0000' }}>{item.payment}</Text>
                                                </TouchableOpacity> : null}
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            }
                            keyExtractor={item => item.id}
                        />
                    </View>



                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default BookHistory;

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    status: { fontFamily: font.acari, color: color.white, fontSize: 14, alignSelf: 'center', fontWeight: '500', marginTop: 10 },
    number: { fontFamily: font.acari, color: color.white, fontSize: 28, alignSelf: 'center', fontWeight: '700', marginTop: 23 },
    conatiner: { padding: 15 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontFamily: font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 10, marginTop: 3 },
    bookContainer:{ backgroundColor: '#F9F9F9', height: 180, elevation: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    detailView:{ flex: 0.68, padding: 10, justifyContent: 'center' },
    name:{ color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '600' },
    isbn:{ color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    totalBook:{ color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    payView:{ flexDirection: 'row', marginTop: 10 },
    imageContainer:{ flex: 0.3, padding: 10 }
})