import React, { Component } from "react";
import MapView from 'react-native-maps';
import {View,StyleSheet,Text,Dimensions,Slider,Alert} from "react-native";
import { Container, Header, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native-gesture-handler";
import UpdateSeatStatus from "./UpdateSeatStatus.js";
import {API_URL} from '../API_URL';
const {width,height}= Dimensions.get('window')
const SCREEN_HEIGHT = height 
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA=0.0922
const LONGITUDE_DELTA= LATITUDE_DELTA* ASPECT_RATIO
GLOBAL = require ('./global.js');


export default class Maps extends Component{
 
  constructor(props){
    super(props)
    this.state={
      errors:'',
      logged:0,
      latted:0,
      status:0,
      address:[],
      host_id:'',
      data:'',
      milisecond:'',
      initialRegion:{
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0
      },
      markerPosition:{
        latitude:0,
        longitude:0
      }
      
    }
  }
 

  //watchID: ?number=null

  componentDidMount(){
    
    navigator.geolocation.getCurrentPosition((position)=>{
      var lat= parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion={
        latitude:lat,
        longitude:long,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }
      this.setState({initialPosition:initialRegion})
      this.setState({markerPosition:initialRegion})
    },
    (error)=>alert(JSON.stringify(error)),
    {enableHighAccuracy:true,timeout:20000,maximumAge:1000})

    this.watchID=navigator.geolocation.watchPosition((position)=>{
      var lat= parseFloat(position.coords.latitude)
      var long= parseFloat(position.coords.longitude)

      var lastRegion={
        longitude:long,
        latitude:lat,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
        
      } 
      this.setState({
        logged: long},function(){
         // console.log(this.state.logged);
        })
        this.setState({
          latted: lat},function(){
           // console.log(this.state.logged);
          })
          // console.log(long)
          // console.log(lat)
       this.setState({initialPosition:lastRegion})
      this.setState({markerPosition:lastRegion})
    })
    
    //Get Data from Seat Table 
    const errors = [];
    
    fetch(`${API_URL}api/SeatsDetails`,{
        method:'post',
        headers:{
          'Authorization': `Bearer ${GLOBAL.mytoken}`,
          'Content-Type':'application/json',
         'Accept': 'application/json'
        },
  
      }).then((response)=> response.json())
      .then((res)=>{
        if(!res.success)
    {  
      console.log("nothing")
  }

  else{
    this.setState({host_id:res.success.host_id});
    var noOfSeat=res.success.No_of_seat;
    var time=res.success.time;
    this.setState({status:res.success.status})
    var timeParts = time.split(":");
    var finaltime=((+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000));
    this.setState({milisecond:finaltime})
    var lastRegion={
      longitude:res.success.longitude,
      latitude:res.success.latitude,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA
      
    } 
    this.setState({initialPosition:lastRegion})
  this.setState({markerPosition:lastRegion})
  }
      
       
      }).catch((error)=>{
        console.error(error);
      });
//this.Checkingaddress();
     


//End Seat Data API

  }
  componentWillMount(){
    navigator.geolocation.clearWatch(this.watchID)
  }
  _continue = async () => {
    let regionName = await Location.reverseGeocodeAsync( { longitude: this.state.logged, latitude:this.state.latted } );
   
    
    const myapikey=`AIzaSyCSolZfxX4dMP1_o6gNfXw8yf0X_J8GKzI`

  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latted + ',' + this.state.logged + '&key=' + myapikey)
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson)
           const addressarray=responseJson.results;
           const filterdata=addressarray.map(item=>( 
            item.formatted_address
            ))
            
          Actions.Seat({lo:this.state.logged,la:this.state.latted,address:filterdata[0]});
          })

    
    
}
// openSeatDetails=()=>{
//   Actions.ShowSeatDetails({host_id:this.state.host_id});
// }


Checkingaddress = async ()=>{
  // const myapikey=`AIzaSyCSolZfxX4dMP1_o6gNfXw8yf0X_J8GKzI`
  // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latted + ',' + this.state.logged + '&key=' + myapikey)
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         //  console.log('ADDRESS GEOCODE is BACK!! => ' + responseJson.results.formatted_address);
  //            //this.setState({data:responseJson.results}) 
  //          const addressarray=responseJson.results;
           
  //          const filterdata=addressarray.map(item=>( 
  //           item.formatted_address
  //           ))
  //         this.setState({data:filterdata[0]})
  //         })

    
          
  
}

