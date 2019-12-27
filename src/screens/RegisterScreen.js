import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid } from "react-native";
import * as firebase from "firebase";
import {Database, Auth} from '../Config/Firebase';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isVisible: false,
          name: '',
          email: '',
          password: '',
          latitude: null,
          longitude: null,
          errorMessage: null,
          loading: false,
          updatesEnabled: false,
        };
    }
    handleSignUp = () => {
        const {email, name, password} = this.state;
        Auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.warn(response);
          Database.ref('/user/' + response.user.uid)
            .set({
              name: this.state.name,
              status: 'Offline',
              email: this.state.email,
              photo: 'https://img.pugam.com/2018/02/avatar1.png',
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              id: response.user.uid,
            })
            .catch(error => {
              ToastAndroid.show(error.message, ToastAndroid.LONG);
              this.setState({
                name: '',
                email: '',
                password: '',
              });
            });
          ToastAndroid.show(
            'Your account is successfully registered!',
            ToastAndroid.LONG,
          );

          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            name: '',
            email: '',
            password: '',
          });
          ToastAndroid.show(this.state.errorMessage.message, ToastAndroid.LONG);
        });
      // Alert.alert('Error Message', this.state.errorMessage);
    
    
    };

    render() {
        return (
            <View style={styles.container}>
                 <View style={{alignItems:'center', marginTop:20}}>
                {/* <Icon name='wechat' size={150} color='#7DC9E7'/> */}
                <Image
                  source={require('../../assets/chat2.png')}
                  style={{
                    width: 150,
                    height:150,
                  }}
                />
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                    <Text style={{ fontWeight: "500", color: "#18A4E0" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#EEEBE8'
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#18A4E0",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});
