import firebase from 'firebase/app'
import { FirebaseContext } from 'features/firebase'
import { useContext } from 'react'

const useFirebaseProviderSignin = () => {
  const firebaseCtx = useContext(FirebaseContext)
  const auth = firebaseCtx.auth()

  const signIn = (provider: firebase.auth.AuthProvider) => async (
    e: unknown
  ) => {
    try {
      await auth.signInWithPopup(provider)
      console.log('success!')
    } catch (err) {
      console.error('failure')
      console.error(err)
    }
  }

  return signIn
}

export default useFirebaseProviderSignin
