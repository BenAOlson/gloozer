import React, { useContext, useState } from 'react'
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
import { FirebaseContext } from 'features/firebase'

const validationFields = ['email', 'password'] as const
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

  const firebase = useContext(FirebaseContext)
  const auth = firebase.auth()

  const onSwitchChange = () => {
    setIsNewChecked((prevIsChecked) => !prevIsChecked)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const isNew = isNewChecked
    const first = e.currentTarget.first?.value
    const last = e.currentTarget.last?.value
    if (!(email || password)) {
      setErrors({
        email: {
          isError: !email,
          msg: !email ? `Enter an email to sign ${inOrUp}` : '',
        },
        password: {
          isError: !password,
          msg: !password ? `Enter a password to sign ${inOrUp}` : '',
        },
      })
      return
    }
    setIsLoading(true)

    if (isNew) {
      try {
        await auth.createUserWithEmailAndPassword(email, password)
        console.log('success!')
        await auth.currentUser?.updateProfile({
          displayName: `${first} ${last}`,
        })
      } catch (err) {
        console.error('failure!')
        console.error(err)
      }
      setIsLoading(false)
      setIsOpen(false)
      return
    }

    try {
      await auth.signInWithEmailAndPassword(email, password)
      console.log('success!')
    } catch (err) {
      console.error('failure!')
      console.error(err)
    }

    setIsOpen(false)
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
          <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
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
                    <EuiFormRow
                      label="First name"
                      helpText="optional"
                      fullWidth
                    >
                      <EuiFieldText name="first" fullWidth />
                    </EuiFormRow>
                    <EuiFormRow label="Last name" helpText="optional" fullWidth>
                      <EuiFieldText name="last" fullWidth />
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
