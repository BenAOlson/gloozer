import firebase from 'firebase/app'
import React, { createContext, useEffect, useState } from 'react'
import { User } from 'types'

export const UserContext = createContext<User | null | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>()

  useEffect(() => {
    const auth = firebase.auth()
    const db = firebase.database()
    // authUnsubRef.current = auth.onAuthStateChanged((user) => {
    let ref: firebase.database.Reference | undefined
    const authUnsub = auth.onAuthStateChanged((user) => {
      console.log('auth state changed')
      if (user) {
        ref = db.ref(`users/${user.uid}`)
        ref.on('value', (snapshot) => {
          const userVal: Omit<User, 'uid'> | null = snapshot.val()
          if (userVal) setUser({ ...userVal, uid: user.uid })
        })
        return
      }

      //remove db listener if there is no active user
      ref && ref.off()
      setUser(user)
    })

    return () => {
      // authUnsubRef.current && authUnsubRef.current()
      authUnsub()
      ref && ref.off()
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
