import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from '../screens/Authentication/Welcome';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp';
import Forgot from '../screens/Authentication/Forgot';
import FoundationLogin from '../screens/Authentication/FoundationLogin';
import LoginScreen from '../screens/Chat/LoginScreen';
import ChatScreen from '../screens/Chat/ChatScreen';

import { theme } from '../constants';

const screens = createStackNavigator({
  Welcome,
  Login,
  SignUp,
  Forgot,
  FoundationLogin
},
{
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
},
{
  Login: LoginScreen,
  Chat: ChatScreen
},
{
  headerMode: "none"
});

export default createAppContainer(screens);