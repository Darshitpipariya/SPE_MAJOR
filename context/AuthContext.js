import React, { createContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userinfo, setUserInfo] = useState(null);
    const [userLoginId, setUserLoginId] = useState(null);
    const [isOffline, setIsOffline] = useState();
    const user = {
        username: "user123",
        room_no: 102,
        name: "Darshit",
        roll_no: "MT2022XX",
        userToken: "token"
    }

    const login = async () => {
        setIsLoading(true);
        try {
            console.log(user);
            await SecureStore.setItemAsync('userLoginId', user.username);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
            await SecureStore.setItemAsync('userToken', user.userToken);
            setUserInfo(user);
            setUserLoginId(user.username);
            setUserToken(user.userToken);

        } catch (error) {
            console.log("Error");
            logout();
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    async function logout() {
        setIsLoading(true);
        await SecureStore.deleteItemAsync('userLoginId');
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        setUserLoginId(null);
        setUserToken(null);
        setUserInfo(null);
        setIsLoading(false);
    }

    async function isLoggedIn() {
        try {
            setIsLoading(true);
            let suserTocken = await SecureStore.getItemAsync('userToken');
            let suserLoginId = await SecureStore.getItemAsync('userLoginId');
            let suserInfo = await SecureStore.getItemAsync('userInfo');
            let sJuserInfo = JSON.parse(suserInfo);

            if (suserLoginId !== null && suserTocken !== null && sJuserInfo !== null) {
                setUserLoginId(suserLoginId);
                setUserToken(suserTocken);
                setUserInfo(sJuserInfo);
                console.log("LoggedIn");
            } else if (suserLoginId === null || sJuserInfo === null || suserTocken === null) {
                logout();
            }
            setIsLoading(false);
        } catch (error) {
            console.error('is LoggedIn ' + error);
        }
    }

    useEffect(() => {
        console.log("Usertoken " + userToken)
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
        <AuthContext.Provider value={{ login, logout, isLoggedIn, userLoginId, isLoading, userinfo, userToken, isOffline }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider