import React ,{useState,useEffect} from "react";
import { View, StyleSheet, Text, SafeAreaView, RefreshControl, Image, Linking, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {getBanner } from '../config/getAllApi';
import { useIsFocused } from "@react-navigation/native";


const bannerView = () => {
    const [banner, setBanner] = useState([]);
    const [active, setActive] = useState(0);
    const isFocused = useIsFocused();
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        loadStoredValue();
    }, [isFocused]);

    const loadStoredValue = async () => {
      const img = await getBanner();
        setBanner(img);
    };

    const scrolls = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide)
        }
    }

    return (

        <View>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={scrolls}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 15, marginLeft: 5 }}
            >
                {banner.map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: item.image }}
                        style={{ width: windowWidth - 35, height: 160, borderRadius: 8 }}
                    />
                )
                )}

            </ScrollView>
            <View style={styles.pagination}>
                {banner.map((item, k) => (
                    <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}

            </View>
        </View>


    )

}

export default bannerView;

const styles = StyleSheet.create({
    pagination: {
        flexDirection: "row",
        position: 'absolute',
        bottom: -12,
        alignSelf: 'center'
    },
    dot: {
        color: '#888',
        fontSize: 50
    },
    activeDot: {
        color: "#FFF",
        fontSize: 50
    },

})