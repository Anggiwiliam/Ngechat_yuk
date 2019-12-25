import React from "react";
import { View, Text, StyleSheet, ActivityIndicator,Image } from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                  source={require('../../assets/chat2.png')}
                  style={{
                    width: 50,
                    height:50,
                  }}
                />
                <ActivityIndicator ></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#EEEBE8'
    }
});
