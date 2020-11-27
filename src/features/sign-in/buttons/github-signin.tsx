import firebase from 'firebase/app'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import OauthSigninButton from '../oauth-signin-button'

const GithubSignin = () => {
  const provider = new firebase.auth.GithubAuthProvider()

  return (
    <OauthSigninButton
      icon={FaGithub}
      provider={provider}
      providerName="Github"
    >
      {'//TODO: fix this'}
    </OauthSigninButton>
  )
}

export default GithubSignin
