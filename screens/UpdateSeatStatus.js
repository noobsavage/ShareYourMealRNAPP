import React, { Component } from "react";
import {View,StyleSheet,Text,Dimensions,Slider,Alert} from "react-native";
import { Actions } from 'react-native-router-flux';


export default class UpdateSeatStatus extends Component{
    constructor(props){
        super(props)
        this.state={
          milisecond:''
        }
    }
    async delay(ms) {
        await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
    }
componentDidMount(){
    
    fetch('http://192.168.1.4:8000/api/SeatsDetails',{
        method:'post',
        headers:{
          'Authorization': `Bearer ${GLOBAL.mytoken}`,
          'Content-Type':'application/json',
         'Accept': 'application/json'
        },
  
      }).then((response)=> response.json())
      .then((res)=>{
        var time=res.success.time;
        var timeParts = time.split(":");
        var finaltime=((+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000));
        this.setState({milisecond:finaltime})
      }).catch((error)=>{
        console.error(error);
      });

    
    fetch('http://192.168.1.10:8000/api/SeatStatusUpdate',{
        method:'put',
        headers:{
          'Authorization': `Bearer ${GLOBAL.mytoken}`,
          'Content-Type':'application/json',
         'Accept': 'application/json',
        },
      }).then((response)=> response.json())
      .then((res)=>{
      }).catch((error)=>{
        console.error(error);
      });
    //   await sleep(this.state.milisecond)
    this.delay(this.state.milisecond)
      Actions.NavigationCalling();
        }
    
    


    render(){
        return(null);
    }

}