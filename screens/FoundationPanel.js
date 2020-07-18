import React,{Component }from 'react';
import {View,StyleSheet,SafeAreaView,Image, Linking, Platform } from 'react-native';
import {Ionicons, AntDesign} from "@expo/vector-icons";
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {  Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import {API_URL} from '../API_URL';
export default class FoundationPanel extends Component{
state={
    data:[],
    phonestate:'',

}
    componentWillMount(){
        this.fetchData();
    }
    fetchData = async ()=>{
        const response= await fetch(`${API_URL}/api/mealdetails`);
        const json = await response.json();
        this.setState({data:json});
    }
    dialCall = (phonestatevar) => {

       // this.state.data.map((item)=>{
        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${phonestatevar}`;
        }
        else {
          phoneNumber = `telprompt:${phonestatevar}`;
        }
    //})
        Linking.openURL(phoneNumber);
   
      };


    render(){
        const {goBack} = this.props.navigation;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} style={{marginHorizontal:10}}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                    onPress={() => goBack()}
                    ></Ionicons>
                    <Text style={{fontSize: 22,fontWeight:"400",justifyContent:"center",marginLeft:110}}>Meal List </Text>
                   
            </View>
            <View style={{paddingTop:10,paddingLeft:10,paddingRight:10}}>
            <FlatList
            data={this.state.data}
            keyExtractor={(x,i)=>i}
            renderItem = {({item})=>
            
            <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={{paddingRight:10,fontSize:21,paddingTop:10}}>{`${item.name}`}</Text>
                  <Text note>{`${item.quantity}`}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri:`${item.image}`}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                {`${item.description}`}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                <AntDesign name="phone" size={16} color="black" />
                 <TouchableOpacity
                 onPress={()=>this.dialCall(phonestate=`${item.phone}`)}>
                  <Text>{`${item.phone}`}</Text>
                 
                  </TouchableOpacity>
                </Button>
              </Left>
            </CardItem>
          </Card>}
          />
           </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",

    },
    titleBar:{
        flexDirection:"row",
        //justifyContent:"space-between",
        marginTop:24,
        marginHorizontal:16
    },
})