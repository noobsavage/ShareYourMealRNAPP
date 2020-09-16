import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RouteForCalling from './screens/RouteForCalling';
import Albums from './screens/Albums';


export default function App(){
  console.disableYellowBox = true;
  return(
    
    // <Albums/>
    <RouteForCalling/>
  );
}