import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { COLOR } from '../util/config';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppNavigation = () => {

    const { isLoading, userinfo }=useContext(AuthContext);

    if (isLoading){
        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLOR.defaultBackGroundColor }}>
            <ActivityIndicator size={'large'} />
        </View>);
    }
    return (
        <NavigationContainer>
            {userinfo !==null?<AppStack/>:<AuthStack/>} 
        </NavigationContainer>
    )
}

export default AppNavigation