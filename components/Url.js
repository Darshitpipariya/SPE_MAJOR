import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { COLOR } from '../util/config'
import Butten from '../components/Butten'

const Url = () => {

    const { url,setUrl}=useContext(AuthContext);
    const [texturl, setTextUrl] = useState(url);

    return (
        <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
                placeholder='Enter Url'
                style={styles.codeInput}
                value={texturl}
                onChangeText={(val) => { setTextUrl(val) }} />
            <View style={styles.btnContainer}>
                <Butten
                    onPress={() => { setUrl(texturl); ToastAndroid.show("Url Set", ToastAndroid.SHORT) } }>
                    Submit
                </Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    codeInput: { 
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#000000",
        width: "80%",
        height: 50,
        backgroundColor: COLOR.inputBackGroundColor,
        borderColor: COLOR.inputBorderColor,
        borderWidth: 1,
        borderRadius: 14,
        elevation: 4,
    }

})

export default Url;