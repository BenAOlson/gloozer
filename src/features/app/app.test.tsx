import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '.'
import { User } from 'types/types'
import UserProvider, { UserContext } from 'features/firebase/user-context'
import FirebaseProvider from 'features/firebase'
import GlobalToastProvider from 'features/global-toast'

test('renders Sign in with unauthorized user', () => {
  // const linkElement = screen.getByText(/learn react/i)
  // expect(linkElement).toBeInTheDocument()
  // renderApp({
  //   displayName: 'Test user',
  //   uid: '123456789',
  //   email: 'email@email.email',
  //   photoURL:
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CornDog.jpg/1200px-CornDog.jpg',
  // })
  // renderApp(null)
  // //TODO: Probably not what I want...this tests the text in the SignIn component
  // expect(screen.getByText(/sign in or sign up/i)).toBeInTheDocument()
})

const renderApp = (user: User | null | undefined) =>
  render(
    <FirebaseProvider>
      <GlobalToastProvider>
        <UserContext.Provider value={user}>
          <App />
        </UserContext.Provider>
      </GlobalToastProvider>
    </FirebaseProvider>
  )
