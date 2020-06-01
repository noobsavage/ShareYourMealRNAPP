import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, Alert } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
GLOBAL = require ('../screens/global.js');


export default SideBar  = props => (
    
    <ScrollView>
        <ImageBackground
            source={require("../assets/background.jpg")}
            style={{ width: undefined, padding: 16, paddingTop: 48 }}
        >
            <Image source={{uri:`${GLOBAL.image}`}} style={styles.profile} />
            <Text style={styles.name}>{GLOBAL.name}</Text>

            <View style={{ flexDirection: "row" }}>
               
                <Ionicons name="md-people" size={16} color="#323643" />
            </View>
        </ImageBackground>

        <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#323643",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8
    },
    followers: {
        color: "#323643",
        fontSize: 13,
        marginRight: 4
    }
});
