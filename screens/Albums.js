import React,{Component} from 'react';
import {View,Text} from "react-native";
import { TouchableOpacity,FlatList } from 'react-native-gesture-handler';


export default class Albums extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            pic1almbum1:'',
            pic2almbum1:'',
            pic1almbum2:'',
            pic2almbum2:'',
            pic1almbum3:'',
            pic2almbum3:'',

        };
    }
    componentWillMount(){
        this.fetchData();
    }
    fetchData = async ()=>{
        const response= await fetch('https://jsonplaceholder.typicode.com/photos');
        const json = await response.json();
        this.setState({data:json});
        this.picsRender();
        }

    picsRender(){
            var first=0;
        var second=0;
        var third=0;
        
            this.state.data.map((item)=>{
          if(item.albumId>first){
            third=second;
            second=first;
            first = item.albumId;
          }else if(item.albumId>second && item.albumId!=first){ 
            third=second;
            second = item.albumId;
          }else if(item.albumId>second && item.albumId!=second && item.albumId!=first){ 
            third = item.albumId;
          }
        })
        const album1=this.state.data.filter(item=>{
            return item.albumId==first;
        })
        const album2=this.state.data.filter(item=>{
            return item.albumId==second;
        })
        const album3=this.state.data.filter(item=>{
            return item.albumId==third;
        })
        
        this.setState({pic1almbum1:album1.slice(-1)[0]});        
       this.setState({pic2almbum1:album1.slice(-2)[0]});
        this.setState({pic1almbum2:album2.slice(-1)[0]});        
       this.setState({pic2almbum2:album2.slice(-2)[0]});
        this.setState({pic1almbum3:album3.slice(-1)[0]});      
       this.setState({pic2almbum3:album3.slice(-2)[0]});
        }
    
    
        
    
    
    render(){
        console.log(this.state.pic1almbum1)
       return(
            <View>
            <FlatList
            data={this.state.pic1almbum1}
            keyExtractor={(x,i)=>i}
            renderItem = {({item})=>
            <Text style={{paddingTop:50,paddingLeft:20}}>{`${item.title}`}</Text>
            }/>
            </View>
        );
    }



}
