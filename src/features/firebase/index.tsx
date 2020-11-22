import React, { createContext } from 'react'
import firebase from 'firebase/app'

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

// const defaultFirebase = firebase.initializeApp(fbConfig)
const defaultFirebase = firebase.initializeApp(fbConfig)
// const functions = defaultFirebase.functions()
//enable for local functions development
// if (process.env.NODE_ENV === 'development') {
//   // functions.useFunctionsEmulator('http://localhost:5001')
//   functions.useEmulator('localhost', 5001)
// }
// defaultFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
// defaultFirebase.firestore().settings({ experimentalForceLongPolling: true })

type Firebase = firebase.app.App
export const FirebaseContext = createContext<Firebase>(defaultFirebase)

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseContext.Provider value={defaultFirebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
