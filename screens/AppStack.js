import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { COLOR } from '../util/config';
import HomeScreen from './HomeScreen';
import Scanner from './Scanner';
import FillReview from './FillReview';
import Logout from '../components/Logout';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          headerStyle: {
            backgroundColor: COLOR.defaultHeaderBackGroundColor,
          },
          headerTitleStyle:{
            color:COLOR.defaultHeaderTitleColor,
          },
          title:"Home",
          headerTitleAlign:"center",
          
        }
      }
      initialRouteName='Home Screen'
      >
      
      <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerRight:()=>(<Logout/>)}}/>
      <Stack.Screen name="Scan" options={{ headerShown: false,presentation:'transparentModal' }} component={Scanner} />
      <Stack.Screen name="Fill Review" component={FillReview} />
    </Stack.Navigator>
  )
}

export default AppStack