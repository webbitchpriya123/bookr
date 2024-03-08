import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getFcm = async () => {
    try {
        const token = await AsyncStorage.getItem('fcm');
        return token;
    } catch (error) {
        console.error("not storing fcm token", error);
    }
};