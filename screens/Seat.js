import React from "react";
import {Text,View,SafeAreaView,ScrollView,StyleSheet,TouchableOpacity, Alert} from "react-native";
import { Ionicons,MaterialIcons } from "@expo/vector-icons"
import { SearchBar } from 'react-native-elements';
import {Button,Header,Item,Icon,Input} from 'native-base';
import { Actions } from "react-native-router-flux";
import TimePicker from "react-native-24h-timepicker";

import * as Location from 'expo-location';
import { Login } from './Authentication/Login.js'
GLOBAL = require ('./global.js');

export default class Seat extends React.Component{
    constructor() {
        super();
        this.state = {
          time: "",
          seatNo:"",
          errors: [],
          status:'',
        };
      }
     
      onCancel() {
        this.TimePicker.close();
      }
     
      onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
      }
      SeatCheck1(value){
          value=1
            this.setState({seatNo:value})
      }
      SeatCheck2(value){
        value=2
          this.setState({seatNo:value})
    }
    SeatCheck3(value){
        value=3
          this.setState({seatNo:value})
    }
    SeatCheck4(value){
        value=4
          this.setState({seatNo:value})
    }
    SeatCheck5(value){
        value=5
          this.setState({seatNo:value})
    }
    SeatCheck6(value){
        value=6
          this.setState({seatNo:value})
    }
    handleSeat = async(props)=> {
        const {lo,la} = this.props;
         const errors = [];
        fetch('http://192.168.1.10:8000/api/Seats',{
            method:'post',
            headers:{
              'Authorization': `Bearer ${GLOBAL.mytoken}`,
              'Content-Type':'application/json',
             'Accept': 'application/json'
            },
            body:JSON.stringify({
              
                
                "longitude":lo,
                "latitude":la,
                "No_of_seat":this.state.seatNo,
                "time":this.state.time,
                "status":1

                 
             
              
            })
          }).then((response)=> response.json())
          .then((res)=>{
            if(typeof(res.message)!="undefined"){
              Alert.alert(res.message);
            }
            else{
                Alert.alert("Success","You have succesfuly Created Seat",
                [
              {
                text: 'Continue', onPress: () => {
                   Actions.Screen();
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
        // ( async () => {
        //     let regionName = await Location.reverseGeocodeAsync( { longitude: this.props.lo, latitude:this.props.la} );
        //    // console.log(regionName)
        //     this.setState({address:regionName})
        // })();
        const {address} = this.props;
        const namesList=address.map(t=>{
            return(
              <Text>{t.city,t.region,t.country}</Text>
              
            )
        })
        const {goBack} = this.props.navigation;
        return(
            <SafeAreaView style={styles.container}>
            
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,alignContent:"center",paddingBottom:10,fontWeight:"400"}}>Post Seat</Text>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                </View>
                <Text style={{fontWeight:"400",fontSize:17,paddingLeft:15,paddingTop:10,paddingBottom:10}}>Current Place</Text>
                <Text style={{fontWeight:"400",fontSize:17,paddingLeft:15,paddingTop:10,paddingBottom:10}}>{namesList}</Text>
          
                    <Text style={{fontWeight:"400",fontSize:17,paddingLeft:20,paddingTop:10,paddingBottom:10}}>Select number of seat</Text>
                    
                    <View style={styles.infoContainer}>                   
                        <Button rounded style={styles.buttonSeat}
                        value="1"
                        onPress={(value) => this.SeatCheck1(value)}>
                        <Text>1</Text>
                        </Button>
                        <Button rounded style={styles.buttonSeat}
                        onPress={(value) => this.SeatCheck2(value)}>
                        <Text>2</Text>
                        </Button>
                        <Button rounded style={styles.buttonSeat}
                        onPress={(value) => this.SeatCheck3(value)}>
                        <Text>3</Text>
                        </Button>
                    </View>
                    <View style={styles.infoContainer}>                   
                        <Button rounded style={styles.buttonSeat}
                        onPress={(value) => this.SeatCheck4(value)}>
                        <Text>4</Text>
                        </Button>
                        <Button rounded style={styles.buttonSeat}
                        onPress={(value) => this.SeatCheck5(value)}>
                        <Text>5</Text>
                        </Button>
                        <Button rounded style={styles.buttonSeat}
                        onPress={(value) => this.SeatCheck6(value)}>
                        <Text>6</Text>
                        </Button>
                    </View>
                    <Text style={{fontWeight:"400",fontSize:17,paddingLeft:20,marginTop:20,paddingBottom:10}}>Select Time</Text>
                    <TouchableOpacity
                        onPress={() => this.TimePicker.open()}
                        style={styles.button}
                        >
                        <Text style={{fontWeight:"300",fontSize:17,paddingTop:10,paddingBottom:10,alignItems:"center",alignSelf:"center"}}>Click here </Text>
                        </TouchableOpacity>
                        <Text style={{fontWeight:"300",fontSize:17,paddingTop:10,paddingBottom:10,alignItems:"center",alignSelf:"center"}}>{this.state.time}</Text>
                        <TimePicker
                        ref={ref => {
                            this.TimePicker = ref;
                        }}
                        onCancel={() => this.onCancel()}
                        onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                        />
                        <Button rounded style={styles.postSeat}
                        //onPress={()=>Actions.ShowSeatDetails()}
                        onPress={()=>this.handleSeat()}
                        >
                        <Text>Post</Text>
                        </Button>
                </SafeAreaView>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"

    },
    infoContainer:{
        // alignSelf:"center",
        // alignItems:"center",
        flexDirection:"row"

    },
    buttonSeat:{
            marginTop:15,
            width:70,
            height:70,
            backgroundColor:"#2BDA8E",
            // alignContent:"center",
            // alignItems:"center",
            justifyContent:'center',
            marginLeft:40
    },
    postSeat:{
        alignSelf:"center",
        alignItems:"center",
        width:250,
        backgroundColor:"#2BDA8E",
        height:50,
        justifyContent:"center"
    },
    titleBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:24,
        marginHorizontal:16
    }
});