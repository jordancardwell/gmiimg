import React, { useState, useEffect, useMemo } from 'react'
import { LayoutAnimation, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../services/firebase'
import { SafeAreaNavLayout } from '../../components/SafeAreaNavLayout'
import { Text, Spinner, Button } from '@ui-kitten/components'
import { AppInput } from '../../components/AppInput'
import styles from './styles'
import { Logo } from '../../components/Logo'
import FadeUpIn from '../../components/FadeUpIn'
import { AppButton } from '../../components/AppButton'

interface LoginScreenProps {
  navigation: any
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
}: LoginScreenProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }

  const onLoginPress = () => {
    setLoggingIn(true)

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response?.user?.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            setLoggingIn(false)
            if (!firestoreDocument.exists) {
              alert('User does not exist.')
              return
            }
          })
          .catch((error) => {
            setLoggingIn(false)
            alert(error)
          })
      })
      .catch((error) => {
        setLoggingIn(false)
        alert(error)
      })
  }

  const AnimatedLogo = useMemo(
    () => (
      <FadeUpIn>
        <Logo />
      </FadeUpIn>
    ),
    []
  )

  return (
    <SafeAreaNavLayout
      navigation={navigation}
      showBack={false}
      showHeader={false}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps='always'
        >
          {AnimatedLogo}

          <AppInput
            placeholder='E-mail'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <AppInput
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <AppButton
            loading={loggingIn}
            text='Log In'
            loadingText='Logging In'
            onPress={() => onLoginPress()}
          />

          <View style={styles.footerView}>
            <Text>Don't have an account? </Text>
            <Button appearance='ghost' onPress={onFooterLinkPress}>
              Sign up
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaNavLayout>
  )
}

export default LoginScreen
