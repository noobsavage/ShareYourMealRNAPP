import React from 'react';
import {View,Text,SafeAreaView, StyleSheet, TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';
import {Ionicons,MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons";
import { Input ,Item, Label,Textarea,Button} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
export default class Foundation extends React.Component{

    render(){
        const {goBack} = this.props.navigation;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} style={{marginHorizontal:10}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:110}}>Donate </Text>
                    <MaterialCommunityIcons size={27} name="food-fork-drink" style={{justifyContent:"center"}}/>
            </View>

            <Text style={{marginLeft:30,fontSize:17,marginTop:25,fontWeight:"300"}}>Please Take a snap of Meal</Text>
            <TouchableOpacity>
            <FontAwesome name="camera" size={35} style={{justifyContent:"center",marginTop:17,alignSelf:"center"}}/>
            
            </TouchableOpacity>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{marginLeft:30}}>Meal Name </Label>
              <Input  style={{marginLeft:10,marginRight:10}}/>
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Quantity </Label>
              <Input style={{marginLeft:10,marginRight:10}} keyboardType={'numeric'} returnKeyType='done'/>
            </Item>
            <Text style={{marginLeft:30,fontSize:17,marginTop:40,fontWeight:"300"}}>Description</Text>
            
            <Textarea style={{marginTop:20,marginLeft:10,marginRight:10}} returnKeyType="done" blurOnSubmit={true} rowSpan={5} bordered  />
            <Button rounded style={styles.postSeat}
            onPress={Actions.ShowSeatDetails()}>
                        <Text>Send Request</Text>
                        </Button>
            </ScrollView>
            </SafeAreaView>
    
        )}
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#fff",

    },
    titleBar:{
        flexDirection:"row",
        //justifyContent:"space-between",
        marginTop:24,
        marginHorizontal:16
    },
    postSeat:{
        alignSelf:"center",
        alignItems:"center",
        width:250,
        backgroundColor:"#2BDA8E",
        height:50,
        marginTop:25,
        justifyContent:"center"
    }
});