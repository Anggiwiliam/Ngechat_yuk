import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Contact from '../screens/Contact/Contact'

const Kontak = createStackNavigator({
  Home: {
    screen: Contact,
    navigationOptions: {
      title: "Contact",
      headerTintColor: '#ffffff',
      headerLeft: <Image source={require('../../assets/chat2.png')} style={{marginLeft:15,width:50, height:50}} />,
      headerStyle: {
        backgroundColor: '#18A4E0',
      },
    },
  }
})

export default createAppContainer(Kontak)