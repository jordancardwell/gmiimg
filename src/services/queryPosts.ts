import { firebase } from './firebase'

interface Post {
  body: string
  image: string
  title: string
  user: string
  timestamp?: firebase.firestore.Timestamp
}

export const getPosts = async () => {
  console.log('attempting query')
  const db = firebase.firestore()
  const postsRef = db.collection('posts')
  const snapshot = await postsRef.orderBy('timestamp', 'desc').get()
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  return snapshot
}