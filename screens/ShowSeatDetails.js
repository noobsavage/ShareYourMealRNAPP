import React, { Component } from 'react';
import {View,Text,StyleSheet,SafeAreaView,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Ionicons,MaterialIcons } from "@expo/vector-icons"
import {Button} from 'native-base';
export default class ShowSeatDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            waystatus:'',
            image:'',
            
        };
    }
    // async componentDidMount(){
    //     const {host_id} = this.props;

    //     fetch(`http://192.168.1.5:8000/api/displaySeatDatawithprofile/${host_id}`,{
    //     method:'get',
    //     headers:{
    //       'Content-Type':'application/json',
    //      'Accept': 'application/json'
    //     },
  
    //   }).then((response)=> response.json())
    //   .then((res)=>{
    //     this.setState({name:res.successProfile.name})
    //     this.setState({image:res.successProfile.image})
    //     this.setState({waystatus:res.successProfile.waystatus})

    // }).catch((error)=>{
    //     console.error(error);
    //   }); 
    // }


    render(){
        const {goBack} = this.props.navigation;

        return(
            <SafeAreaView style={styles.container}>
            
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:110}}>Seat Details</Text>
            </View>
                <View style={styles.containerBox}>
                {/* <View style={styles.profileImage}>
                <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                
                </View> */}
                <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Faraz</Text>
                </View>
                <View style={styles.statsContainer}>
              {/* <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Status</Text>
                  <Text style={[styles.text, styles.subText]}>now</Text>
              </View> */}
              <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Restaurant</Text>
                  <Text style={[styles.text, styles.subText]}>Triple One</Text>
              </View>
          </View>
          <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>00</Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> : </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>59</Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> : </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>43</Text>
                </View>
                <Button rounded style={styles.postSeat}
                    >
                        <Text>Remove Seat</Text>
                        </Button>
                </View>
                
            </SafeAreaView>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",

    },
    profileImage:{
        width:130,
        height:130,
        borderRadius:100,
        overflow :"hidden",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:20
        
    },
    image:{
        flex:1,
        width:undefined,
        height:undefined
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
    marginBottom:300
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
    justifyContent:"center"
}

});