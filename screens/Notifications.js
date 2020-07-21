import React,{Component} from 'react';
import {View,Text, StyleSheet,SafeAreaView,ScrollView,FlatList, Alert} from  "react-native";
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {Button } from "native-base";
import {API_URL} from "../API_URL";
export default class Notifications extends Component{
    constructor() {
        super();
        this.state = {
          data:[],
            name:[],
            statusValue:'',
           
        };
      }
     
      componentWillMount(){
        this.fetchData();
        
    }
    updateSeatRequestStatus(){
        fetch(`${API_URL}api/updateSeatRequestStatus`,{
            method:'put',
            headers:{
                Authorization:`Bearer ${GLOBAL.mytoken}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
        }).then((response)=>response.json())
        .then((res)=>{
            if(res.success==1){
                this.setState({name:[]})
                this.setState({data:[]})
                this.setState({statusValue:1})
                Alert.alert("Seat is Reserved")
                 this.SeatStatusUpdate();
            }
        })
    }
    SeatStatusUpdate(){
        fetch(`${API_URL}api/SeatStatusUpdate`,{
            method:'put',
            headers:{
                Authorization:`Bearer ${GLOBAL.mytoken}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
        }).then((response)=>response.json())
       
    }
    fetchData = async ()=>{
        //Another Calling
        fetch(`${API_URL}api/SendRequestDetails`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${GLOBAL.mytoken}`,
                'Content-Type':'application/json',
               'Accept': 'application/json'
              },
            }).then((response)=> response.json())
            .then((res)=>{  
                if(!res.successDetails && !res.successName){
                    console.log("nothing from seat req notfi")
                }
                else{
               this.setState({data:res.successDetails})
                this.setState({name:res.successName})
                this.setState({statusValue:res.statusValue})
                
                
                 }
            })
       
    }
    render(){
    filterdata = this.state.data.filter(function(item){
        return item.status == 0;
     }).map(function({status,requested_seat}){
         return {status,requested_seat};
     });

console.log(filterdata)
    
      const { goBack } = this.props.navigation;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} style={{marginHorizontal:10}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:95}}>Seats Request</Text>
                   
            </View>
            <FlatList
            data={filterdata}
            keyExtractor={(x,i)=>i}
            renderItem = {({item})=>
            <View style={{flex:1}}>
                <Text style={{paddingLeft:10,paddingTop:30,fontWeight:"700",fontSize:20}}>You have Received <Text style={{color:"red"}}>{`${item.requested_seat}`}</Text>
                <Text style={{color:"red"}}> Seats </Text> Request from </Text>
               
                
            </View>
            }/>
            {this.state.statusValue==0?
            <View>
            <Text style={{color:"blue",fontSize:20,"fontWeight":"700",paddingLeft:10}}>{this.state.name}</Text>
                <Button rounded style={styles.postSeat}
                onPress={()=>this.updateSeatRequestStatus()}
                >
                 <Text>Accept</Text>
                </Button></View>
            : null}

            </ScrollView>
            </SafeAreaView>
        );
    }



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
        width:150,
        backgroundColor:"#2BDA8E",
        height:40,
        marginTop:25,
        justifyContent:"center"
    }
})