import React, { createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/database'
import RemoveWarning from './remove-warning'

const fbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const isDevel = process.env.NODE_ENV === 'development'
// const isDevel = false

const defaultFirebase = firebase.initializeApp(fbConfig)

//enable for local functions development
if (isDevel) {
  defaultFirebase.functions().useEmulator('localhost', 5001)
  defaultFirebase.auth().useEmulator('http://localhost:9099/')
  defaultFirebase.database().useEmulator('localhost', 9000)
}

// defaultFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
// defaultFirebase.firestore().settings({ experimentalForceLongPolling: true })

type Firebase = firebase.app.App
export const FirebaseContext = createContext<Firebase>(defaultFirebase)

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseContext.Provider value={defaultFirebase}>
      {/* Remove for production builds */}
      {isDevel && <RemoveWarning />}
      {/* End Remove */}
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
