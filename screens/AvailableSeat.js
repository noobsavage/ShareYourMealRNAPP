import React,{Component }from 'react';
import {View,StyleSheet,SafeAreaView,Text, Alert,RefreshControl } from 'react-native';
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {Button} from 'native-base';

import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {API_URL} from '../API_URL';
import { Actions } from 'react-native-router-flux';
export default class AvailableSeat extends Component{
    constructor() {
        super();
        this.state = {
          data:[],
          status:'',
         
        };
      }
      
       

      deleteSeat(id){
        fetch(`${API_URL}api/deleteSeatByid/${id}`,{
            method:'DELETE',
            
        }).then((response)=> response.json())
            .then((res)=>{
                
                if(res.success=="1"){
                  Alert.alert("Seat is deleted Successfully")
                    this.fetchData();
                }
            });
        
      }
      SendSeatRequest(id,No_of_seat,host_id){
        
        fetch(`${API_URL}api/SendRequestForSeat`,{
            method:'post',
            headers:{
                'Authorization': `Bearer ${GLOBAL.mytoken}`,
                'Content-Type':'application/json',
               'Accept': 'application/json'
              },
              body:JSON.stringify({
          
          
                "seat_id":id,
                "host_id":host_id,
                  "requested_seat":No_of_seat,
                 "status":0,
            
              
            })
            }).then((response)=> response.json())
            .then((res)=>{
               Alert.alert(res);
        })
      }

    statusButton(id,No_of_seat,host_id){
        if(this.state.status=="1"){
            return(<Button rounded style={styles.postSeat}
            onPress={()=>this.deleteSeat(id)}>
                <Text>Remove Seat</Text>
                </Button>);
        }
        else{
            return(<Button rounded style={styles.postSeat}
            onPress={()=>this.SendSeatRequest(id,No_of_seat,host_id)}>
                <Text>Send Request</Text>
                </Button>)
        }
    }
      componentWillMount(){
        this.fetchData();
        
    }
    fetchData = async ()=>{
        const response= await fetch(`${API_URL}/api/availableSeatsDeatils`);
        const json = await response.json();
        this.setState({data:json});

        //Another Calling
        fetch(`${API_URL}api/removeButton`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${GLOBAL.mytoken}`,
                'Content-Type':'application/json',
               'Accept': 'application/json'
              },
            }).then((response)=> response.json())
            .then((res)=>{
               this.setState({status:res.success})
        })
       
    }

    render(){
        const {goBack}=this.props.navigation;
        //console.log(this.state.data);
        filterdata = this.state.data.filter(function(item){
            return item.status == 1;
         }).map(function({id,No_of_seat,host_id,name,placeName,time}){
             return {id,No_of_seat,host_id,name,placeName,time};
         });
        
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} style={{marginHorizontal:10}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:95}}>Available Seats</Text>
                   
            </View>
            <FlatList
            data={filterdata}
            keyExtractor={(x,i)=>i}
            renderItem = {({item})=>
            
            <View style={styles.containerBox}>
                <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {`${item.name}`}</Text>
                </View>
                <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Seats</Text>
                  <Text style={[styles.text, styles.subText]}>{`${item.No_of_seat}`}</Text>
              </View>
              <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Restaurant</Text>
                  <Text style={[styles.text, styles.subText]}> {`${item.placeName}`}</Text>
              </View>
          </View>
          <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {`${item.time}`}</Text>
              {/* <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> : </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>59</Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> : </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>43</Text> */}
                </View>
              
             {this.statusButton(`${item.id}`,`${item.No_of_seat}`,`${item.host_id}`)}  
            
                </View>
                }/>
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
    statsContainer:{
        flexDirection:"row",
        alignSelf:"center",
        marginTop:32
    },
    statsBox:{
        alignItems:"center",
        flex:1,
    },
containerBox:{
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    flex:1,
    color:'white',
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: '#323643',
},
infoContainer:{
    flexDirection:"row",
    alignSelf:"center",
    alignItems:"center",
    marginTop:20,

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
    marginTop:20,
    justifyContent:"center",
}

})