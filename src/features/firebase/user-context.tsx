import firebase from 'firebase/app'
import React, { createContext, useEffect, useRef, useState } from 'react'

export const UserContext = createContext<firebase.User | null>(null)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = firebase.auth()
  const [user, setUser] = useState<firebase.User | null>(null)
  const unsubRef = useRef<firebase.Unsubscribe | null>()

  unsubRef.current = auth.onAuthStateChanged((user) => {
    console.log('auth state changed')
    setUser(user)
  })

  useEffect(() => {
    return () => {
      unsubRef.current && unsubRef.current()
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
