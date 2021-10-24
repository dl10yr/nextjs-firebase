import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const CLIENT_CONFIG = {
  apiKey: 'XXXXX',
  authDomain: 'XXXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXXX',
  messagingSenderId: 'XXXXXX',
  appId: 'XXXXX',
}

const app = initializeApp(CLIENT_CONFIG)
const firebaseAuth = getAuth(app)

const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

export { app, firebaseAuth, db, googleProvider }
