import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import React from 'react'

import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { Logo } from './Logo'

const BackIcon = (props: any) => <Icon {...props} name='arrow-back' />

export const SafeAreaNavLayout = ({
  navigation,
  title,
  showBack = true,
  showHeader = true,
  showLogo = false,
  showLogout = false,
  level = '4',
  children,
}: any) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
  )

  return (

      <SafeAreaView style={{ flex: 1 }}>
        {showHeader && (
          <>
            <TopNavigation
              title={showLogo ? () => <Logo small /> : title}
              alignment='center'
              accessoryLeft={showBack && BackAction}
            />
            <Divider />
          </>
        )}
        <Layout
          level={level}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {children}
        </Layout>
      </SafeAreaView>

  )
}
