import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from '@ui-kitten/components'

interface AppInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  multiline?: boolean
}

export const AppInput = ({
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  multiline = false,
  ...inputProps
}: AppInputProps) => (
  <Input
    style={s.input}
    textStyle={multiline ? s.multiheight : {}}
    placeholder={placeholder}
    placeholderTextColor='#aaaaaa'
    onChangeText={onChangeText}
    value={value}
    underlineColorAndroid='transparent'
    autoCapitalize='none'
    secureTextEntry={secureTextEntry}
    multiline
  />
)

const s = StyleSheet.create({
  input: {
    height: 48,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,

  },
  multiheight: {
    minHeight: 64
  }
})
