import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import BottomTabNavigator from './BottomTabNavigator';
import Profil from '../screens/HomeScreen';
import Contact from '../screens/Contact/Contact'
import Chat from '../screens/Chat/Chat';


const HomeNavigation = createStackNavigator({
  Main: { 
    screen: BottomTabNavigator,
    navigationOptions: {
      
      headerMode: 'none'
      
      // headerLeft: <Image source={require('../../assets/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
    }, 
    header: null,
  },
  Profil: { 
    screen: Profil,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ef4339',
      },
      title: 'Profil',
      // header: null,
      // headerLeft: <Image source={require('../Assets/images/logo/header/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
    }, 
  },

  // Contact: { 
  //   screen: Contact,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: '#ef4339',
  //     },
  //     title: 'Contact',
  //     // header: null,
  //     // headerLeft: <Image source={require('../Assets/images/logo/header/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
  //   }, 
  // },
  Chating: { 
    screen: Chat,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ef4339',
      },
      title: 'Chat',
      // header: null,
      // headerLeft: <Image source={require('../Assets/images/logo/header/ic_header.png')} style={{marginLeft:15, aspectRatio: 2, resizeMode: 'contain'}} />,
    }, 
  },
},{
  
  })

export default createAppContainer(HomeNavigation)