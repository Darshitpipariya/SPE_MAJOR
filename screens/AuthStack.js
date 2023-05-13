import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './LoginScreen';
import { COLOR } from '../util/config';
import ForgotPassword from './ForgotPassword';
const Stack = createStackNavigator();
const AuthStack = () => {

  return(
    <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:COLOR.defaultHeaderBackGroundColor}}}>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export default AuthStack