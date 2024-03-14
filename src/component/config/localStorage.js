import AsyncStorage from "@react-native-async-storage/async-storage";


export const getFcm = async () => {
    try {
        const token = await AsyncStorage.getItem('fcm');
        return token;
    } catch (error) {
        console.error("not storing fcm token", error);
    }
};

export const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('user_id');
        return userId;
    } catch (error) {
        console.error("not storing userId", error);
    }
};