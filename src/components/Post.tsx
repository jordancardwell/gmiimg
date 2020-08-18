import React from 'react'
import { Text, Button, Card, Layout } from '@ui-kitten/components'
import { Image, StyleSheet, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface CreatePostProps {
  post: any
}

export function Post({ post }: CreatePostProps) {
  console.log('post.image', post.image)
  return (
    <Layout level='1' style={{ flex: 1, margin: 10 }}>
      <Image
        resizeMethod='scale'
        resizeMode='cover'
        style={s.image}
        source={{ uri: post.image }}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={s.gradient}
      />
      <Text
        style={s.title
          }
        category='label'
      >
        {post.title}
      </Text>
      <Card>
        <Text category='p2'>{post.body}</Text>
      </Card>
    </Layout>
  )
}

const s = StyleSheet.create({
  image: {
    zIndex: 1,
    height: 400,
  },
  gradient: {
    position: 'absolute',
    zIndex: 5,
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 10,
  }
})
