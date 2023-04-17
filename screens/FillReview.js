import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import StarRatting from '../components/StarRatting'
import { COLOR } from '../util/config';
import { TextInput } from 'react-native-gesture-handler';
import Butten from '../components/Butten';
const FillReview = ({ navigation, route }) => {
    const [value, setValue] = useState(0);
    const [review,setReview]=useState('');

    const submitReview = () => {
        const result={
            rating:value,
            review:review,
            code:route.params.code,
        }
        console.log("result "+JSON.stringify(result));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Submit Review</Text>
            </View>
            <View style={styles.formContainer}>

                <StarRatting value={value} setValue={setValue} containerStyle={styles.ratingContainer}/>
                <TextInput multiline={true} numberOfLines={10} onChangeText={(text)=>setReview(text)} style={styles.reviewContainer} placeholder='Write your review'/>
            </View>
            <View style={styles.buttenContainer}>
                <Butten onPress={submitReview}>Submit</Butten>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.defaultBackGroundColor,
        padding: 40,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    titleContainer:{
        marginVertical:10,
    },
    title:{
        fontSize:28,
        fontWeight:"bold",
        textAlign:"center",
        textAlignVertical:"center"
    },
    formContainer:{
        marginVertical:10,
        width:"100%",
    },
    reviewContainer:{
        marginVertical:10,
        textAlignVertical:"top",
        fontSize:16,
        fontWeight:"500",
        padding:20,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLOR.inputBackGroundColor,
        width:"100%",
        height:150,
    },
    ratingContainer:{
        marginVertical:10,
    },
    buttenContainer:{
        alignSelf:"center",
    }


})
export default FillReview