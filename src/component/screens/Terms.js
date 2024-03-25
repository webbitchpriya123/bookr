import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import * as color from '../../colors/colors';
import HeaderComp from "../header/headerComp";



export default function Terms(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
            <HeaderComp name={'Terms and conditions'} props={props} />
            <View style={{ flex: 0.86 }}>
                <View style={{ padding: 15 }}>
                    <View>
                        <Text style={styles.title}>
                            1.Types of data we collect
                        </Text>
                        <Text style={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere purus egestas sapien scelerisque, ac vulputate sem sodales. In et tempus lorem, at venenatis erat. Praesent facilisis, justo ut vehicula dapibus, lectus metus placerat orci, eu volutpat diam mauris at enim. Suspendisse imperdiet pretium tortor vitae pharetra
                        </Text>
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={styles.title}>
                            2.Use of your personal data
                        </Text>
                        <Text style={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere purus egestas sapien scelerisque, ac vulputate sem sodales. In et tempus lorem, at venenatis erat. Praesent facilisis, justo ut vehicula dapibus, lectus metus placerat orci, eu volutpat diam mauris at enim. Suspendisse imperdiet pretium tortor vitae pharetra
                        </Text>
                    </View>

                </View>
            </View>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
title:{ fontWeight: '700', fontSize: 17, color: color.black },
desc:{ fontWeight: '500', fontSize: 14, lineHeight: 21, color: color.terms, marginTop: 10 }

})