import React from 'react'
import { StyleSheet, Image } from 'react-native'

export const Logo = ({ small = false }) => (
  <Image
    style={small ? s.small : s.logo}
    resizeMode='contain'
    source={require('../../assets/glasses.png')}
  />
)

const s = StyleSheet.create({
  logo: {
    flex: 1,
    height: 100,
    width: 100,
    alignSelf: 'center',
    margin: 30,
  },
  small: {
    flex: 1,
    height: 50,
    width: 50,
    alignSelf: 'center',

  },
})
