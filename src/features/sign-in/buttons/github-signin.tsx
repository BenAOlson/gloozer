import firebase from 'firebase/app'
import React from 'react'
import { EuiButton } from '@elastic/eui'
import { FaGithub } from 'react-icons/fa'
import useFirebaseProviderSignin from './use-firebase-provider-signin'

const GithubSignin = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  const signIn = useFirebaseProviderSignin()

  return (
    <EuiButton
      color="text"
      fill={false}
      fullWidth
      iconType={FaGithub}
      onClick={signIn(provider)}
    >
      {'//TODO: fix this'}
    </EuiButton>
  )
}

export default GithubSignin
