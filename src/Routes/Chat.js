import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Chat from '../screens/Chat/Chat'

const Chate = createStackNavigator({
  Home: {
    screen: Chat,
    navigationOptions: {
         title: "Chat",
         headerTintColor: '#ffffff',
    //   headerLeft: <Image source={require('../Assets/images/logo/header/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
      headerStyle: {
        backgroundColor: '#18A4E0',
      
      },
      headerMode: 'none'
    },
  }
})

export default createAppContainer(Chate)