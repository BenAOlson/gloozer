import firebase from 'firebase/app'
import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import OauthSigninButton from '../oauth-signin-button'

const FacebookSignin = () => {
  const provider = new firebase.auth.FacebookAuthProvider()

  return (
    <OauthSigninButton
      icon={FaFacebookF}
      provider={provider}
      providerName="Zuckerbook"
    >
      Sign in with Zuckerbook
    </OauthSigninButton>
  )
}

export default FacebookSignin
