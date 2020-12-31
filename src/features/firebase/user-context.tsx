import { GlobalToastContext } from 'features/global-toast'
import firebase from 'firebase/app'
import React, { createContext, useEffect, useState } from 'react'
import { User } from 'types/types'

export const UserContext = createContext<User | null | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>()

  useEffect(() => {
    const auth = firebase.auth()
    const db = firebase.database()
    let ref: firebase.database.Reference | undefined
    const authUnsub = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        ref = db.ref(`users/${firebaseUser.uid}`)
        ref.on(
          'value',
          (snapshot) => {
            const userVal: Omit<User, 'uid'> | null = snapshot.val()
            // console.log('userVal:', userVal)
            // console.log('auth state:', firebaseUser)
            if (userVal) setUser({ ...userVal, uid: firebaseUser.uid })
          },
          (err: Error) => {
            console.error(err)
          }
        )
        return
      }

      //remove db listener if there is no active user
      ref?.off()
      setUser(firebaseUser)
    })

    return () => {
      // authUnsubRef.current && authUnsubRef.current()
      authUnsub()
      ref?.off()
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
