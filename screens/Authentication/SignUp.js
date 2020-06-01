import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../../components';
import { theme } from '../../constants';

export default class SignUp extends Component {
  state = {
    email: '',
    cPassword:'',
    username: '',
    password: '',
    errors: [],
    loading: false,
  }

  handleSignUp = async()=> {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    const { navigation } = this.props;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    if(this.state.email!='' && this.state.username!='' && this.state.password!='' && this.state.cPassword!='' ){
     if(reg.test(this.state.email)===true){
      if((this.state.password.length)>=8){
      if(this.state.password===(this.state.cPassword)){
        
      fetch('http://192.168.1.10:8000/api/register',{
        method:'post',
        headers:{
          'Content-Type':'application/json',
         'Accept': 'application/json'
        },
        body:JSON.stringify({
          
          
            "name":this.state.username,
              "email":this.state.email,
             "password":this.state.password,
             "c_password":this.state.cPassword
             
         
          
        })
      }).then((response)=> response.json())
      .then((res)=>{
        this.setState({ errors, loading: false });
        if(typeof(res.message)!="undefined"){
          Alert.alert("Sorry User is exist already");
        }
        else{
            Alert.alert("Success","You have succesfuly signed up",
            [
          {
            text: 'Continue', onPress: () => {
              navigation.navigate('Login')
            }
          }
        ],
        { cancelable: false })
        }
      }).catch((error)=>{
        console.error(error);
      });
      
    }
    else{
      this.setState({ errors, loading: false });
      Alert.alert("Password is not matched");
    }
  }else{
    this.setState({ errors, loading: false });
    Alert.alert("Please insert minimum 8 chracter");
  }
}else{
  this.setState({ errors, loading: false });
  Alert.alert("Email is not Correct")
}
  }

    else
    {
      this.setState({ errors, loading: false });
      Alert.alert("Please fill all fields")
    }
    
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Sign Up</Text>
          <Block middle>
          <Input
              label="Username"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
             // defaultValue={this.state.username}
              onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
            />
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
            <Input
              secure
              label="Confirm Password"
              error={hasErrors('cPassword')}
              style={[styles.input, hasErrors('cPassword')]}
              //defaultValue={this.state.cPassword}
              onChangeText={TextInputValue => this.setState({ cPassword: TextInputValue })}
            />
            
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
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
