import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCsV50R_8K7ggWt6gWI3gOF7XeDsRS7Z4c",
    authDomain: "prueba-a8c5c.firebaseapp.com",
    projectId: "prueba-a8c5c",
    storageBucket: "prueba-a8c5c.appspot.com",
    messagingSenderId: "917478342740",
    appId: "1:917478342740:web:181901562c8097513fadc1"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}