import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Butten from './Butten'
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    return (
        <View style={{marginHorizontal:10,}}>
        <Butten onPress={()=>{logout()}}>Logout</Butten>
        </View>
    )
}

export default Logout