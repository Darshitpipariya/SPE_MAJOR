import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { COLOR } from '../util/config';
import { AntDesign } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
const Scanner = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);


    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        if(data.startsWith('HK')){
            handleBack();
            navigation.navigate('Fill Review', { code: data });
        }else{
            alert('Invalid QR Code');
            handleBack();
        }
    };
    const handleBack = () => {
        navigation.goBack();
    }
    const toggleFlashMode = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.torch);
        } else {
            setFlashMode(Camera.Constants.FlashMode.off);
        }
    }
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => { handleBack() }}>
                <AntDesign name="close" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.barCode}>
                <Camera
                    flashMode={flashMode}
                    type={CameraType.back}
                    barCodeScannerSettings={
                        {
                            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                        }
                    }
                    style={StyleSheet.absoluteFill}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
            </View>
            <TouchableOpacity style={styles.flashButten} onPress={() => { toggleFlashMode() }}>
                <Entypo name="flash" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.qrCodeBackGround,
        justifyContent: "center",
        padding: 40,
    },
    barCode: {
        margin:30,
        alignSelf: "center",
        width: "70%",
        height: "30%",
    },
    flashButten: {
        margin: 20,
        padding: 10,
        width:80,
        height:80,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: COLOR.qrCodeButtenBackGround,
        borderRadius: 15,
    },
    closeButton: {
        margin: 30,
        padding: 10,
        width: 50,
        height: 50,
        position:"absolute",
        top:10,
        left:10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.qrCodeButtenBackGround,
        borderRadius:15,
    }
})

export default Scanner