import React, { Component } from 'react'
import { Alert,ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import {API_URL} from '../../API_URL';
import { Button, Block, Input, Text } from '../../components';
import { theme } from '../../constants';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
GLOBAL = require ('../global.js');
export default class Login extends Component {
  state = {
    femail:'',
    fpassword:'',
    email: '',
    password: '',
    errors: [],
    tokenstore:'',
    loading: false
  }

  handleLogin = async()=> {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    const { navigation } = this.props;
    const errors = [];
    //GLOBAL.mytoken=this;
    Keyboard.dismiss();
    this.setState({ loading: true });


    
     if(this.state.email!=''){
      if(reg.test(this.state.email)===true){
       if(this.state.password!=''){
    fetch(`${API_URL}api/login`,{
      method:'post',
      headers:{
        'Content-Type':'application/json',
       'Accept': 'application/json'
      },
      body:JSON.stringify({
        
        
            "email":this.state.email,
           "password":this.state.password
         
      })
    })
    .then((response)=> response.json())
    .then((res)=>{
        var store=JSON.stringify(res)
      //this.setState({tokenstore:token}) 
      
      this.setState({ errors, loading: false });
      if(store==='{"error":"Unauthorised"}'){
        Alert.alert("Error", "These credentials do not match our records");
      }
      else {
        GLOBAL.mytoken=res.success.token;
          Alert.alert("Success","You have succesfuly login",
          [
        {
          text: 'Continue', onPress: () => {
             Actions.NavigationCalling();
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
    Alert.alert("Please insert Password")
  }
}else{
  this.setState({ errors, loading: false });
  Alert.alert("Please provide appropriate email")
}
}
  else{
    this.setState({ errors, loading: false });
    Alert.alert("Please insert email first")
  }

  }
 

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <ScrollView>
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
            

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </ScrollView>
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
