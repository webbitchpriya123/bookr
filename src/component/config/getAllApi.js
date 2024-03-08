import React from 'react';
import { ApiUrl, api, States, district, banks, faq, notification, getBookHistory, productDetail, productStatus, bookCount ,notificationCount ,notificationReadAt} from '../constant/constant';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//bank


export const getBank = async () => {
    try {
        const response = await axios.get(ApiUrl + api + banks);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
};


//states
export const getStates = async () => {
    try {
        const response = await axios.get(ApiUrl + api + States);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//district
export const getDistrict = async (id) => {
    try {
        const response = await axios.get(ApiUrl + api + district + `/${id ? id : 1}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//faq
export const getFaq = async (id) => {
    try {
        const { data } = await axios.get(ApiUrl + api + faq);
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//notifications
export const getAllNotifications = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');

        console.log('tokenn', value, token)
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + notification, requestBody, { headers });
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//getAllBookHistory
export const getAllBook = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + getBookHistory, requestBody, { headers });
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

//book details
export const bookDetail = async (id) => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
            book_id: id
        };
        const { data } = await axios.post(ApiUrl + api + productDetail, requestBody, { headers });
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//account deatils enable 
export const accountStatus = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + productStatus, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//book count
export const bookCounts = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + bookCount, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const notifyCount = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + notificationCount, requestBody, { headers });
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const readAtCount = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + notificationReadAt, requestBody, { headers });
        return data.result;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}