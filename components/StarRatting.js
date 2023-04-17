import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { COLOR } from '../util/config';
const StarRatting = ({ value, setValue, containerStyle }) => {
    const [rating, setRating] = useState(value);

    const updateRatting = (key) => {
        setRating(key);
        setValue(key);
    }


    return (
        <View style={[styles.container,containerStyle]}>
            <TouchableOpacity style={styles.starContaier} onPress={() => updateRatting(1)}>
                <AntDesign name={rating >= 1 ? "star" : 'staro'} size={40} color={COLOR.starColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.starContaier} onPress={() => updateRatting(2)}>
                <AntDesign name={rating >= 2 ? "star" : 'staro'} size={40} color={COLOR.starColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.starContaier} onPress={() => updateRatting(3)}>
                <AntDesign name={rating >= 3 ? "star" : 'staro'} size={40} color={COLOR.starColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.starContaier} onPress={() => updateRatting(4)}>
                <AntDesign name={rating >= 4 ? "star" : 'staro'} size={40} color={COLOR.starColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.starContaier} onPress={() => updateRatting(5)}>
                <AntDesign name={rating >= 5 ? "star" : 'staro'} size={40} color={COLOR.starColor} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    starContaier:{
        
    }
})

export default StarRatting