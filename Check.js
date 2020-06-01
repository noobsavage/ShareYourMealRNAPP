import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading} from 'expo';
import {  Asset } from 'expo-asset';

import Navigation from './navigation';

import { Block } from './components';

// import all used images
const images = [
  require('./assets/back.png'),
  require('./assets/illustration_1.png'),
  require('./assets/illustration_2.png'),
  require('./assets/illustration_3.png'),
  require('./assets/illustration_4.png'),
];

export default class Check extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block white>
        <Navigation/>
      </Block>
    );
  }
}
