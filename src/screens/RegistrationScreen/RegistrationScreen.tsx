import React, { useState } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../services/firebase'
import { SafeAreaNavLayout } from '../../components/SafeAreaNavLayout'
import { AppInput } from '../../components/AppInput'
import { AppButton } from '../../components/AppButton'
import { Button, Text, Spinner } from '@ui-kitten/components'
import styles from './styles'
import { Logo } from '../../components/Logo'
import FadeUpIn from '../../components/FadeUpIn'

interface RegistrationScreenProps {
  navigation: any
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  navigation,
}: RegistrationScreenProps) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signingUp, setSigningUp] = useState(false)

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    setSigningUp(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response?.user?.uid
        const data = {
          id: uid,
          email,
          fullName,
        }
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            setSigningUp(false)
            navigation.navigate('Home', { user: data })
          })
          .catch((error) => {
            setSigningUp(false)
            alert(error)
          })
      })
      .catch((error) => {
        setSigningUp(false)
        alert(error)
      })
  }

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
          <Logo />
          <AppInput
            placeholder='Full Name'
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
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
          <AppInput
            secureTextEntry
            placeholder='Confirm Password'
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />

          <AppButton
            loading={signingUp}
            text='Create Account'
            loadingText='Creating Account'
            onPress={() => onRegisterPress()}
          />

          <View style={styles.footerView}>
            <Text>Already got an account? </Text>
            <Button appearance='ghost' onPress={onFooterLinkPress}>
              Log In
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaNavLayout>
  )
}

export default RegistrationScreen
