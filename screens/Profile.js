import React from "react";
import { StyleSheet,Text,View,SafeAreaView,Image,ScrollView } from "react-native";
import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import Screen from './Screen';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userid:'',
            name:'',
            occupation:'',
            waystatus:'',
            image:'',
            phone:'',
            email:'',
        };
    }
    _menu = null;

    setMenuRef = ref => {
      this._menu = ref;
    };
  
    hideMenu = () => {
        this._menu.hide();
     Actions.EditProfile();
    };
  
    showMenu = () => {
      this._menu.show();
    };
    
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
        this.setState({userid:res.success.user_id})
        this.setState({name:res.success.name})
        this.setState({occupation:res.success.occupation})
        this.setState({waystatus:res.success.waystatus})
        this.setState({image:res.success.image})
        this.setState({phone:res.success.phone})
        this.setState({email:res.successEmail})

    }).catch((error)=>{
        console.error(error);
      }); 
    }

    render(){
        const {goBack} = this.props.navigation;
        const userIdCheck=this.state.userid;
        if(userIdCheck==' '){
        return (
      <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
              <Ionicons name="ios-arrow-back" size={24} color="#52575D"
              onPress={()=>goBack()}
              ></Ionicons>
              <Text style={{fontSize: 22,alignContent:"center",paddingBottom:10,fontWeight:"400"}}>Profile</Text>
              
              <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>
         <Ionicons name="md-more" size={28} color="#52575D"></Ionicons>
          </Text>}
        >
          <MenuItem onPress={this.hideMenu}>Edit Profile</MenuItem>
        </Menu>
              
          </View>

          <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                  <Image source={require("../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
              </View>
              {/* <View style={styles.dm}>
                  <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
              </View> */}
              <View style={styles.active}></View>
              <View style={styles.add}>
                  <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}
                  onPress={this.hideMenu}></Ionicons>
              </View>
          </View>

          <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Mr. / Mrs</Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Sub Name/Occu.</Text>
          </View>

          <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Status</Text>
                  <Text style={[styles.text, styles.subText]}>Hey I'm here</Text>
              </View>
              <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Email</Text>
                  <Text style={[styles.text, styles.subText]}>user@shareyourmeal.com</Text>
              </View>
              <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 24 }]}>Phone No.</Text>
                  <Text style={[styles.text, styles.subText]}>+92xxxxxxx</Text>
              </View>
          </View>

          <Text style={[styles.subText, styles.recent]}>Reviews</Text>
          <View style={{ alignItems: "center" }}>
              <View style={styles.recentItem}>
                  <View style={styles.activityIndicator}></View>
                  <View style={{ width: 250 }}>
                      <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                          Very Cooperative and come on time  <Text style={{ fontWeight: "400" }}>Nabeel</Text> and <Text style={{ fontWeight: "400" }}>Zain</Text>
                      </Text>
                  </View>
              </View>

              <View style={styles.recentItem}>
                  <View style={styles.activityIndicator}></View>
                  <View style={{ width: 250 }}>
                      <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                          Great Meeting ever <Text style={{ fontWeight: "400" }}>Asad</Text>
                      </Text>
                  </View>
              </View>
          </View>
      </ScrollView>
  </SafeAreaView>
    );
            }
            else{
                return(<SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleBar}>
                            <Ionicons name="ios-arrow-back" size={24} color="#52575D"
                            onPress={() => goBack()}
                            ></Ionicons>
                            <Text style={{fontSize: 22,alignContent:"center",paddingBottom:10,fontWeight:"400"}}>Profile</Text>
                            
                            <Menu
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}>
                       <Ionicons name="md-more" size={28} color="#52575D"></Ionicons>
                        </Text>}
                      >
                        <MenuItem onPress={this.hideMenu}>Edit Profile</MenuItem>
                      </Menu>
                            
                        </View>
              
                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={{uri:`${this.state.image}`}} style={styles.image} resizeMode="center"></Image>
                            </View>
                            {/* <View style={styles.dm}>
                                <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                            </View> */}
                            <View style={styles.active}></View>
                            <View style={styles.add}>
                                <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}
                                onPress={this.hideMenu}></Ionicons>
                            </View>
                        </View>
              
                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.name}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.occupation}</Text>
                        </View>
              
                        <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>Status</Text>
                                <Text style={[styles.text, styles.subText]}>{this.state.waystatus}</Text>
                            </View>
                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 24 }]}>Email</Text>
                                <Text style={[styles.text, styles.subText]}>{this.state.email}</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>Phone No.</Text>
                                <Text style={[styles.text, styles.subText]}>{this.state.phone}</Text>
                            </View>
                        </View>
              
                        <Text style={[styles.subText, styles.recent]}>Reviews</Text>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.recentItem}>
                                <View style={styles.activityIndicator}></View>
                                <View style={{ width: 250 }}>
                                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                        Very Cooperative and come on time  <Text style={{ fontWeight: "400" }}>Nabeel</Text> and <Text style={{ fontWeight: "400" }}>Zain</Text>
                                    </Text>
                                </View>
                            </View>
              
                            <View style={styles.recentItem}>
                                <View style={styles.activityIndicator}></View>
                                <View style={{ width: 250 }}>
                                    <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                        Great Meeting ever <Text style={{ fontWeight: "400" }}>Asad</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                );
            }
        }
  }
  

  const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"

    },
    text:{
    fontFamily:"HelveticaNeue",
    color:"#52575D",
    },
    subText:{
        fontSize:12,
        color:"#AEB5BC",
       // textTransform:"uppercase",
        fontWeight:"500"
    },
    image:{
        flex:1,
        width:undefined,
        height:undefined
    },
    titleBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:24,
        marginHorizontal:16
    },
    profileImage:{
        width:200,
        height:200,
        borderRadius:100,
        overflow :"hidden"
    },
    dm:{
        backgroundColor:"#41444B",
        position:"absolute",
        top:20,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    active:{
        backgroundColor:"#34FFB9",
        position:"absolute",
        bottom:28,
        left:10,
        padding:4,
        height:20,
        width:20,
        borderRadius:10
    },
    add:{
        backgroundColor: "#41444B",
        position: "absolute",
        bottom:0,
        right:0,
        width:60,
        height:60,
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center"
    },
    infoContainer:{
        alignSelf:"center",
        alignItems:"center",
        marginTop:16,

    },
    statsContainer:{
        flexDirection:"row",
        alignSelf:"center",
        marginTop:32
    },
    statsBox:{
        alignItems:"center",
        flex:1,
        
    },
    mediaCount:{
        backgroundColor:"#41444B",
        position:"absolute",
        top:"50%",
        marginTop:-50,
        marginLeft:30,
        width:100,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:12,
        shadowColor:"rgba(0,0,0,0.38)",
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:1   
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }

});
  