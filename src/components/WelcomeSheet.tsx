import React from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'
import { AppButton } from './AppButton'

interface WelcomeSheetProps {
  name: string
  close: any
}

export const WelcomeSheet = ({ name, close }: WelcomeSheetProps) => (
  <Layout
    level='3'
    style={{
      height: 500,
      zIndex: 100,
      flex: 1,
      ...StyleSheet.absoluteFillObject,
    }}
  >

    <ImageBackground
      style={s.background}
      source={{ uri: 'https://source.unsplash.com/random' }}
    >
      <View style={{ position: 'absolute', right: 0, left: 0, top: 0 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 200,
            flex: 1,
          }}
        />
        <Text
          style={{
            marginTop: 40,
            marginBottom: 50,
            flex: 1,
            alignSelf: 'center',
          }}
          category='h5'
        >{`Welcome Back ${name}🎉`}</Text>
        <AppButton text="It's good to be back!" onPress={close}></AppButton>
      </View>
    </ImageBackground>

  </Layout>
)

const s = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
})
