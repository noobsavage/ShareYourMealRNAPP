import React,{Component }from 'react';
import {View,StyleSheet,SafeAreaView,Text, Alert,RefreshControl } from 'react-native';
import {Ionicons, AntDesign} from "@expo/vector-icons";
import {Button} from 'native-base';

import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {API_URL} from '../API_URL';
import { Actions } from 'react-native-router-flux';
export default class ReservedSeats extends Component{
    constructor() {
        super();
        this.state = {
          data:[],
          status:'',
         
        };
      }
      
       

      

    
      componentWillMount(){
        this.fetchData();
        
    }
    fetchData = async ()=>{
        const response= await fetch(`${API_URL}/api/availableSeatsDeatils`);
        const json = await response.json();
        this.setState({data:json});

    }
        

    render(){
        const {goBack}=this.props.navigation;
        //console.log(this.state.data);
        filterdata = this.state.data.filter(function(item){
            return item.status == 0;
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
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:95}}>Reserved Seats</Text>
                   
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
                </View>
             
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