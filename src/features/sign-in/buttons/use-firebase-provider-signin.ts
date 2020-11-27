import firebase from 'firebase/app'

const useFirebaseProviderSignin = () => {
  const auth = firebase.auth()

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
