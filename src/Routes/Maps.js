import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Maps from '../screens/Maps/Maps'

const Mapss = createStackNavigator({
  Home: {
    screen: Maps,
    navigationOptions: {
      title: "Maps",
      headerTintColor: '#ffffff',
      headerLeft: <Image source={require('../../assets/chat2.png')} style={{marginLeft:15,width:50, height:50}} />,
      headerStyle: {
        backgroundColor: '#18A4E0',
      },
    },
  }
})

export default createAppContainer(Mapss)