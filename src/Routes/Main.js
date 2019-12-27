import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import Chat from "../screens/Chat/Chat";
import Profile from "../screens/Profile/Profile";





const AppStack = createStackNavigator({
    Home: BottomTabNavigator,
    Chatting: Chat,
    Profila: Profile,
    headerMode: 'none'
},
{
    headerMode: 'none'
});

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    
},
{
    headerMode:'none'
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppStack,
            Auth: AuthStack,
            
            
        },
        {
            initialRouteName: "Loading",
            headerMode:'none'
        }
    )
);