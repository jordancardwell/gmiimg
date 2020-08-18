import { firebase } from './firebase'

interface Post {
  body: string
  image: string
  title: string
  user: string
  timestamp?: firebase.firestore.Timestamp
}

export const createPost = async (post: Post) => {
  post.timestamp = firebase.firestore.Timestamp.now()

  console.log('attempting upload', {post})
  const db = firebase.firestore()
  await db.collection('posts').add(post)
  console.log('successfully posted to firebase')
}