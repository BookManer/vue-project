import firebase from 'firebase';

export default firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIRE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIRERTDB_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIRERTDB_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.VUE_APP_FIRERTDB_PROJECT_ID,
  messagingSenderId: '603657977500',
  storageBucket: 'gs://vue-project-70b06.appspot.com',
  appId: process.env.VUE_APP_FIRERTDB_PROJECT_ID,
});