// sleep = async(ms)=>{
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// updateApistatus=async()=>{
//   this.sleep(this.state.milisecond)
//   fetch('http://192.168.1.14:8000/api/SeatStatusUpdate',{
//         method:'put',
//         headers:{
//           'Authorization': `Bearer ${GLOBAL.mytoken}`,
//           'Content-Type':'application/json',
//          'Accept': 'application/json',
//         },
//       }).then((response)=> response.json())
//       .then((res)=>{
//       }).catch((error)=>{
//         console.error(error);
//       });
// }


 

  render() {
    
  //   switch(this.state.status){
  //   case 1:
  //   return(
  //       <View style={styles.container}>
      
  //       <MapView
  //         provider="google"
  //         style={styles.map}
  //         initialRegion={this.state.initialPosition}
  //         mapType="standard"
  //         showsCompass={true}
  //         >
  //               <MapView.Marker
  //               coordinate={this.state.markerPosition}
  //               // onPress={this.openSeatDetails}
  //               >
  //                 <View >  
  //                 <Icon name='chair' size={30} />
  //                 </View>
  //               </MapView.Marker>
            
  //         </MapView>
          
  //         <View style={styles.cardbottom}>
         
  //               <Container style={{flexDirection: 'column',paddingTop:13}}>
  //              <Button rounded light style={{height:50,width:240,justifyContent:'center',shadowOpacity: 0.3,marginTop:20}}
                 
               
  //                 onPress={this._continue}
  //                  >
  //                 <Icon name='chair' size={30} />
  //                 <Text style={{fontWeight: 'bold'}}>   Create Seat</Text>

  //               </Button>
  //               </Container>
  //               <Container style={{flexDirection: 'column',paddingTop:13}}>
  //               <Button rounded light style={{height:50,width:240,justifyContent:'center',shadowOpacity: 0.3,marginTop:10}}
  //                 //onPress={()=>Actions.AvailableSeat()}
  //                 onPress={()=>Actions.AvailableSeat()}
  //                 >
                 
  //                <Text style={{fontWeight: 'bold'}}>   Available Seat</Text>

  //              </Button>

  //               </Container>
  //         </View>
  //     {/* <UpdateSeatStatus/>    
  //      */}
  //     </View>
      
  //     );
  //     break;
      
  //  case 0: 
    return (
      
      <View style={styles.container}>
      
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={this.state.initialPosition}
          mapType="standard"
          showsCompass={true}
          // pitchEnabled={false}
          // rotateEnabled={false} 
          // zoomEnabled={false}
          // scrollEnabled={false}
          
          >
            
            <MapView.Marker
                coordinate={this.state.markerPosition}>
                  <View style={styles.radius}>
                    <View style={styles.marker}/>
                  </View>
                </MapView.Marker>
                
          </MapView>
          <View style={styles.cardbottom}>
          
                <Container style={{flexDirection: 'column',paddingTop:13}}>
               <Button rounded light style={{height:50,width:240,justifyContent:'center',shadowOpacity: 0.3,marginTop:10}}
                 
                  onPress={this._continue}
                   >
                  <Icon name='chair' size={30} />
                  <Text style={{fontWeight: 'bold'}}>   Create Seat</Text>

                </Button>
                </Container>
                <Container style={{flexDirection: 'column'}}>
                <Button rounded light style={{height:50,width:240,justifyContent:'center',shadowOpacity: 0.3,marginTop:5}}
                onPress={()=>Actions.AvailableSeat()}
                  >
                  <MaterialIcons name="event-available" size={30} color="black" />
                 <Text style={{fontWeight: 'bold'}}>   Available Seat</Text>
               </Button>
                </Container>
                <Container style={{flexDirection: 'column'}}>
                <Button rounded light style={{height:50,width:240,justifyContent:'center',shadowOpacity: 0.3,marginTop:5}}
                onPress={()=>Actions.ReservedSeats()}
                  >
                  <AntDesign name="save" size={30} color="black" />
                 <Text style={{fontWeight: 'bold'}}>  Reserved Seat</Text>
               </Button>
                </Container>
              
                
          </View>
        
        
        
      </View>
    )
  //   break ;
            
  // }
          }
        }

const styles = StyleSheet.create({
  radius:{
      height:50,
      width:50,
      borderRadius:50/2,
      overflow:'hidden',
      backgroundColor:'rgba(0,122,255,0.1)',
      borderWidth:1,
      borderColor:'rgba(0,122,255,0.3)',
      alignItems:'center',
      justifyContent:'center'
    },
  marker:{
      height:20,
      width:20,
      borderWidth:3,
      borderColor:'white',
      borderRadius:20/2,
      overflow:'hidden',
      backgroundColor:'#007AFF'
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF'
  },
  map:{
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  },
  cardbottom:{
    width:'100%',
    height:220,
    backgroundColor:'#ffff',
    //justifyContent:'center',
    alignItems:'center',
    paddingTop:20,
    bottom:0,
    position:'absolute',
    opacity: 0.9,
    borderRadius:20,
  },
});
