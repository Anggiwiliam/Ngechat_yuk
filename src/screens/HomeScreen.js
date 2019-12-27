import React from "react";
import { View, Text, StyleSheet, TouchableOpacity , SafeAreaView, ScrollView, Image, ToastAndroid,PermissionsAndroid} from "react-native";
import * as firebase from "firebase";
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Database, Auth} from '../Config/Firebase';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';

export default class HomeScreen extends React.Component {
    state = {
        userId: null,
        permissionsGranted: null,
        errorMessage: null,
        loading: false,
        updatesEnabled: false,
        location: {},
        photo: null,
        imageUri: null,
        imgSource: '',
        uploading: false,
      };
    
      componentDidMount = async () => {
        const userId = await AsyncStorage.getItem('userid');
        const userName = await AsyncStorage.getItem('user.name');
        const userAvatar = await AsyncStorage.getItem('user.photo');
        const userEmail = await AsyncStorage.getItem('user.email');
        this.setState({userId, userName, userAvatar, userEmail});
      };
    
    signOutUser = async () => {
        await AsyncStorage.getItem('userid')
        .then(async userid => {
          Database.ref('user/' + userid).update({status: 'Offline'});
          await AsyncStorage.clear();
          Auth.signOut();
          ToastAndroid.show('Logout success', ToastAndroid.SHORT);
          // this.props.navigation.navigate('Out');
          this.props.navigation.navigate('Landing');
        })
        .catch(error => this.setState({errorMessage: error.message}));
    };

    requestCameraPermission = async () => {
      try {
          const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ])
          return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
          console.log(err);
          return false
      }
  }
  
    changeImage = async type => {
      // console.log(upp)
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
  
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
      };
  
      let cameraPermission =
        (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) &&
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ) &&
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      if (!cameraPermission) {
        cameraPermission = await this.requestCameraPermission();
      } else {
        ImagePicker.showImagePicker(options, response => {
          ToastAndroid.show(
            'Rest asure, your photo is flying to the shiny cloud',
            ToastAndroid.SHORT,
          );
          let uploadBob = null;
          const imageRef = firebase
            .storage()
            .ref('avatar/' + this.state.userId)
            .child('photo');
          fs.readFile(response.path, 'base64')
            .then(data => {
              return Blob.build(data, {type: `${response.mime};BASE64`});
            })
            .then(blob => {
              uploadBob = blob;
              return imageRef.put(blob, {contentType: `${response.mime}`});
            })
            .then(() => {
              uploadBob.close();
              return imageRef.getDownloadURL();
            })
            .then(url => {
              ToastAndroid.show(
                'Your cool avatar is being uploaded, its going back to your phone now',
                ToastAndroid.SHORT,
              );
              firebase
                .database()
                .ref('user/' + this.state.userId)
                .update({photo: url});
              this.setState({userAvatar: url});
              AsyncStorage.setItem('user.photo', this.state.userAvatar);
            })
  
            .catch(err => console.log(err));
        });
      }
    };

    render() {
        const {uploading} = this.state;

        const disabledStyle = uploading ? styles.disabledBtn : {};
        return (
            
            <View style={styles.container}>
                <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titlebar}>
                    </View>
                    <View style={{ alignSelf: "center"}}>
                        <View style={styles.profileimage}>
                            <Image source={{
                uri: this.state.userAvatar,
              }} style={styles.image} ></Image>                  
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
                    <Ion name='ios-camera' size={40} color='#18A4E0' />              
              </TouchableOpacity>
                    </View>
                    <View style={{ height: 230,width:330, backgroundColor: '#ffffff', marginHorizontal: 10, marginTop: 10, marginBottom: 5, padding: 10, borderRadius:10 }}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 18}}>
              Account
            </Text>
            <Text style={{fontSize: 18}}>{this.state.userName}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              Username
            </Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>{this.state.userEmail}</Text>
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
        width: null,
        height:null,
        flex: 1,
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
        overflow: "hidden"
    },
    infocontainer:{
        alignSelf:'center',
        alignItems:'center',
        marginTop: 3
    }
});
