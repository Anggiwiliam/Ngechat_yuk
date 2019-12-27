import React from "react";
import { View, Text, StyleSheet, TouchableOpacity , SafeAreaView, ScrollView, Image, ToastAndroid} from "react-native";
import * as firebase from "firebase";
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Database, Auth} from '../../Config/Firebase';

export default class Profile extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
          title: navigation.getParam('item').name + "'s Profile",
        };
      };
      constructor(props) {
        super(props);
        this.state = {
          person: props.navigation.getParam('item'),
          items: props.navigation.getParam('item'),
        };
      }

    render() {
        return (
            <>
            <View style={styles.container}>
                <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titlebar}>
                    </View>
                    <View style={{ alignSelf: "center"}}>
                        <View style={styles.profileimage}>
                            <Image  source={{
                uri: this.state.person.photo,
              }} style={styles.image} ></Image>                  
                        </View>
                      
                    </View>
                    <View style={{ height: 230,width:330, backgroundColor: '#ffffff', marginHorizontal: 10, marginTop: 10, marginBottom: 5, padding: 10, borderRadius:10 }}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 18}}>
              Account
            </Text>
            <Text style={{fontSize: 18}}>{this.state.person.name}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              Username
            </Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>{this.state.person.email}</Text>
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
                <TouchableOpacity style={{ marginTop: 5 }} onPress={() =>
                this.props.navigation.navigate('Chatting', {
                  item: this.state.person,
                })
              } >   
                    <Text style={{marginRight:50}}><Icon name='android-messages' size={20}/>   Send Message to {this.state.person.name}</Text>
                </TouchableOpacity>
                </View>
                   
                  
                  <View>
                    <Button>edit</Button>
                  </View>
                </ScrollView>
                
            </SafeAreaView> 
           
                
            </View>
</>

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
        width: null,
        height:null,
        resizeMode:'cover'
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
        overflow: "hidden",
        
    },
    infocontainer:{
        alignSelf:'center',
        alignItems:'center',
        marginTop: 3
    }
});
