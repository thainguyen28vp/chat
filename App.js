// In App.js in a new project

import React, { useEffect, useState } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging';

import firestore from '@react-native-firebase/firestore';
import Login from './screens/LogIn';
import SignUp from './screens/SignUp';

import Chat from './screens/Chat';
import MyUser from './screens/MyUser';

import TabNavigation from './TabNavigator';
import HeaderHome from './components/HeaderHome';
import SearchUser from './screens/SearchUser';
import UserScreen from './screens/UserScreen';
import FriendAwaitScreen from './screens/FriendAwaitScreen';
import SearchFriend from './screens/SearchFriend';
import NewPost from './screens/NewPost';
import Addgroupchat from './screens/Addgroupchat';
import RNBootSplash from "react-native-bootsplash";
import Admin from './screens/Admin';
import ListUser from './screens/Admin/listUser';
import DetailUser from './screens/Admin/detailUser';
import ListPost from './screens/Admin/listPost';
import DetailPost from './screens/Admin/detailPost';
import Pending from './screens/Admin/Pending';
import Canceled from './screens/Admin/Canceled';
import Approved from './screens/Admin/Approved';
import CommentScreen from './screens/CommentScreen';
import { UpdateProfile } from './screens/UpdateProfile';
import ListAdmin from './screens/Admin/listAdmin';
import ForgotPass from './screens/ForgotPass';
import Error from './screens/Error';

const Stack = createStackNavigator();



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};





const Navigation = () => {
  const [user, setuser] = useState('')

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 3000);
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        messaging().getToken().then(token => {
          firestore().collection('users')
            .doc(userExist.uid)
            .update({
              status: "online",
              fcm: token
            })
        })
        firestore().collection('users')
          .doc(userExist.uid)
          .get().then(res => {
            setuser(res.data())
          })
      }

      else setuser("")
    })

    return () => {
      unregister()
    }

  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='SearchFriend'
        screenOptions={{
          headerTintColor: "#0099ff",
          headerShown: false
        }}

      >
        {user ?
          <>
            {
              user.decentralization == 0 ?
                <>
                  <Stack.Screen name="Tab"
                    options={{
                      headerShown: false

                    }}>
                    {props => <TabNavigation {...props} user={user} />}
                  </Stack.Screen>

                  <Stack.Screen name="chat"
                    options={{
                      headerShown: false

                    }}>
                    {props => <Chat {...props} user={user} />}
                  </Stack.Screen>

                  <Stack.Screen name="account"
                    options={{
                      headerShown: false,
                      gestureEnabled: true,
                      cardOverlayEnabled: true,
                      ...TransitionPresets.ModalPresentationIOS,
                    }}
                    mode="modal"
                  >
                    {props => <MyUser {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="header" >
                    {props => <HeaderHome {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="SearchUser">
                    {props => <SearchUser {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="UserScreen">
                    {props => <UserScreen {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="UpdateProfile">
                    {props => <UpdateProfile {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="commentScreen">
                    {props => <CommentScreen {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="NewPost">
                    {props => <NewPost {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="SearchFriend" component={SearchFriend} options={{ headerShown: false }} />
                  <Stack.Screen mode="modal" name="FriendAwait" component={FriendAwaitScreen}
                    options={{
                      headerShown: false,
                      gestureEnabled: true,
                      cardOverlayEnabled: true,
                      ...TransitionPresets.ModalPresentationIOS,
                    }} />
                  <Stack.Screen name="addgroupchat"
                    options={{
                      headerShown: false,
                      gestureEnabled: true,
                      cardOverlayEnabled: true,
                      ...TransitionPresets.ModalPresentationIOS,
                    }}
                    mode="modal">
                    {props => <Addgroupchat {...props} user={user} />}
                  </Stack.Screen>
                </>
                :
                user.decentralization == 1 ?
                  <>
                    <Stack.Screen name="admin"
                      options={{ headerShown: false }} >
                      {props => <Admin {...props} user={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="detailUser" component={DetailUser} options={{ headerShown: false }} />
                    <Stack.Screen name="detailPost" component={DetailPost} options={{ headerShown: false }} />
                    <Stack.Screen name="listUser" component={ListUser} options={{ headerShown: false }} />

                    <Stack.Screen name="listAdmin" component={ListAdmin} options={{ headerShown: false }} />
                    <Stack.Screen name="listPost" component={ListPost} options={{ headerShown: false }} />
                    <Stack.Screen name="pending" component={Pending} options={{ headerShown: false }} />
                    <Stack.Screen name="canceled" component={Canceled} options={{ headerShown: false }} />
                    <Stack.Screen name="approved" component={Approved} options={{ headerShown: false }} />
                  </>
                  :
                  <Stack.Screen name="error"
                    options={{ headerShown: false }} >
                    {props => <Error {...props} user={user} />}
                  </Stack.Screen>
            }
          </>
          :

          <>

            <Stack.Screen name="logIn" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="signIn" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="forgotPass" component={ForgotPass} options={{ headerShown: false }} />

          </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}
function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
        <View style={styles.container}>
          <Navigation />

        </View>
      </PaperProvider>


    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey"
  }
});

export default App;
