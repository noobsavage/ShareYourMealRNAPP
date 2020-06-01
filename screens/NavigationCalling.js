import React from "react";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Dimensions } from "react-native";
GLOBAL = require ('./global.js');

import { Feather,Octicons } from "@expo/vector-icons";

import {
    ProfileScreen,
    MessageScreen,
    FoundationScreen,
    SignOutScreen
} from ".";
import Screen from './Screen';
import SideBar from "../components/SideBar";

export default class NavigationCalling extends React.Component{
    componentDidMount(){
        fetch('http://192.168.1.10:8000/api/displayProfileData',{
        method:'post',
        headers:{
          'Authorization': `Bearer ${GLOBAL.mytoken}`,
          'Content-Type':'application/json',
         'Accept': 'application/json'
        },
  
      }).then((response)=> response.json())
      .then((res)=>{
          
        GLOBAL.name=res.success.name;
        GLOBAL.image=res.success.image;
        
    }).catch((error)=>{
        console.error(error);
      }); 
    }
    render(){
        return(
          <App/>
          );
    }

}

const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen:Screen,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Feather name="home" size={16} color={tintColor} />
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />
            }
        },
        Message: {
            screen: MessageScreen,
            navigationOptions: {
                title: "Messages",
                drawerIcon: ({ tintColor }) => <Feather name="message-square" size={16} color={tintColor} />
            }
        },
        Orphanage_House: {
            screen: FoundationScreen,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Octicons name="organization" size={16} color={tintColor} />
            }
        },
        SignOut: {
            screen: SignOutScreen,
            navigationOptions: {
                title: "Sign Out",
                drawerIcon: ({ tintColor }) => <Feather name="log-out" size={16} color={tintColor} />
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props} />,

        drawerWidth: Dimensions.get("window").width * 0.85,
        hideStatusBar: true,

        contentOptions: {
            activeBackgroundColor: "#2BDA8E",
            activeTintColor: "#53115B",
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8
            },
            itemStyle: {
                borderRadius: 4
            }
        }
    }
);

  
  const App = createAppContainer(DrawerNavigator);