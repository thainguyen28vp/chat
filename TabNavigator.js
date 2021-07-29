
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as React from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import Home from './screens/Home';
import UserScreen from './screens/UserScreen';
const Tab = createBottomTabNavigator();

const tabNavigation = {
    backgroundColor: '#fff',
    height: 60,

}
const shadow = {
    shadowColor: '#ccc',
    shadowOffset: {
        width: 0,
        height: 10
    }, shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
}
export default function TabNavigation({ user }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    route.name === 'Chat' ?
                        iconName = 'facebook-messenger' :
                        iconName = 'user-alt'
                    return <>
                        <FontAwesome5 name={iconName} size={25} color={color} />
                        <Text style={{ color: color }}>{route.name}</Text>
                    </>;
                },
            })}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#3880FF',
                inactiveTintColor: 'gray',
                style: { ...tabNavigation, ...shadow }
            }}
        >

            <Tab.Screen name="Chat">
                {props => <Home {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Cá nhân">
                {props => <UserScreen {...props} user={user} />}
            </Tab.Screen>
        </Tab.Navigator>


    );
}