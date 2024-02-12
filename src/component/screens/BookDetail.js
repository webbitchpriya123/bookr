import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as color from '../../colors/colors';
import * as Font from '../../fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import * as images from '../config/constants';



export default function BookDetail(props) {


    const books = [
        {
            image: images.Book1,
        },
        {
            image: images.Book2,
        },
        {
            image: images.Book3,
        },
        {
            image: images.Book4,
        },
        {
            image: images.Book1,
        },
        {
            image: images.Book2,
        },
    ]



    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [offer, setOffer] = useState('');


    console.log("setstate", images)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <LinearGradient colors={['#241D60', '#4F45A1']} start={{ x: 0.1, y: 0.4 }}
                end={{ x: 1.0, y: 1.0 }} style={styles.linearGradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => props.navigation.goBack()} >
                        <AntDesign name='arrowleft' size={30} color={color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.85 }}>
                        <Text style={styles.notify}>Book details</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Your book details</Text>
                    <View>
                        <Text style={styles.name}>Book Name</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={text}
                            placeholder="sudha murthy english text book"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>Author Name</Text>

                        <TextInput
                            style={styles.input}
                            value={name}
                            editable={false}
                            placeholder="Lisa Jewel"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>ISBN Number</Text>

                        <TextInput
                            style={styles.input}
                            value={isbn}
                            editable={false}
                            placeholder="8255532223454"
                            placeholderTextColor={'#7F8192'}
                        />
                        <Text style={styles.name}>Category</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            placeholder="Education"
                            placeholderTextColor={'#7F8192'}
                        />


                        <Text style={styles.name}>Book printed price</Text>

                        <View style={styles.printedView}>

                            <TextInput
                                style={{ width: '88%', marginLeft: 5 }}
                                onChangeText={(text) => setIsbn(text)}
                                value={isbn}
                                editable={false}
                                placeholder="1300"
                                placeholderTextColor={'#7F8192'}
                            />
                            <TouchableOpacity>
                                <AntDesign name="questioncircleo" size={20} style={{ marginLeft: 10 }} color={color.black} />

                            </TouchableOpacity>

                        </View>

                        <Text style={styles.name}>Condition</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            editable={false}
                            placeholder="Good"
                            placeholderTextColor={'#7F8192'}
                        />

                        <Text style={styles.name}>Offered price</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setOffer(text)}
                            value={offer}
                            editable={false}
                            placeholder="750"
                            placeholderTextColor={'#7F8192'}
                        />

                    </View>
                    <Text style={[styles.title, { marginTop: 15 ,marginBottom:10}]}>Add your book images</Text>

                    <FlatList
                        data={books}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View style={{ padding: 6 }} key={index}>
                                <Image source={item.image} />
                            </View>

                        }
                        keyExtractor={item => item}
                    />

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 110,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        height: 57,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192',
        marginTop: 12, 
        backgroundColor: '#F5F6FA'
    },
    container: { padding: 15 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 61 },
    notify: { fontWeight: '700', fontSize: 16, color: color.white, fontFamily: Font.acari },
    title: { fontFamily: Font.acari, fontWeight: '800', color: color.black, fontSize: 16 },
    name:{ color: '#151940', fontWeight: '600', fontSize: 14, lineHeight: 15,marginTop:15},
    printedView:{ height: 57, backgroundColor: '#F5F6FA', borderRadius: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center' }
   



})