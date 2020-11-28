import React, { useState } from 'react'
import firebase from 'firebase/app'
import {
  EuiButton,
  EuiCallOut,
  // EuiGlobalToastList,
  EuiSpacer,
  IconType,
} from '@elastic/eui'

type ToastColors = 'danger' | 'primary' | 'warning' | 'success' | undefined
type Err = {
  isErr: boolean
  msg: string
  color?: ToastColors
}
type Provider = firebase.auth.AuthProvider
type SigninButtonProps = {
  icon: IconType
  provider: Provider
  providerName: string
  children?: React.ReactNode
  className?: string
}
const OauthSigninButton = ({
  icon,
  provider,
  children,
  className,
  providerName,
}: SigninButtonProps) => {
  const [err, setErr] = useState<Err>({ isErr: false, msg: '' })
  const auth = firebase.auth()

  const signIn = (provider: firebase.auth.AuthProvider) => async (
    e: unknown
  ) => {
    try {
      await auth.signInWithPopup(provider)
      console.log('success!')
    } catch (err) {
      console.error(err)
      const color =
        err.code === 'auth/popup-closed-by-user' ? 'warning' : 'danger'
      setErr({ isErr: true, msg: err.message, color })
    }
  }
  const errProps = {
    title: `Couldn't sign in with ${providerName}`,
    color: err.color,
    iconType: 'alert',
  }

  return (
    <>
      {err.isErr && (
        <>
          <EuiCallOut {...errProps}>{err.msg}</EuiCallOut>
          <EuiSpacer size="m" />
        </>
      )}
      <EuiButton
        className={className}
        fullWidth
        iconType={icon}
        onClick={signIn(provider)}
      >
        {children}
      </EuiButton>
      {/* <EuiGlobalToastList
        toasts={
          err.isErr
            ? [
                {
                  ...errProps,
                  text: err.msg,
                  id: 'id',
                },
              ]
            : undefined
        }
        toastLifeTimeMs={6000}
        dismissToast={(removedToast) => {
          setErr({ isErr: false, msg: '' })
        }}
      /> */}
    </>
  )
}

export default OauthSigninButton
