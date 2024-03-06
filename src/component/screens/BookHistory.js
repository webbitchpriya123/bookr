import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList,ActivityIndicator, SafeAreaView, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import * as color from '../../colors/colors';
import * as font from '../../fonts/fonts';
import Header from '../header/header';
import { getAllBook } from "../config/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-paper';






const BookHistory = (props) => {

    const isFocused = useIsFocused();
    const [bookData, setBookData] = useState([]);
    const [load , setLoad] = useState(false);

   

    useEffect(() => {
        bookHistory();
        setLoad(true)
    }, [isFocused]);

    const bookHistory = async () => {
        const allBook = await getAllBook();
        if(allBook){
        setBookData(allBook)
        setLoad(false);
        }else{
            setBookData([]);
        }
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height

    // console.log("logss", bookData, windowWidth / 3.5)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <Header props={props} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.conatiner}>
                    <Text style={styles.title}>My Book History</Text>
                    <View>
                        <FlatList
                            data={bookData}
                            numColumns={2}
                            vertical
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() =>
                                props.navigation.navigate('BookDetails', { id: item.id })}>
                                <Card   style={[styles.bookContainer, { width: windowWidth / 2 - 23}]} >
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.cover_images[0] }} style={{ height: 139, width: 100, alignSelf: 'center' }} />
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
                                        {/* <Text style={styles.name}>{item.name}</Text> */}
                                        <Text style={styles.isbn} >ISBN : {item.isbn_no}</Text>
                                        {/* <Text style={styles.totalBook}>Total books - {item.books}</Text> */}
                                        <View style={styles.payView}>
                                            <TouchableOpacity style={{ padding: 10, backgroundColor: item.book_status === '0' ? '#FFD12F33' : item.book_status === '1' ? '#FFD12F33' : item.book_status === '2' ? '#20B52633' : '#FF2F2F33', borderRadius: 5 }}>
                                                <Text style={{ color: item.book_status === '0' ? '#AB8912' : item.book_status === '1' ? '#AB8912' : item.book_status === '2' ? '#056839' : '#FF0000' }}>
                                                    {item.book_status === '0' ? 'Payment Pending' : item.book_status === '1' ? 'Approved Pending' : item.book_status === '2' ? 'Approve' : 'Declined'}
                                                </Text>
                                            </TouchableOpacity>
                                            {/* {item.status === 'Approved' ?
                                                <TouchableOpacity style={{ padding: 10, backgroundColor: item.payment === 'paid' ? '#20B52633' : item.payment === 'Payment Pending' ? '#FFD12F33' : '#FF2F2F33', marginLeft: 5, borderRadius: 5 }}>
                                                    <Text style={{ color: item.payment === 'paid' ? '#056839' : item.payment === 'Payment Pending' ? '#AB8912' : '#FF0000' }}>{item.payment}</Text>
                                                </TouchableOpacity> : null} */}
                                        </View>
                                    </View>
                                </Card>
                                </TouchableOpacity>

                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                    
                    {!bookData.length && !load?
                    <View style={{marginTop:windowHeight / 3,alignSelf:'center'}}>
                        <Text style={styles.title}>No Data Found</Text>
                    </View>:null}

                </View>
               
            </ScrollView>

            <TouchableOpacity style={styles.plus} onPress={()=>props.navigation.navigate('ReSell')}>
                <AntDesign name="plus" color={color.black}  size={45} style={{alignSelf:'center'}}  />
            </TouchableOpacity>

            {load ?
                <View style={[styles.loader, { top: windowHeight / 2 }]}>
                    <ActivityIndicator size={'large'} color={color.green} />
                </View> : null}

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
    plus:{marginRight:15,height:70,width:70,backgroundColor:color.yellow,marginBottom:10,alignSelf:'flex-end',justifyContent:'center',borderRadius:50},
    loader: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    conatiner: { padding: 15 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 52 },
    title: { fontFamily: font.acari, fontWeight: '800', color: color.black, fontSize: 16, marginBottom: 10, marginTop: 3 },
    bookContainer: { backgroundColor: '#F9F9F9',  borderRadius: 6, marginTop: 10, borderWidth: 0.2, borderColor: 'border: Mixed solid #00000017', backgroundColor: color.white },
    name: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '600' },
    isbn: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    totalBook: { color: '#343434', lineHeight: 21, fontSize: 14, fontWeight: '400' },
    payView: { flexDirection: 'row', marginTop: 10 },
    imageContainer: { padding: 10 }
})