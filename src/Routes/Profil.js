import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Profil from '../screens/HomeScreen'

const Profile = createStackNavigator({
  Home: {
    screen: Profil,
    navigationOptions: {
      // title: "My Account",
      // headerTintColor: '#ffffff',
    //   headerLeft: <Image source={require('../Assets/images/logo/header/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
      headerStyle: {
        backgroundColor: '#18A4E0',
      },
    },
  }
})

export default createAppContainer(Profile)