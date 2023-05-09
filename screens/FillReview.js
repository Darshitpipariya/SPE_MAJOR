import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StarRatting from '../components/StarRatting'
import { COLOR } from '../util/config';
import { TextInput } from 'react-native-gesture-handler';
import Butten from '../components/Butten';
import { AuthContext } from '../context/AuthContext';
import { submitFrom } from '../util/http';
const FillReview = ({ navigation, route }) => {
    const [stareValue, setStareValue] = useState(0);
    
    const [review,setReview]=useState('');
    const { token, userinfo ,url}=useContext(AuthContext);
    const submitReview = async () => {
        const feedback={
            hkId:route.params.code,
            student_roll_no:userinfo.student_roll_no,
            student_room_no:userinfo.student_room_no,
            rating: stareValue,
            remarks:review,
        }
        console.log("result " + JSON.stringify(feedback));
        try {
            const response=await submitFrom(url,token,feedback);
            navigation.goBack();

        } catch (error) {
            console.log(error);
            console.log("error while submiting form");
            alert("error while submiting form");
            navigation.goBack();
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Submit Review</Text>
            </View>
            <View style={styles.formContainer}>
                <Text>Rate  Worker</Text>
                <StarRatting value={stareValue} setValue={setStareValue} containerStyle={styles.ratingContainer}/>
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