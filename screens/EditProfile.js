import React from 'react';
import {View,Text,SafeAreaView, StyleSheet, TouchableOpacity,TextInput,KeyboardAvoidingView,Alert} from 'react-native';
import {Ionicons,MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons";
import { Input ,Item, Label,Textarea,Button} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Actions } from 'react-native-router-flux';

GLOBAL = require ('./global.js');


export default class EditProfile extends React.Component{
    constructor() {
        super();
        this.state = {
          name:'',
          occupation:'',
          waystatus:'',
          image:'',
          phone:'',
          myuri:'',
        };
      }



    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          aspect: 1,
          allowsEditing: true,
        });
        if (!cancelled) this.setState({ myuri: uri });
      };
    
      updateProfile=async()=>{
       
        const result=this.state.myuri;

        let uriParts = result.split('.');
        let fileType = uriParts[uriParts.length - 1];

        const name=this.state.name;
        const occupation=this.state.occupation;
        const waystatus=this.state.waystatus;
        const phone=this.state.phone;
        
            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('image', { uri: result, name: `photo.${fileType}`,type: `image/${fileType}`,});
            formData.append('name',name);
            formData.append('occupation',occupation);
            formData.append('waystatus',waystatus);
            formData.append('phone',phone);
            
        
            const {goBack} = this.props.navigation;

       await fetch('http://192.168.1.10:8000/api/EditProfile',{
            method:'post',
            headers:{
              'Authorization': `Bearer ${GLOBAL.mytoken}`,
              //'Content-Type':'multipart/form-data',
             'Accept': 'application/json'
            },
            body:
            
                 formData,
           
          }).then((response)=> response.json())
          .then((res)=>{
            if(typeof(res.message)!="undefined"){
              Alert.alert(res.message);
            }
            else{
                Alert.alert("Success","You have succesfuly updated your profile",
                [
              {
                text: 'Continue', onPress: () => {
                     Actions.Profile();
                }
              }
            ],
            { cancelable: false })
            }
          }).catch((error)=>{
            console.error(error);
          });
      }


    render(){
        const {goBack} = this.props.navigation;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} style={{marginHorizontal:10}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:110}}>Edit Profile </Text>
                   
            </View>

            <Text style={{marginLeft:30,fontSize:17,marginTop:25,fontWeight:"300"}}>Please Select Your Profile Pic</Text>
            <TouchableOpacity
            onPress={this.selectPicture}>
            <FontAwesome name="camera" size={35} style={{justifyContent:"center",marginTop:17,alignSelf:"center"}}/>
            
            </TouchableOpacity>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{marginLeft:30}}>Name </Label>
              <Input  style={{marginLeft:10,marginRight:10}}
                  onChangeText={(name) => this.setState({name})}
              />
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Sub Name/Occupation </Label>
              <Input style={{marginLeft:10,marginRight:10}} 
                  onChangeText={(occupation) => this.setState({occupation})}
              />
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Status </Label>
              <Input style={{marginLeft:10,marginRight:10}} 
                  onChangeText={(waystatus) => this.setState({waystatus})}
              />
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Phone No.</Label>
              <Input style={{marginLeft:10,marginRight:10}} keyboardType={'numeric'} returnKeyType='done'
              onChangeText={(phone) => this.setState({phone})}
               />
            </Item>
            
           
            <Button rounded style={styles.postSeat}
            onPress={()=>this.updateProfile()}>
                        <Text>Update</Text>
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