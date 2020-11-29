import React, { useState } from 'react'
import firebase from 'firebase/app'
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  // EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSwitch,
} from '@elastic/eui'
import { FaRegEnvelope } from 'react-icons/fa'
import { useModalForm } from 'features/common/hooks/use-modal-form'

const EmailSignin = () => {
  //TODO: move isOpen state above modal
  const [isOpen, setIsOpen] = useState(false)
  const [isNewChecked, setIsNewChecked] = useState(false)
  const {
    errs,
    setErrs,
    errMsgs,
    clearErr,
    isLoading,
    setIsLoading,
  } = useModalForm(['email', 'password', 'general'])

  const auth = firebase.auth()
  const inOrUp = isNewChecked ? 'up' : 'in'

  const onSwitchChange = () => {
    setIsNewChecked((prevIsChecked) => !prevIsChecked)
  }

  const handleFirebaseErrors = (err: any) => {
    console.error(err)
    setErrs((prevErrors) => {
      const isEmail = (err.message as string)
        .toLocaleLowerCase()
        .match(/email|identifier/m)
      const isPassword = (err.message as string)
        .toLocaleLowerCase()
        .includes('password')
      const errObj = { isErr: true, msg: err.message }
      const errs = { ...prevErrors }
      if (isEmail) errs['email'] = errObj
      if (isPassword) errs['password'] = errObj
      if (!(isEmail || isPassword)) {
        errs['general'] = errObj
      } else {
        errs['general'] = { isErr: false, msg: '' }
      }
      return errs
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmit')

    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const isNew = isNewChecked
    const userName = e.currentTarget.userName?.value
    const photoURL = e.currentTarget.photoURL?.value
    if (!(email && password)) {
      setErrs((errs) => ({
        ...errs,
        email: {
          isErr: !email,
          msg: !email ? `Enter an email to sign ${inOrUp}` : '',
        },
        password: {
          isErr: !password,
          msg: !password ? `Enter a password to sign ${inOrUp}` : '',
        },
      }))
      return
    }
    setIsLoading(true)

    if (isNew) {
      try {
        await auth.createUserWithEmailAndPassword(email, password)
        await auth.currentUser?.updateProfile({
          displayName: userName,
          photoURL,
        })
        setIsOpen(false)
      } catch (err) {
        handleFirebaseErrors(err)
      }
      setIsLoading(false)
      return
    }

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setIsOpen(false)
    } catch (err) {
      handleFirebaseErrors(err)
    }

    setIsLoading(false)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <EuiButton
        color="text"
        fill={false}
        fullWidth
        iconType={FaRegEnvelope}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        Sign in the hard way (email/password)
      </EuiButton>
      {isOpen && (
        <EuiOverlayMask onClick={closeModal}>
          <EuiModal onClose={closeModal} initialFocus="[name=email]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>Sign {inOrUp}</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiForm
                component="form"
                onSubmit={handleSubmit}
                error={errMsgs}
                isInvalid={!!errMsgs.length}
                id="email-form"
              >
                <EuiFormRow
                  label="Email"
                  isInvalid={errs.email.isErr}
                  fullWidth
                >
                  <EuiFieldText
                    name="email"
                    type="email"
                    onChange={clearErr('email')}
                    fullWidth
                    isInvalid={errs.email.isErr}
                  />
                </EuiFormRow>

                <EuiFormRow
                  label="Password"
                  isInvalid={errs.password.isErr}
                  fullWidth
                >
                  <EuiFieldPassword
                    name="password"
                    placeholder="Enter a password"
                    type="dual"
                    onChange={clearErr('password')}
                    isInvalid={errs.password.isErr}
                    fullWidth
                  />
                </EuiFormRow>

                <EuiFormRow fullWidth>
                  <EuiSwitch
                    name="isNew"
                    label="Create new account?"
                    checked={isNewChecked}
                    onChange={onSwitchChange}
                  />
                </EuiFormRow>
                {isNewChecked && (
                  <>
                    <EuiFormRow label="Your name" helpText="optional" fullWidth>
                      <EuiFieldText name="userName" fullWidth />
                    </EuiFormRow>
                    <EuiFormRow
                      label="Profile photo URL"
                      helpText="optional"
                      fullWidth
                    >
                      <EuiFieldText name="photoURL" fullWidth />
                    </EuiFormRow>
                  </>
                )}
              </EuiForm>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

              <EuiButton
                type="submit"
                form="email-form"
                isLoading={isLoading}
                fill
              >
                Sign {isNewChecked ? 'up' : 'in'}
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </>
  )
}

export default EmailSignin
