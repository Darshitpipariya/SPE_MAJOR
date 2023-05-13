import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLOR } from '../util/config';
import Butten from '../components/Butten';
import { TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { resetPassword } from '../util/http';
const ForgotPassword = ({navigation}) => {
    const[username,setUsername]=useState('');
    const {url}=useContext(AuthContext);    
    handleSubmit=async()=>{
        try{
            if(username.trim()===''){
                alert("Please enter username");
            }else{
                console.log(username);
                await resetPassword(url,username);
                alert("Contact admin to get new password")
                navigation.goBack();
            }
            
        }catch(error){
            console.log(error);
            alert("Try Again!");
        }
        
    }
    return (
        <View style={styles.mainContainer}>
            <TextInput value={username} onChangeText={(text)=>setUsername(text)} placeholder="Enter Username" style={styles.inpurContainer}/>
            <Butten onPress={handleSubmit}>Submit</Butten>
            
        </View>
    )
}
const styles=StyleSheet.create({
    mainContainer:{
        padding: "15%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLOR.defaultBackGroundColor,
    },
    inpurContainer:{
        margin:15,
        padding:10,
        borderRadius:5,
        borderWidth:1,
        backgroundColor: COLOR.inputBackGroundColor,
        borderColor: COLOR.inputBorderColor,
        fontSize:18,
        textAlign:"center",
        textAlignVertical:"center"
    }

})
export default ForgotPassword