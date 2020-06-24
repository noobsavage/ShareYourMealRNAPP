import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Seat from './Seat';
import NavigationCalling from './NavigationCalling';
//import ShowSeatDetails from './ShowSeatDetails';
import Check from '../Check';
import EditProfile from './EditProfile';
import Profile from './Profile';
import Screen from './Screen';
import FoundationPanel from './FoundationPanel';
import ChatScreen from './Chat/ChatScreen';
export default class App extends Component {
  render() {
    return (
      <Router hideNavBar= "false">
        <Scene key="root">
        <Scene key="NavigationCalling" component={NavigationCalling} hideNavBar={true} />
        <Scene key="Seat" component={Seat} title="Seat " hideNavBar={true}  />
        {/* <Scene key="ShowSeatDetails" component={ShowSeatDetails} title="Seat Details " hideNavBar={true}  /> */}

        <Scene key="Check" component={Check} title="None " hideNavBar={true} initial={true}  />
        <Scene key="EditProfile" component={EditProfile} title="None " hideNavBar={true}  />
        <Scene key="Profile" component={Profile} title="None " hideNavBar={true}  />
        <Scene key="Screen" component={Screen} title="None " hideNavBar={true}  />
        <Scene key="FoundationPanel" component={FoundationPanel} title="None " hideNavBar={true}  />
        <Scene key="ChatScreen" component={ChatScreen} title="None " hideNavBar={true}  />
        
        </Scene>
      </Router>

    )
  }
}