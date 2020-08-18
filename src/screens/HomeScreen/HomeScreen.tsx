import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { firebase } from '../../services/firebase'
import { SafeAreaNavLayout } from '../../components/SafeAreaNavLayout'
import { List, Layout } from '@ui-kitten/components'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { WelcomeSheet } from '../../components/WelcomeSheet'
import { Post } from '../../components/Post'

interface HomeScreenProps {
  user: any
  userUid: string
  setUser: Function
  navigation: any
}

export default function HomeScreen({
  navigation,
  setUser,
  user,
  userUid,
  ...rest
}: HomeScreenProps) {
  const welcomeSheetRef = React.useRef(null)

  const closeBottomSheet = () => {
    if (welcomeSheetRef.current) {
      welcomeSheetRef?.current?.snapTo?.(1)
    }
  }

  useEffect(() => {
    if (welcomeSheetRef.current) {
      welcomeSheetRef?.current?.snapTo?.(0)
    }
  }, [])

  const mockPosts = [
    {
      body:
        'I met this placeholder back at the bacon ipsum cafe. Bacon ipsum dolor amet corned beef chislic jerky, chicken pork belly kevin ground round cow rump beef tail beef ribs turducken. Ham meatball hamburger pancetta sausage brisket kielbasa jerky frankfurter pork. Rump strip steak pork chop salami flank, chuck spare ribs venison shankle tail swine shank. ',
      image: 'https://source.unsplash.com/random',
      title: 'My Fav placeholder',
      user: '4j2WQnD2TrhcXKDak9vbQ9CpJQq2',
    },
    {
      body:
        'I met this placeholder back at the bacon ipsum cafe. Bacon ipsum dolor amet corned beef chislic jerky, chicken pork belly kevin ground round cow rump beef tail beef ribs turducken. Ham meatball hamburger pancetta sausage brisket kielbasa jerky frankfurter pork. Rump strip steak pork chop salami flank, chuck spare ribs venison shankle tail swine shank. ',
      image: 'https://source.unsplash.com/random',
      title: 'My Fav placeholder',
      user: '4j2WQnD2TrhcXKDak9vbQ9CpJQq2',
    },
    {
      body:
        'I met this placeholder back at the bacon ipsum cafe. Bacon ipsum dolor amet corned beef chislic jerky, chicken pork belly kevin ground round cow rump beef tail beef ribs turducken. Ham meatball hamburger pancetta sausage brisket kielbasa jerky frankfurter pork. Rump strip steak pork chop salami flank, chuck spare ribs venison shankle tail swine shank. ',
      image: 'https://source.unsplash.com/random',
      title: 'My Fav placeholder',
      user: '4j2WQnD2TrhcXKDak9vbQ9CpJQq2',
    },
  ]
  return (
    <SafeAreaNavLayout navigation={navigation} showBack={false} showLogo>
      <List
        style={{ ...StyleSheet.absoluteFillObject }}
        data={mockPosts}
        renderItem={({ item }) => <Post key={item.image} post={item} />}
      />

      {/* <TouchableHighlight
        onPress={async () => {
          try {
            await firebase.auth().signOut()
            alert('signed out clearing user')
            setUser()
          } catch (e) {
            console.log(e)
            alert('error signing out')
          }
        }}
        style={{ marginTop: 300 }}
      >
        <Text>LOGOUT</Text>
      </TouchableHighlight> */}

      <View style={{ position: 'absolute', bottom: 5, left: 0, right: 0 }}>
        <Layout
          level='2'
          style={{
            flex: 0,
            backgroundColor: 'white',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => navigation.push('CreatePost')}
          >
            <Image
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
              source={require('../../../assets/camera-add-blue.png')}
            />
          </TouchableWithoutFeedback>
        </Layout>
      </View>

      <BottomSheet
        ref={welcomeSheetRef}
        snapPoints={[400, 0]}
        borderRadius={10}
        renderContent={() => (
          <WelcomeSheet close={closeBottomSheet} name={user.fullName} />
        )}
      />
    </SafeAreaNavLayout>
  )
}
