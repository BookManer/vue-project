import firebase from 'firebase/app';
import 'firebase/firestore';

export default firebase
  .initializeApp({
    apiKey: process.env.VUE_APP_FIRE_API_KEY,
    authDomain: `${process.env.VUE_APP_FIRERTDB_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.VUE_APP_FIRERTDB_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.VUE_APP_FIRERTDB_PROJECT_ID,
    messagingSenderId: '603657977500',
    appId: process.env.VUE_APP_FIRERTDB_PROJECT_ID,
  })
  .firestore();
