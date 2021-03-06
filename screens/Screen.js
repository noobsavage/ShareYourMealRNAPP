import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,ScrollView } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import Maps from './Maps';
import { Actions } from "react-native-router-flux";

export default class Screen extends React.Component {
    render() {
        return (
           
                <View style={styles.container}>
             <SafeAreaView style={{flex:1}}>
          <View style={styles.titleBar}>
              <Ionicons name="md-menu" size={27} color="#52575D" onPress={this.props.navigation.openDrawer}></Ionicons>
              <Text style={{fontSize: 20,alignContent:"center",paddingBottom:10}}>Seats</Text>
              <TouchableOpacity
              onPress={()=>Actions.Notifications()}>
              <Ionicons name="md-notifications" size={27} color="#52575D"></Ionicons>
              </TouchableOpacity>
          </View>
          <View style={{marginTop:0,flex:1}}>
          <Maps/>
          </View>
              
        </SafeAreaView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"

    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    },
    head:{
        backgroundColor: 'whitesmoke'
    },
    titleBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:24,
        marginHorizontal:16
    },
});
