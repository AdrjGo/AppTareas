"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { appFirebase } from "@/config/firebaseConfig"

// Define el tipo del contexto
type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  userId: string | null
  userEmail: string | null
}

// Crea el contexto
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userId: null,
  userEmail: null,
})

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const auth = getAuth(appFirebase)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setUserId(user.uid)
        setUserEmail(user.email)
        console.log("Usuario autenticado:", user.email)
      } else {
        setIsAuthenticated(false)
        setUserId(null)
        setUserEmail(null)
        console.log("No hay usuario autenticado")
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        userEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext)

