import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLOR } from '../util/config'
import Butten from '../components/Butten'
import { AuthContext } from '../context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons';
import Url from '../components/Url'


const HomeScreen = ({ navigation }) => {
    const { userinfo } = useContext(AuthContext);
    const [codeValue, setCodeValue] = useState('');
    const validateCode = (code) => {
        if (!code.startsWith('HK')) {
            alert("Enter valid code");
            setCodeValue('');
            return false;
        }
        return true;
    }
    const handleCodeSubmit = () => {
        console.log("submit")
        if (codeValue.trim().length == 0) {
            alert('Please Enter Code');
            setCodeValue('');
        } else if (validateCode(codeValue)) {
            navigation.navigate('Fill Review', { code: codeValue });
        }
    }

    const handleScan = () => {
        console.log("scan")
        navigation.navigate('Scan');
    }
    return (
        <View style={styles.container}>
            <View style={styles.helloTextContainer}>
                <Text style={styles.helloText}>Hello,{userinfo.name}</Text>
            </View>
            <Url />
            <View style={{ flex: 4, alignItems: "center", width: "100%", justifyContent: "space-evenly" }}>
                <View style={{ width: "100%", alignItems: "center", }}>
                    <TextInput
                        placeholder='Enter Code'
                        style={styles.codeInput}
                        value={codeValue}
                        onChangeText={(val) => { setCodeValue(val) }} />
                    <View style={styles.btnContainer}>
                        <Butten
                            onPress={() => { handleCodeSubmit() }}>
                            Submit
                        </Butten>
                    </View>
                </View>
                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>
                <View>
                    <TouchableOpacity style={styles.scannerButten} onPress={() => { handleScan() }}>
                        <MaterialIcons name="qr-code-scanner" size={60} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.defaultBackGroundColor,
        justifyContent: "center",
        alignItems: "center"
    },
    helloTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 10,
    },
    helloText: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000000"
    },
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
    },
    btnContainer: {
        margin: 10,
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    orText: {
        fontStyle: "italic",
        fontSize: 25,
        fontWeight: "bold"
    },
    line: {
        borderColor: "#000000",
        borderWidth: 1,
        width: "34%",
        height: 0,
        marginHorizontal: "2%",
    },
    scannerButten: {
        backgroundColor: COLOR.buttenBackGroundColor,
        borderRadius: 30,
        padding: 20,
    }

})
export default HomeScreen