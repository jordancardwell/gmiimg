import React, { useState } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'

import { firebase } from '../services/firebase'
import { createPost } from '../services/createPost'
import { SafeAreaNavLayout } from './SafeAreaNavLayout'
import { Text, Button, Layout } from '@ui-kitten/components'
import { AppInput } from './AppInput'
import { AppButton } from './AppButton'
import PhotoPicker from './PhotoPicker'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface CreatePostProps {
  userUid: string
  navigation: any
}

export default function CreatePost({
  navigation,
  userUid = '',
  ...rest
}: CreatePostProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const onPostPress = () => {
    console.log('onPostPress', { title, body, image, user: userUid })
    createPost({ title, body, image, user: userUid })
  }

  const onImageUpload = (imageUrl) => {
    console.log('create post uploaded image', imageUrl)
    setImage(imageUrl)
  }

  const onPick = (param) => {
    console.log('create post uploaded image', param)
  }

  return (
    <SafeAreaNavLayout
      navigation={navigation}
      showBack={false}
      title='Create Post'
    >
      <Layout style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps='always'
        >
          <PhotoPicker
            userUid={userUid}
            onPick={onPick}
            onUpload={onImageUpload}
          />
          <AppInput
            placeholder='Title'
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <AppInput
            placeholder='Post'
            multiline={true}
            onChangeText={(text) => setBody(text)}
            value={body}
          />

          <AppButton
            loading={isPosting}
            onPress={onPostPress}
            text='Post it!'
            loadingText='Workin on it!'
          />
          <AppButton
            status='danger'
            onPress={navigation.goBack}
            text='Scrap it!'
            loadingText='Workin on it!'
          />
        </KeyboardAwareScrollView>
      </Layout>
    </SafeAreaNavLayout>
  )
}
