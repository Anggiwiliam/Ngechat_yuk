import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from './Profil';
import Chat from './Chat';
import Contact from './Contact';
// import Ops from '../Screens/404/ops';
// import About from '../Screens/About/About';
// import Bus from '../Screens/404/Bus';

const BottomTabNavigator = createBottomTabNavigator({
  Chat: Chat,
  'Kontak': {
    screen: Contact,
  },
  Profil: {
    screen: HomeScreen,
  },
  // 'My Account': {
  //   screen: Chat,
  // },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Chat') {
        iconName = 'ios-chatbubbles';
      } else if (routeName === 'Kontak') {
        return <AntDesign name='addusergroup' size={32} color={focused ? '#18A4E0' : '#bababa'} />
      }  else if (routeName === 'Profil') {
        return <EvilIcons name='user' size={40} color={focused ? '#18A4E0' : '#bababa'} />
      }
      return <Icon name={iconName} size={26} color={focused ? '#18A4E0' : '#bababa'} />;
    },
  }), 
  headerMode:'none',
  tabBarOptions: {
    activeTintColor: '#18A4E0',
    inactiveTintColor: '#bababa',
    
    style:{
      height:60, 
      paddingBottom: 8, 
      paddingTop: 8,
      borderTopWidth:0, 
      borderTopColor:'gray',
    },
  }
}
);

export default BottomTabNavigator;
