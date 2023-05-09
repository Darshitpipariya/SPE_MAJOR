import React, { createContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';
import { loginhttp } from '../util/http';
import { BASE_URL } from '../util/config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userinfo, setUserInfo] = useState(null);
    const [token, setToken] = useState(null);
    const [userLoginId, setUserLoginId] = useState(null);
    const [isOffline, setIsOffline] = useState();
    const [url, setUrl] = useState(BASE_URL);
    // const response = {
    //     data:{
    //         name: "user123",
    //         dob: 102,
    //         gender: "M",
    //         student_roll_no: "MT2022XX",
    //         student_room_no: "B101",
    //     },
    //     token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzYxZjgzYjE1YzY1MjA4MzEyNiIsImlhdCI"
        
    // }

    const login = async (username,password) => {
        console.log('Username'+ username);
        console.log('Password'+ password);

        setIsLoading(true);
        try {
            const response=await loginhttp(url,username,password);
            console.log(JSON.stringify(response));
            await SecureStore.setItemAsync('userLoginId', username);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(response.data.data));
            await SecureStore.setItemAsync('token', JSON.stringify(response.data.token));

            setUserInfo(response.data.data);
            setUserLoginId(username);
            setToken(response.data.token);

        } catch (error) {
            logout();
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);
    }

    async function logout() {
        setIsLoading(true);
        await SecureStore.deleteItemAsync('userLoginId');
        await SecureStore.deleteItemAsync('userInfo');
        await SecureStore.deleteItemAsync('token');
        setUserLoginId(null);
        setUserInfo(null);
        setToken(null);
        setIsLoading(false);
    }

    async function isLoggedIn() {
        try {
            setIsLoading(true);
            let suserLoginId = await SecureStore.getItemAsync('userLoginId');
            let suserInfo = await SecureStore.getItemAsync('userInfo');
            let stoken=await SecureStore.getItemAsync('token');
            let sJuserInfo = JSON.parse(suserInfo);

            if (suserLoginId !== null && sJuserInfo !== null && stoken !== null) {
                setUserLoginId(suserLoginId);
                setUserInfo(sJuserInfo);
                setToken(stoken);
                console.log("LoggedIn");
            } 
            else if (suserLoginId === null || sJuserInfo === null || stoken !== null) {
                logout();
            }
            setIsLoading(false);
        } catch (error) {
            console.error('is LoggedIn ' + error);
        }
    }

    useEffect(() => {
        const unsubscribeNetworkStatus = NetInfo.addEventListener(
            (state) => {
                const offline = !(state.isConnected && state.isInternetReachable);
                setIsOffline(offline);
            }
        )
        isLoggedIn();
        return () => unsubscribeNetworkStatus();
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, setUrl,url,token, userLoginId, isLoading, userinfo, isOffline }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider