import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Chat from '../screens/Chat/Listchat'

const Chate = createStackNavigator({
  Home: {
    screen: Chat,
    navigationOptions: {
         title: "Chat",
         headerTintColor: '#ffffff',
      headerLeft: <Image source={require('../../assets/chat2.png')} style={{marginLeft:15, width:50, height:50}} />,
      headerStyle: {
        backgroundColor: '#18A4E0',
      
      },
      headerMode: 'none'
    },
  }
})

export default createAppContainer(Chate)