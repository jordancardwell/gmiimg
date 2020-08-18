
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNyfV9Ltv2qFq1r4s5PHwPdQQeGgx-KBE',
  authDomain: 'gmiimg.firebaseapp.com',
  databaseURL: 'https://gmiimg.firebaseio.com',
  projectId: 'gmiimg',
  storageBucket: 'gmiimg.appspot.com',
  messagingSenderId: '526774334619',
  appId: '1:526774334619:web:c67cbfd4a434d3c3bac23e',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };