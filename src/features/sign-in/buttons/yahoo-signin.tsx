import firebase from 'firebase/app'
import React from 'react'
import { SiYahoo } from 'react-icons/si'
import OauthSigninButton from '../oauth-signin-button'

const YahooSignin = () => {
  var provider = new firebase.auth.OAuthProvider('yahoo.com')

  return (
    <OauthSigninButton
      icon={SiYahoo}
      provider={provider}
      providerName="Ya-hooOOooOooo!"
    >
      Sign in with <span style={{ fontStyle: 'italic' }}>Ya-hooOOooOooo!</span>
    </OauthSigninButton>
  )
}

export default YahooSignin
