import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { firebase } from './src/services/firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { decode, encode } from 'base-64'
import CreatePost from './src/components/CreatePost'
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

const Stack = createStackNavigator()

type User =
  | {
      email: string
      fullName: string
    }
  | undefined

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(undefined as User)
  const [userUid, setUserUid] = useState('')
  const [userExists, setUserExists] = useState(false)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUserExists(true)
            setLoading(false)
            setUser(userData as User)
            setUserUid(user.uid)
          })
          .catch((error) => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark /*...myTheme*/ }}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            {user ? (
              <>
                <Stack.Screen name='Home'>
                  {(props) => (
                    <HomeScreen
                      {...props}
                      setUser={setUser}
                      user={user}
                      userUid={userUid}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name='CreatePost'>
                  {(props) => <CreatePost {...props} userUid={userUid} />}
                </Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen
                  name='Registration'
                  component={RegistrationScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </React.Fragment>
  )
}
