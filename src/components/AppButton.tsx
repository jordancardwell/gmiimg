import React from 'react'
import { StyleSheet, GestureResponderEvent } from 'react-native'
import { Button, Spinner } from '@ui-kitten/components'

interface AppButtonProps {
  disabled?: boolean
  children?: any
  loading?: boolean
  loadingText?: string
  text: string
  status?: string
  onPress: (event: GestureResponderEvent) => void
}

export const AppButton = ({
  disabled = false,
  loading = false,
  text = '',
  loadingText = '',
  onPress,
  status = 'primary',
}: AppButtonProps) =>
  loading ? (
    <Button
      style={s.button}
      disabled
      status={status}
      accessoryLeft={() => <Spinner size='small' />}
    >
      {loadingText}
    </Button>
  ) : (
    <Button onPress={onPress} status={status} style={s.button}>
      {text}
    </Button>
  )

const s = StyleSheet.create({
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
