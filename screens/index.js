import React from "react";
import Screen from "./Screen";
import Profile from "./Profile";
import Seat from './Seat';
import Foundation from './Foundation';
import Check from "../Check";
import LoginScreen from "./Chat/LoginScreen";

export const ProfileScreen = ({ navigation }) =>
<Profile navigation={navigation} name="Profile"/>;

export const SeatScreen = ({ navigation }) =>
<Seat navigation={navigation} name="Seat"/>;


export const MessageScreen = ({ navigation }) => 
<LoginScreen navigation={navigation} name="Messages" />;

export const FoundationScreen = ({ navigation }) =>
 <Foundation navigation={navigation} name="Foundation" />;
 

export const SignOutScreen = ({ navigation }) =>
 <Check navigation={navigation} name="SignOut" />;