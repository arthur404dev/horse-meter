import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react"
import { firebaseClient } from "../services"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  User,
} from "firebase/auth"

// Initialize Firebase and get the auth instance
firebaseClient.initialize()
const auth = getAuth()

interface AuthContextProps {
  user: User | null
  signin: (email: string, password: string) => Promise<User>
  signup: (email: string, password: string) => Promise<User>
  signout: () => Promise<void>
  sendpasswordresetemail: (email: string) => Promise<boolean>
  confirmpasswordreset: (code: string, password: string) => Promise<boolean>
}

const authContext = createContext({} as AuthContextProps)

export function ProvideAuth({ children }: { children: ReactNode }) {
  const authState = useProvideAuth()
  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

// ProvideAuth Hook

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null)
  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user)
        return response.user
      },
    )
  }
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user)
        return response.user
      },
    )
  }
  const signout = () => {
    return signOut(auth).then(() => {
      setUser(null)
    })
  }
  const sendpasswordresetemail = (email: string) => {
    return sendPasswordResetEmail(auth, email).then(() => {
      return true
    })
  }

  const confirmpasswordreset = (code: string, password: string) => {
    return confirmPasswordReset(auth, code, password).then(() => {
      return true
    })
  }

  // Subscribe to user on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return {
    user,
    signin,
    signup,
    signout,
    sendpasswordresetemail,
    confirmpasswordreset,
  }
}
