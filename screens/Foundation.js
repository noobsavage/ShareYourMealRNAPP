import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,Picker,TouchableOpacity,TextInput,KeyboardAvoidingView, Alert} from 'react-native';
import {Ionicons,MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons";
import { Input ,Item, Label,Textarea,Button} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Actions } from 'react-native-router-flux';
import {API_URL} from '../API_URL';
export default class Foundation extends React.Component{
    constructor() {
        super();
        this.state = {
          
          myuri:'',
          name:'',
          quantity:'',
          phone:'',
          description:'',
          selected:'',
        };
      }
      onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    
      _takePhoto = async () => {
        const {
          status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);
    
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
                this.setState({myuri:pickerResult.uri});
                    
        }
      };
      
      donatemeal=async()=>{
        var letters = /^[A-Za-z]+$/;
        const result=this.state.myuri;

        let uriParts = result.split('.');
        let fileType = uriParts[uriParts.length - 1];

        const name=this.state.name;
        const quantity=this.state.quantity;
        const phone=this.state.phone;
        const description=this.state.description;
        const fname=this.state.selected;
        if(result!=''){
          if(fname!=''){
          if(name!=''){
            if(letters.test(name)===true){
            if(quantity!=''){
              if(phone!=''){
                if((phone.length)>=11){
                if(description!=''){
                 
        
            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('image', { uri: result, name: `photo.${fileType}`,type: `image/${fileType}`,});
            formData.append('name',name);
            formData.append('foundationName',fname);
            formData.append('quantity',quantity);
            formData.append('phone',phone);
            formData.append('description',description);
            
        
            const {goBack} = this.props.navigation;

       await fetch(`${API_URL}api/mealdonation`,{
            method:'post',
            headers:{
              'Authorization': `Bearer ${GLOBAL.mytoken}`,
             
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
                Alert.alert("Success","You have succesfuly send request",
                [
              {
                text: 'Continue', onPress: () => {
                  Actions.NavigationCalling();
                }
              }
            ],
            { cancelable: false })
            }
          }).catch((error)=>{
            console.error(error);
          });
        }else{
          Alert.alert("Please Enter Description of Meal")
        }
                }else{
                  Alert.alert("Phone have'nt appropriate Length")
                }   
      
      }
        else{
         Alert.alert("Please Enter Phone Number")  
        }
        }
        else{
          Alert.alert("Please Enter Quantity")
        }
      }
      else{
        Alert.alert("Please Enter Proper Alphabet Characters")
      }
        }
        else{
          Alert.alert("Please Enter Meal Name")
        }
        }else{
          Alert.alert("Please Select Foundation")
        }

        }else{
          Alert.alert("Please Capture Image")
        }
      }

     
    render(){
        const {goBack} = this.props.navigation;
       
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} >
                <KeyboardAvoidingView
                      
                      behavior="padding"
                    >
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:110}}>Donate </Text>
                    <MaterialCommunityIcons size={27} name="food-fork-drink" style={{justifyContent:"center"}}/>
            </View>

            <Text style={{marginLeft:30,fontSize:17,marginTop:25,fontWeight:"300"}}>Please Take a snap of Meal</Text>
            <TouchableOpacity
            onPress={()=>this._takePhoto()}>
            <FontAwesome name="camera" size={35} style={{justifyContent:"center",marginTop:17,alignSelf:"center"}}/>
            
            </TouchableOpacity>
            <Label style={{paddingLeft:30}}>Please Select Foundation</Label>
            <View>
            <Picker
                selectedValue={this.state.selected}
                onValueChange={(itemValue,itemIndex)=>this.setState({selected:itemValue})}
                style={{width:'100%'}}
                >
                <Picker.Item label="Al Khidmat Foundation" value="AlKhidmat" />
                <Picker.Item label="Fouji Foundation" value="AlFouji" />    
                <Picker.Item label="Eidhi Foundation" value="AlEidhi" />        
          </Picker>
          </View>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{marginLeft:30}}>Meal Name </Label>
              <Input  style={{marginLeft:10,marginRight:10}}
                  onChangeText={(name) => this.setState({name})}
              />
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Quantity </Label>
              <Input style={{marginLeft:10,marginRight:10}} keyboardType={'numeric'} returnKeyType='done'
                  onChangeText={(quantity) => this.setState({quantity})}
              />
            </Item>
            <Item floatingLabel style={{marginTop:20}}>
              <Label style={{marginLeft:30}}>Phone No </Label>
              <Input style={{marginLeft:10,marginRight:10}} keyboardType={'numeric'} returnKeyType='done'
                  onChangeText={(phone) => this.setState({phone})}
              />
            </Item>
            <Text style={{marginLeft:30,fontSize:17,marginTop:40,fontWeight:"300"}}>Description</Text>
            
            <Textarea style={{marginTop:20,marginLeft:10,marginRight:10}} returnKeyType="done" blurOnSubmit={true} rowSpan={5} bordered 
            onChangeText={(description) => this.setState({description})} />
            <Button rounded style={styles.postSeat}
            onPress={()=>this.donatemeal()}>
                        <Text>Donate</Text>
                        </Button>
                        </KeyboardAvoidingView>
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