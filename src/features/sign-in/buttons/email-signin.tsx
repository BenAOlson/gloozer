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

const validationFields = ['email', 'password', 'general'] as const
type ValidationFields = typeof validationFields[number]
type Errors = {
  [key in typeof validationFields[number]]: {
    isError: boolean
    msg: string
  }
}
const EmailSignin = () => {
  //TODO: combine isOpen and isLoading to minimize double renders
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNewChecked, setIsNewChecked] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    email: {
      isError: false,
      msg: '',
    },
    password: {
      isError: false,
      msg: '',
    },
    general: {
      isError: false,
      msg: '',
    },
  })

  const inOrUp = isNewChecked ? 'up' : 'in'
  const errorMsgs: string[] = []
  validationFields.forEach((key) => {
    const msg: string = errors[key].msg
    msg && errorMsgs.push(msg)
  })

  const clearError = (field: ValidationFields) => (
    e: React.ChangeEvent<unknown>
  ) => {
    if (errors[field].isError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: { isError: false, msg: '' },
      }))
    }
  }

  const auth = firebase.auth()

  const onSwitchChange = () => {
    setIsNewChecked((prevIsChecked) => !prevIsChecked)
  }

  const handleFirebaseErrors = (err: any) => {
    console.error(err)
    setErrors((prevErrors) => {
      const isEmail = (err.message as string)
        .toLocaleLowerCase()
        .includes('email')
      const isPassword = (err.message as string)
        .toLocaleLowerCase()
        .includes('password')
      const errObj = { isError: true, msg: err.message }
      const errors: Errors = { ...prevErrors }
      if (isEmail) errors['email'] = errObj
      if (isPassword) errors['password'] = errObj
      if (!(isEmail || isPassword)) {
        errors['general'] = errObj
      } else {
        errors['general'] = { isError: false, msg: '' }
      }
      return errors
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const isNew = isNewChecked
    const userName = e.currentTarget.userName?.value
    if (!(email || password)) {
      setErrors((errors) => ({
        ...errors,
        email: {
          isError: !email,
          msg: !email ? `Enter an email to sign ${inOrUp}` : '',
        },
        password: {
          isError: !password,
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
                error={errorMsgs}
                isInvalid={!!errorMsgs.length}
                id="email-form"
              >
                <EuiFormRow label="Email" fullWidth>
                  <EuiFieldText
                    name="email"
                    type="email"
                    onChange={clearError('email')}
                    fullWidth
                    isInvalid={errors.email.isError}
                  />
                </EuiFormRow>

                <EuiFormRow label="Password" fullWidth>
                  <EuiFieldPassword
                    name="password"
                    placeholder="Enter a password"
                    type="dual"
                    onChange={clearError('password')}
                    isInvalid={errors.password.isError}
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
