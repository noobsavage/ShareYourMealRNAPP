import React, { Component } from 'react'
import { Alert,ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { Button, Block, Input, Text } from '../../components';
import { theme } from '../../constants';
import { Actions } from 'react-native-router-flux';

export default class FoundationLogin extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  }

  handleLogin = async()=> {
    const { navigation } = this.props;
    const errors = [];
   
    Keyboard.dismiss();
    this.setState({ loading: true });

    if(this.state.email=='foundation@admin.com' && this.state.password=='12345678')
    {
      Alert.alert("Success","You have succesfuly login For Foundation Panel",
      [
    {
      text: 'Continue', onPress: () => {
         Actions.FoundationPanel();
      }
    }
  ],
  { cancelable: false })
    }
  
    else{
            Alert.alert("Error", "These credentials do not match our records");
    }
    
   

  }
 notify(){
    Alert.alert('Please contact with Admin Support');
 }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Login</Text>
          <Block middle>
            <Input
            email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              //defaultValue={this.state.email}
              onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              //defaultValue={this.state.password}
              onChangeText={TextInputValue => this.setState({ password: TextInputValue })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Login</Text>
              }
            </Button>
            

            <Button onPress={()=>this.notify()}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
