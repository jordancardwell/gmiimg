import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { firebase } from '../../services/firebase'
import { SafeAreaNavLayout } from '../../components/SafeAreaNavLayout'
import { Icon, List, Layout } from '@ui-kitten/components'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { WelcomeSheet } from '../../components/WelcomeSheet'
import { Post } from '../../components/Post'
import { getPosts } from '../../services/queryPosts'
import { NavigationContainer } from '@react-navigation/native'

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
  const [posts, setPosts] = useState(
    undefined as
      | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      | undefined
  )

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

  useEffect(() => {
    const fetchPosts = async () => {
      const _posts = await getPosts()
      setPosts(_posts)
    }

    fetchPosts()
  }, [])

  const mockPosts = [
    {
      body:
        'I met this placeholder back at the bacon ipsum cafe. Bacon ipsum dolor amet corned beef chislic jerky, chicken pork belly kevin ground round cow rump beef tail beef ribs turducken. Ham meatball hamburger pancetta sausage brisket kielbasa jerky frankfurter pork. Rump strip steak pork chop salami flank, chuck spare ribs venison shankle tail swine shank. ',
      image: 'https://source.unsplash.com/random',
      title: 'My Fav placeholder',
      user: '4j2WQnD2TrhcXKDak9vbQ9CpJQq2',
    },
  ]
  const postArray: any[] = []
  posts?.forEach((doc) => postArray.push(doc.data()))

  return (
    <SafeAreaNavLayout
      navigation={navigation}
      showBack={false}
      showLogout
      showLogo
    >
      {/* <List
        style={{ ...StyleSheet.absoluteFillObject }}
        data={mockPosts}
        renderItem={({ item }) => <Post key={item.image} post={item} />}
      /> */}
      <List
        style={{ ...StyleSheet.absoluteFillObject }}
        data={postArray}
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

      <View style={{ position: 'absolute', bottom: 10, left: 10, width: 30 }}>
        <Layout
          level='2'
          style={{
            flex: 0,
            backgroundColor: 'white',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
        >
          <TouchableWithoutFeedback
            onPress={async () => {
              try {
                console.log('logging out')
                await firebase.auth().signOut()
                setUser()
                navigation.navigate('Login')
              } catch (e) {
                console.log(e)
                alert('error signing out')
              }
            }}
          >
            <Image
              style={{
                zIndex: 20,
                width: 30,
                height: 30,
                marginBottom: -30,
                resizeMode: 'contain',
                alignSelf: 'center',
                flex: 0,
              }}
              source={require('../../../assets/logout.png')}
            />
            <Icon style={{ color: 'black' }} name='arrow-back' />
          </TouchableWithoutFeedback>
        </Layout>
      </View>

      <View style={{ position: 'absolute', bottom: 5, width: 75 }}>
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
