import firebase from 'firebase/app'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FirebaseContext } from 'features/firebase'

export const UserContext = createContext<firebase.User | null>(null)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const firebaseCtx = useContext(FirebaseContext)
  const auth = firebaseCtx.auth()
  const currentUser = auth.currentUser
  const [user, setUser] = useState<typeof currentUser>(null)
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
