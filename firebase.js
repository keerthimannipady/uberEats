import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXxeI-g67oeu_kgVoSx1IFfDTU32Hnh94',
  authDomain: 'uber-app-e43be.firebaseapp.com',
  projectId: 'uber-app-e43be',
  storageBucket: 'uber-app-e43be.appspot.com',
  messagingSenderId: '628036552581',
  appId: '1:628036552581:web:30591db03cb28d70c5a6ec',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app;

export default firebase;
