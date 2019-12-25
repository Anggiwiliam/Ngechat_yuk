import React from "react";
import { View, Text, StyleSheet, TouchableOpacity , SafeAreaView, ScrollView, Image} from "react-native";
import * as firebase from "firebase";
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        name:"",
        displayName: ""
    };

    componentDidMount() {
        const { email, displayName,name } = firebase.auth().currentUser;

        this.setState({ email, displayName,name });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titlebar}>
                    </View>
                    <View style={{ alignSelf: "center"}}>
                        <View style={styles.profileimage}>
                            <Image source={require("../../assets/Bg.jpg")} style={styles.image} resizeMode="center"></Image>                  
                        </View>
                        <TouchableOpacity
                style={{
                  
                  left: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                //   backgroundColor: 'white',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderColor: '#E5E7E9',
                  borderWidth: 1,
                  marginBottom: -5,
                  
                }}
                onPress={this.changeImage}>
              <Ion name='ios-camera' size={40}/>
              </TouchableOpacity>
                    </View>
                    <View style={{ height: 200,width:330, backgroundColor: '#ffffff', marginHorizontal: 10, marginTop: 10, marginBottom: 5, padding: 10, borderRadius:10 }}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 18}}>
              Account
            </Text>
            {/* <Text style={{fontSize: 18}}>{this.state.name}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              tap to change Username
            </Text> */}
            {/* <View style={styles.separator}></View> */}
            <Text style={{fontSize: 18}}>{this.state.email}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>Email</Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>Info</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              Add a few words about yourself
            </Text>
          </View>
          <View style={{ height: 100,width:330, backgroundColor: '#ffffff', marginHorizontal: 10, marginTop: 10, marginBottom: 5, padding: 10, borderRadius:10 }}>
          <Text style={{color: '#f48023', marginVertical: 10, fontSize: 18}}>
              Other
            </Text>
                <TouchableOpacity style={{ marginTop: 5 }} onPress={this.signOutUser}>
                    <Text><Icon name='logout-variant' size={20}/>Logout</Text>
                </TouchableOpacity>
                </View>
                   
                  
                  
                </ScrollView>
                
            </SafeAreaView> 
           
                
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEBE8'
    },
    separator: {
        height: 2,
        backgroundColor: '#eeeeee',
        marginTop: 10,
        marginHorizontal: 10,
        marginLeft:10
      },
    text:{
        fontFamily:'HelveticaNeve',
        color: '#52575D',
    },
    image:{
        flex: 1,
        width: 300,
        height:200
    },
    titlebar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal:16
    },
    profileimage: {
        width: 200,
        height:200,
        borderRadius: 100,
        overflow: "hidden"
    },
    infocontainer:{
        alignSelf:'center',
        alignItems:'center',
        marginTop: 16
    }
});
