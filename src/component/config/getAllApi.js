import React from 'react';
import { ApiUrl, api, States,disclaimer, deleteBankAcc,upDateBank, getAllBank, bookUpdate, youtubeLink, bannerImg, district, invoiveDownload, banks, faq, notification, userProfile, getBookHistory, productDetail, productStatus, bookCount, notificationCount, notificationReadAt, invoiceOption, selectBankAccount } from '../constant/constant';
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


//disclaimer

export const getNote = async () => {
    try {
        const response = await axios.get(ApiUrl + api + disclaimer);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
};


//youtube link

export const getYoutube = async () => {
    try {
        const response = await axios.get(ApiUrl + api + youtubeLink);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
};



//banner
export const getBanner = async () => {
    try {
        const response = await axios.get(ApiUrl + api + bannerImg);
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

        console.log("tokennnee", token)
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


//notification count
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


//read at notification
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


//get user profile
export const getProfile = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + userProfile, requestBody, { headers });
        console.log("datattataaaaaaaaaaa", data)
        return data.data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
//download invoice
export const downLoadInvoice = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');

        console.log("invoieee", token)
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
            // 'Content-Type':'application/json'
        };
        const requestBody = {
            product_id: id,
        };
        const { data } = await axios.post(ApiUrl + api + invoiveDownload, requestBody, { headers });
        // console.log("dowloadInvoice",data)
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
//show invoice
export const invoiceShow = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            product_id: id,
        };
        const { data } = await axios.post(ApiUrl + api + invoiceOption, requestBody, { headers });
        return data.result;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}


//update draft books

export const updateDraft = async (formData) => {
    console.log("apifromdtaa", formData)
    const token = await AsyncStorage.getItem('token');
    try {
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const { data } = await axios.post(ApiUrl + api + bookUpdate, formData, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
//select bank account


export const selectBank = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + selectBankAccount, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const getAllBanks = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
        };
        const { data } = await axios.post(ApiUrl + api + getAllBank, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching get all bank", error);
    }
}
//update bank account

export const updateBankAcc = async (id) => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
            bank_id: id
        };
        const { data } = await axios.post(ApiUrl + api + upDateBank, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching get all bank", error);
    }
}

export const removeAcc = async (id) => {
    try {
        const value = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: "Bearer " + JSON.parse(token),
        };
        const requestBody = {
            user_id: value,
            bank_id: id
        };
        const { data } = await axios.post(ApiUrl + api + deleteBankAcc, requestBody, { headers });
        return data;
    } catch (error) {
        console.error("Error fetching get all bank", error);
    }
}

